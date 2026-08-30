import type { H3Event } from 'h3'
import { send } from 'h3'

import {
  isMarkdownablePath,
  MARKDOWN_BYPASS_HEADER,
  prefersMarkdown,
  renderPageMarkdown
} from '../utils/markdown-page'
import { renderNotFoundMarkdown } from '../utils/not-found'

/**
 * Serves every page as Markdown, the two ways agents ask for it:
 *
 * - by URL — `/tarifs.md` returns the Markdown of `/tarifs`;
 * - by content negotiation — `Accept: text/markdown` on `/tarifs` returns the same body
 *   from the canonical URL.
 *
 * Browsers are untouched: they never send `text/markdown`, and a `.md` URL is a
 * different URL from the page itself.
 */
export default defineEventHandler(async (event) => {
  if (event.method !== 'GET' && event.method !== 'HEAD') return
  if (getHeader(event, MARKDOWN_BYPASS_HEADER)) return

  const path = (event.path || '/').split('?')[0] || '/'

  const suffixTarget = fromMarkdownPath(path)
  const target = suffixTarget ?? path

  if (!isMarkdownablePath(target)) return
  if (!suffixTarget && !prefersMarkdown(getHeader(event, 'accept'))) {
    // The page stays HTML, but the answer depends on `Accept` — caches have to know.
    setResponseHeader(event, 'vary', 'accept')

    // The same declaration as the `<link rel="alternate">` in the head, readable from a
    // HEAD request without parsing the document.
    const markdownPath = toMarkdownPath(target)
    if (markdownPath) {
      setResponseHeader(event, 'link', `<${markdownPath}>; rel="alternate"; type="text/markdown"`)
    }
    return
  }

  if (!suffixTarget) setResponseHeader(event, 'vary', 'accept')

  try {
    // The Markdown headers are only set once the render succeeded: a 500 on the way
    // through has to reach the error handler as the error page it is, not mislabelled
    // as Markdown.
    const markdown = await renderPageMarkdown(event, target)
    setMarkdownHeaders(event)
    setResponseHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
    setMarkdownCacheTags(event)
    // `send` ends the request here: middleware that merely returns a value is asking
    // Nitro to guess, and the route handler behind it would still run.
    return send(event, markdown)
  } catch (error) {
    const statusCode = Number((error as { statusCode?: number }).statusCode) || 500
    if (statusCode !== 404) throw error

    setResponseStatus(event, 404, 'Not Found')
    setMarkdownHeaders(event)
    setResponseHeader(event, 'cache-control', 'no-cache')
    return send(event, renderNotFoundMarkdown(target))
  }
})

/**
 * The Markdown is rendered from the page's own HTML, so a publication makes the `.md`
 * exactly as stale as the page itself. A CDN only purges by tag, so the response carries
 * Eponyme's root tag — the one `server/plugins/eponyme-purge.ts` invalidates on every
 * status change. Without it, a `.md` cached while the collection was still empty kept
 * being served for the whole `stale-while-revalidate` window.
 */
function setMarkdownCacheTags(event: H3Event): void {
  const value = getEponymeCacheTags('markdown').join(',')
  // Vercel reads its own header; `Cache-Tag` is what Cloudflare and Fastly-style CDNs read.
  setResponseHeader(event, 'vercel-cache-tag', value)
  setResponseHeader(event, 'cache-tag', value)
}

function setMarkdownHeaders(event: H3Event): void {
  setResponseHeader(event, 'content-type', 'text/markdown; charset=utf-8')
  setResponseHeader(event, 'x-content-type-options', 'nosniff')
}
