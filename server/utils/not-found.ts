/**
 * The body served to non-browser clients on a 404.
 *
 * An agent that gets the rendered error page has to parse the app shell to learn that
 * the URL is missing; a few lines of Markdown say it outright and point at the files
 * that list what does exist.
 */
export function renderNotFoundMarkdown(path: string): string {
  const origin = getLlmsSiteUrl()

  return [
    '# 404 — Page not found',
    '',
    `No page is published at \`${path}\` on ${origin}.`,
    '',
    'Where to look instead:',
    '',
    `- [llms.txt](${origin}/llms.txt) — every URL of the site with a short description`,
    `- [llms-full.txt](${origin}/llms-full.txt) — the same URLs with their full content`,
    `- [sitemap.xml](${origin}/sitemap.xml) — the indexable URLs`,
    `- [Sitemap page](${origin}/plan-du-site) — the human-readable index`,
    `- [Home](${origin}/)`,
    ''
  ].join('\n')
}

/**
 * Markdown is for clients browsing the site without rendering it. Browsers ask for
 * HTML and keep `error.vue`; API callers get the JSON error their client expects.
 */
export function wantsNotFoundMarkdown(path: string, accept: string | undefined): boolean {
  if (path.startsWith('/api/') || path.endsWith('.json')) return false
  return !(accept || '').includes('text/html')
}
