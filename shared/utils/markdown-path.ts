/**
 * The `.md` twin of a page, shared by the server middleware that answers those URLs and
 * by the `<link rel="alternate">` that advertises them. Both directions live here so the
 * two never disagree on what `/` maps to.
 */

/** Paths the site does not publish as Markdown: the CMS dashboard and Nuxt internals. */
function isPagePath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('/__') && !path.startsWith('/api/') && !/\.[a-z0-9]+$/i.test(path)
}

/** `/tarifs` → `/tarifs.md`, `/` → `/index.md`. Returns null when the path has no twin. */
export function toMarkdownPath(path: string): string | null {
  const clean = (path.split('?')[0] || '/').replace(/\/+$/, '')
  if (!isPagePath(clean || '/')) return null
  return `${clean || '/index'}.md`
}

/** `/tarifs.md` → `/tarifs`, `/index.md` and `/.md` → `/`. */
export function fromMarkdownPath(path: string): string | null {
  if (!path.endsWith('.md')) return null

  const target = path.slice(0, -3)
  if (target === '' || target === '/' || target === '/index') return '/'
  return target
}
