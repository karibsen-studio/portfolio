import type { H3Event } from 'h3'

/**
 * Shared source of truth for `/llms.txt` and `/llms-full.txt`.
 *
 * Both files are written in English on purpose: the site itself is French, but the
 * consumers here are language models discovering what Karibsen does and where to read
 * more, so the guidance around the URLs is kept in English while the content stays as
 * it is published.
 */

export interface LlmsLink {
  title: string
  path: string
  description: string
}

export interface LlmsSection {
  title: string
  links: LlmsLink[]
}

export const LLMS_SITE_NAME = 'Karibsen'

export const LLMS_SUMMARY = 'Karibsen is an independent French web studio that designs and builds bespoke websites and web applications with Nuxt — marketing sites, redesigns and custom business apps, from the first call to the launch and beyond.'

export const LLMS_NOTES = [
  'The website is published in French; the descriptions below are English summaries.',
  'Contact: contact@karibsen.fr — project enquiries go through /demarrer-un-projet ("start a project").',
  'Services cover marketing websites, website redesigns, custom web applications, SEO foundations, hosting and maintenance.',
  'The studio works remotely across France, with on-site availability in Île-de-France (Seine-et-Marne, Paris).',
  'Every page is also published as Markdown: append `.md` to any URL below (the home page is /index.md), or send `Accept: text/markdown`.'
]

const STATIC_SECTIONS: LlmsSection[] = [
  {
    title: 'Essentials',
    links: [
      { title: 'Home', path: '/', description: 'Overview of the studio: bespoke websites built to strengthen your brand and attract customers.' },
      { title: 'Start a project', path: '/demarrer-un-projet', description: 'Project enquiry form for a website, a redesign or a web application, with a personalised answer within 24 hours.' },
      { title: 'About', path: '/a-propos', description: 'The story behind Karibsen, an independent studio without the overhead of a large agency.' },
      { title: 'Pricing', path: '/tarifs', description: 'Starting prices for a marketing website, a custom web application or a website redesign.' },
      { title: 'Sitemap', path: '/plan-du-site', description: 'Every page of the site gathered in one place.' }
    ]
  },
  {
    title: 'Services',
    links: [
      { title: 'Marketing website design', path: '/site-vitrine', description: 'Bespoke marketing websites, fast and built to turn visitors into customers.' },
      { title: 'Custom web applications', path: '/application-web-sur-mesure', description: 'Design and development of business web apps shaped around your teams, clients and processes.' },
      { title: 'Website redesign', path: '/refonte-site-web', description: 'Redesigns with a modernised, faster experience that preserves existing SEO equity.' },
      { title: 'Nuxt agency', path: '/agence-nuxt', description: 'Nuxt and Vue specialists: websites, web apps and Nuxt 4 migrations, with a focus on performance and SEO.' }
    ]
  },
  {
    title: 'Where we work',
    links: [
      { title: 'Web agency in Seine-et-Marne', path: '/agence-web-seine-et-marne', description: 'Websites, redesigns and web apps for companies in Seine-et-Marne, from a studio born in Chelles.' },
      { title: 'Web agency in Paris', path: '/agence-web-paris', description: 'Independent web studio based in Paris 12, with a single point of contact from the first call to launch.' },
      { title: 'Web agency in Bordeaux', path: '/agence-web-bordeaux', description: 'Websites, redesigns and web apps for companies in Bordeaux and the Gironde area.' },
      { title: 'Web agency in Guadeloupe', path: '/agence-web-guadeloupe', description: 'Remote website and web app projects for Guadeloupean businesses, with meetings planned around the time difference.' }
    ]
  },
  {
    title: 'Work and writing',
    links: [
      { title: 'Case studies', path: '/realisations', description: 'Websites, web applications and redesigns designed and developed by Karibsen.' },
      { title: 'Blog', path: '/blog', description: 'Articles on building websites, SEO, CMS choices and the tools that make a difference.' }
    ]
  },
  {
    title: 'Company',
    links: [
      { title: 'Careers', path: '/recrutement', description: 'Open applications for people who care about design, web development and well-crafted digital experiences.' },
      { title: 'Legal notice', path: '/mentions-legales', description: 'Publisher, hosting provider, intellectual property and personal data information.' }
    ]
  }
]

export interface LlmsCollectionEntry {
  slug: string
  title: string
  data: Record<string, unknown>
  publishedAt: string | null
  updatedAt: string | null
}

export function getLlmsSiteUrl(): string {
  const configured = (useRuntimeConfig().public as { site?: { url?: string } }).site?.url
  return (configured || 'https://karibsen.fr').replace(/\/+$/, '')
}

export function llmsUrl(path: string): string {
  return `${getLlmsSiteUrl()}${path === '/' ? '/' : path}`
}

/** The `.md` twin of a page, spelled out so an agent does not have to infer the rule. */
export function llmsMarkdownUrl(path: string): string | null {
  const markdownPath = toMarkdownPath(path)
  return markdownPath ? `${getLlmsSiteUrl()}${markdownPath}` : null
}

export function getLlmsStaticSections(): LlmsSection[] {
  return STATIC_SECTIONS
}

async function listCollection(event: H3Event, name: string, orderBy: string, order: 'asc' | 'desc'): Promise<LlmsCollectionEntry[]> {
  try {
    const page = await event.$fetch<{ entries: LlmsCollectionEntry[] }>(`/api/eponyme-collections/${name}`, {
      query: { orderBy, order, take: 200 }
    })
    return page?.entries ?? []
  } catch {
    // A missing or failing collection must not take the whole file down.
    return []
  }
}

export function getLlmsProjects(event: H3Event): Promise<LlmsCollectionEntry[]> {
  return listCollection(event, 'realisations', 'title', 'asc')
}

export function getLlmsArticles(event: H3Event): Promise<LlmsCollectionEntry[]> {
  return listCollection(event, 'articles', 'publishedOn', 'desc')
}

const BLOCK_TAGS = /<\/?(p|div|section|article|header|footer|figure|figcaption|table|tr)[^>]*>/gi

/** Rich text is stored as HTML; llms-full.txt wants it as readable Markdown. */
export function htmlToMarkdown(html: unknown): string {
  if (typeof html !== 'string' || !html.trim()) return ''

  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<hr\s*\/?>/gi, '\n---\n')
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, level: string, inner: string) => `\n\n${'#'.repeat(Number(level))} ${stripTags(inner)}\n\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner: string) => `\n- ${stripTags(inner)}`)
    .replace(/<\/(ul|ol)>/gi, '\n\n')
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner: string) => `\n\n> ${stripTags(inner).replace(/\n+/g, '\n> ')}\n\n`)
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_, inner: string) => `\n\n\`\`\`\n${stripTags(inner)}\n\`\`\`\n\n`)
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, inner: string) => `\`${stripTags(inner)}\``)
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner: string) => `**${stripTags(inner)}**`)
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner: string) => `_${stripTags(inner)}_`)
    .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi, (_, alt: string, src: string) => `\n\n![${alt}](${src})\n\n`)
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, (_, src: string) => `\n\n![](${src})\n\n`)
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href: string, inner: string) => `[${stripTags(inner)}](${absoluteUrl(href)})`)
    .replace(BLOCK_TAGS, '\n\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map(line => decodeEntities(line).trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function absoluteUrl(href: string): string {
  return href.startsWith('/') ? llmsUrl(href) : href
}

function stripTags(value: string): string {
  return decodeEntities(value.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, '\'')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
}

/** Collapses rich text or a long field into a single-line summary. */
export function toSummary(value: unknown, max = 200): string {
  const text = typeof value === 'string' ? stripTags(value) : ''
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`
}

export function formatLlmsDate(value: unknown): string {
  if (typeof value !== 'string' || !value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}

export function sendLlmsText(event: H3Event, body: string): string {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
  return body
}
