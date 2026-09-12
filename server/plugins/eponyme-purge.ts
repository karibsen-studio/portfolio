import { invalidateByTag } from '@vercel/functions'

/**
 * Purge le CDN Vercel dès qu'une entrée change de statut.
 *
 * Eponyme pose déjà un `Vercel-Cache-Tag` sur les réponses API et, via `previewPaths`,
 * sur les routes HTML mises sous `swr`/`isr` dans `nuxt.config.ts`. Sans cette purge,
 * une publication n'apparaît qu'à l'expiration de la fenêtre de cache (600 s ici).
 */

interface PurgeContext {
  name: string
  collection?: { name: string }
}

/**
 * `getEponymeCacheTags()` place toujours `eponyme` en tête, et ce tag est porté par
 * toutes les réponses : le passer à la purge viderait le cache du site entier à chaque
 * publication. On le retire pour ne purger que les pages réellement concernées.
 */
const GLOBAL_TAG = 'eponyme'

/**
 * Deux réponses agrègent toutes les collections sans porter de tag d'entrée : le sitemap
 * (tagué `eponyme:sitemap`, un nom qu'aucune entrée ne porte) et le plan du site (tagué à
 * la main dans `nuxt.config.ts`). Sans le tag global, plus rien ne les invalide : on les
 * ajoute donc à chaque purge.
 */
const ALWAYS_PURGE = ['eponyme:sitemap', 'eponyme:plan-du-site']

const PURGE_HOOKS = [
  'eponyme:entry:published',
  'eponyme:entry:unpublished',
  'eponyme:entry:scheduled',
  'eponyme:entry:unscheduled',
  'eponyme:entry:restored',
  'eponyme:entry:trashed',
  'eponyme:entry:untrashed',
  'eponyme:entry:purged'
] as const

/**
 * `invalidateByTag` résout sans rien faire quand la plateforme n'expose pas son API de purge,
 * sans erreur ni trace. On regarde donc le contexte avant d'appeler, pour qu'une purge qui ne
 * part pas soit lisible dans les logs au lieu de passer pour un succès.
 */
function purgeApiAvailable(): boolean {
  const context = (globalThis as Record<symbol, unknown>)[Symbol.for('@vercel/request-context')] as
    | { get?: () => { purge?: unknown } | undefined }
    | undefined

  return Boolean(context?.get?.()?.purge)
}

export default defineNitroPlugin((nitroApp) => {
  const purge = async ({ name, collection }: PurgeContext) => {
    if (!process.env.VERCEL) return

    const tags = [
      ...getEponymeCacheTags(name, collection).filter(tag => tag !== GLOBAL_TAG),
      ...ALWAYS_PURGE
    ]

    if (!purgeApiAvailable()) {
      console.warn('[eponyme] API de purge indisponible, les pages attendront leur expiration', { name, tags })
      return
    }

    try {
      await invalidateByTag(tags)
    } catch (error) {
      console.error('[eponyme] purge CDN échouée, on retombe sur l’expiration', error)
    }
  }

  const hooks = nitroApp.hooks as unknown as {
    hook: (_name: typeof PURGE_HOOKS[number], _handler: (_context: PurgeContext) => Promise<void>) => void
  }

  for (const hook of PURGE_HOOKS) hooks.hook(hook, purge)
})
