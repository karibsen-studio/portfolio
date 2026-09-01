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

export default defineNitroPlugin((nitroApp) => {
  const purge = async ({ name, collection }: PurgeContext) => {
    if (!process.env.VERCEL) return

    const tags = [
      ...getEponymeCacheTags(name, collection).filter(tag => tag !== GLOBAL_TAG),
      ...ALWAYS_PURGE
    ]

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
