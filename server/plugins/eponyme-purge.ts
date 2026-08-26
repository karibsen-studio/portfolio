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

    try {
      await invalidateByTag(getEponymeCacheTags(name, collection))
    } catch (error) {
      console.error('[eponyme] purge CDN échouée, on retombe sur l’expiration', error)
    }
  }

  const hooks = nitroApp.hooks as unknown as {
    hook: (_name: typeof PURGE_HOOKS[number], _handler: (_context: PurgeContext) => Promise<void>) => void
  }

  for (const hook of PURGE_HOOKS) hooks.hook(hook, purge)
})
