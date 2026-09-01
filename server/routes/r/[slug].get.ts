interface RedirectEntry {
  data?: {
    destination?: { href?: string }
  }
}

const FOUND_CACHE = 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'

const MISSING_CACHE = 'public, max-age=0, s-maxage=60'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''

  const entry = slug
    ? await $fetch<RedirectEntry>(
        `/api/eponyme/redirects/${encodeURIComponent(slug)}`,
        { query: { version: 'published' } }
      ).catch(() => null)
    : null

  const destination = entry?.data?.destination?.href
  const tags = getEponymeCacheTags(`redirects/${slug}`, 'redirects').join(',')

  setResponseHeader(event, 'Vercel-Cache-Tag', tags)
  setResponseHeader(event, 'Cache-Tag', tags)
  setResponseHeader(event, 'Cache-Control', destination ? FOUND_CACHE : MISSING_CACHE)

  return sendRedirect(event, destination ?? '/', 302)
})
