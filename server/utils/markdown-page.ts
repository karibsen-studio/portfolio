import type { H3Event } from 'h3'
import TurndownService from 'turndown'
// @ts-expect-error — turndown-plugin-gfm ships no type declarations.
import { gfm } from 'turndown-plugin-gfm'

import { getLlmsSiteUrl, llmsUrl } from './llms'

/**
 * Set on the internal request that renders a page, so the markdown middleware lets it
 * through instead of negotiating itself into an infinite loop.
 */
export const MARKDOWN_BYPASS_HEADER = 'x-markdown-render'

/** Prefixes that are never pages: assets, API routes and the CMS dashboard. */
const NON_PAGE_PREFIXES = ['/api/', '/_nuxt/', '/_ipx/', '/_fonts/', '/__nuxt', '/__eponyme', '/.well-known/']

export function isMarkdownablePath(path: string): boolean {
  if (NON_PAGE_PREFIXES.some(prefix => path === prefix.replace(/\/$/, '') || path.startsWith(prefix))) return false
  // Anything that already names a file — /sitemap.xml, /llms.txt, /favicon.ico — is served as it is.
  return !/\.[a-z0-9]+$/i.test(path)
}

/**
 * Decides between HTML and Markdown for a request that did not ask for a `.md` URL.
 *
 * Browsers never send `text/markdown`, so they keep the rendered page; an agent that
 * ranks Markdown above HTML — or lists it alone — gets the Markdown body back from the
 * very same URL.
 */
export function prefersMarkdown(accept: string | undefined): boolean {
  if (!accept) return false

  let markdown = -1
  let html = -1

  for (const part of accept.split(',')) {
    const [rawType, ...params] = part.split(';')
    const type = rawType?.trim().toLowerCase()
    if (!type) continue

    const q = params
      .map(param => /^\s*q=([0-9.]+)\s*$/i.exec(param))
      .find(Boolean)
    const quality = q ? Number(q[1]) : 1

    if (type === 'text/markdown' || type === 'text/x-markdown') markdown = Math.max(markdown, quality)
    if (type === 'text/html' || type === 'application/xhtml+xml') html = Math.max(html, quality)
  }

  return markdown > 0 && markdown > html
}

const MAIN = /<main[^>]*>([\s\S]*)<\/main>/i
const TITLE = /<title[^>]*>([\s\S]*?)<\/title>/i
const DESCRIPTION = /<meta[^>]+name="description"[^>]+content="([^"]*)"/i

let turndown: TurndownService | undefined

function getTurndown(): TurndownService {
  if (turndown) return turndown

  const service = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    linkStyle: 'inlined'
  })

  service.use(gfm)

  // Decorative markup carries no meaning once the styling is gone: the SVG grids and dot
  // patterns of the layout would otherwise land in the Markdown as noise.
  const DECORATIVE = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'CANVAS', 'IFRAME'])
  service.addRule('decorative', {
    filter: node => DECORATIVE.has(node.nodeName.toUpperCase()) || attribute(node, 'aria-hidden') === 'true',
    replacement: () => ''
  })

  // Relative links are useless to an agent reading the file out of context.
  service.addRule('absoluteLinks', {
    filter: (node, options) => options.linkStyle === 'inlined' && node.nodeName === 'A' && !!node.getAttribute('href'),
    replacement: (content, node) => {
      const href = attribute(node, 'href')
      const text = content.trim()
      if (!text) return ''
      return `[${text}](${href.startsWith('/') ? llmsUrl(href) : href})`
    }
  })

  service.addRule('absoluteImages', {
    filter: 'img',
    replacement: (_content, node) => {
      const src = attribute(node, 'src')
      if (!src) return ''
      const alt = attribute(node, 'alt')
      return `![${alt}](${src.startsWith('/') ? getLlmsSiteUrl() + src : src})`
    }
  })

  turndown = service
  return service
}

/**
 * Renders a route and turns the page itself into Markdown.
 *
 * Going through the rendered HTML rather than the CMS keeps a single source of truth:
 * static pages written in `.vue` and content-driven pages both come out of the same
 * pipeline, and the Markdown never drifts from what a visitor actually reads.
 */
export async function renderPageMarkdown(event: H3Event, path: string): Promise<string> {
  const html = await event.$fetch<string>(path, {
    responseType: 'text',
    headers: {
      accept: 'text/html',
      [MARKDOWN_BYPASS_HEADER]: '1'
    }
  })

  const title = decodeAttribute(TITLE.exec(html)?.[1] ?? '').replace(/\s*\|\s*Karibsen$/i, '').trim()
  const description = decodeAttribute(DESCRIPTION.exec(html)?.[1] ?? '').trim()

  // `<main>` is the page; the navbar and the footer repeat on every URL and say nothing
  // about the one being read.
  const body = getTurndown()
    .turndown(MAIN.exec(html)?.[1] ?? html)
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // The page usually opens with its own `<h1>`; that heading is promoted to the top of
  // the document rather than repeated under a second title of our own.
  const ownHeading = body.startsWith('# ')
  const lineEnd = ownHeading ? indexOfLineEnd(body) : 0
  const heading = ownHeading ? body.slice(0, lineEnd) : `# ${title || 'Karibsen'}`
  const rest = ownHeading ? body.slice(lineEnd).trim() : body

  const lines = [heading, '', `URL: ${llmsUrl(path)}`]
  // On several pages the meta description is lifted straight from the intro paragraph;
  // printing it twice would only pad the file.
  if (description && !rest.includes(description)) lines.push('', description)
  if (rest) lines.push('', rest)
  lines.push('')

  return lines.join('\n')
}

/** Turndown hands its rules a DOM-ish node; only the attributes are needed here. */
function attribute(node: unknown, name: string): string {
  const element = node as { getAttribute?: (_name: string) => string | null }
  return element.getAttribute?.(name) ?? ''
}

function indexOfLineEnd(value: string): number {
  const index = value.indexOf('\n')
  return index === -1 ? value.length : index
}

function decodeAttribute(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, '\'')
}
