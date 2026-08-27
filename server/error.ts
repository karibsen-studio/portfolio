import { getHeader, send, setResponseHeader, setResponseStatus } from 'h3'

import { renderNotFoundMarkdown, wantsNotFoundMarkdown } from './utils/not-found'

/**
 * A missing page is answered with a short Markdown body instead of the JSON error
 * object Nitro would otherwise return, so an agent reads what is missing and where the
 * real URLs are listed rather than a stack trace.
 *
 * Nitro walks its error handlers in order and stops at the first one that answers, so
 * returning without touching the event hands everything else — browser requests, which
 * keep rendering `error.vue`, and API calls, which keep their JSON — to the handlers
 * behind this one.
 */
export default defineNitroErrorHandler(async (error, event) => {
  const statusCode = Number((error as { statusCode?: number }).statusCode) || 500

  if (statusCode !== 404) return
  if (!wantsNotFoundMarkdown(event.path || '', getHeader(event, 'accept'))) return

  setResponseStatus(event, 404, 'Not Found')
  setResponseHeader(event, 'content-type', 'text/markdown; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'no-cache')
  setResponseHeader(event, 'x-content-type-options', 'nosniff')

  return send(event, renderNotFoundMarkdown(event.path || ''))
})
