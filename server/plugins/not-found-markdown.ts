import { renderNotFoundMarkdown, wantsNotFoundMarkdown } from '../utils/not-found'

/**
 * A page that answers 404 by setting the status rather than throwing never reaches the
 * error handler: the renderer returns the app shell with a 404 on it. For a client that
 * never asked for HTML that shell is unreadable — and it is exactly what makes an agent
 * believe the URL exists — so it is swapped for the same Markdown body here.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    if (response.statusCode !== 404) return
    if (!wantsNotFoundMarkdown(event.path || '', getHeader(event, 'accept'))) return

    response.headers = {
      ...response.headers,
      'content-type': 'text/markdown; charset=utf-8'
    }
    response.body = renderNotFoundMarkdown(event.path || '')
  })
})
