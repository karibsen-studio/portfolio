import { addCacheTag } from '@vercel/functions'
import { getRouteRules } from 'nitropack/runtime'

/**
 * Étiquette l'entrée ISR de chaque page rendue.
 *
 * Les routeRules posent bien un en-tête `Vercel-Cache-Tag`, mais l'entrée ISR stockée par
 * Vercel n'en est pas étiquetée : une purge par tag la laisse intacte. `addCacheTag` déclare
 * le tag sur la réponse en cours, ce que la purge lit réellement.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', async (_response, { event }) => {
    if (!process.env.VERCEL) return

    const tags = getRouteRules(event).headers?.['Cache-Tag']
    if (!tags) return

    try {
      await addCacheTag(tags.split(',').filter(Boolean))
    } catch (error) {
      // Une page rendue reste une page rendue. Sans tag, elle attendra son expiration.
      console.error('[eponyme] addCacheTag a échoué', error)
    }
  })
})
