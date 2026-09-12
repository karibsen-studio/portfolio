/**
 * Une réalisation est listée partout, sauf si l’auteur a décoché « Visible dans les listes »
 * dans Eponyme. Les entrées enregistrées avant l’ajout du champ n’ont pas de valeur : elles
 * restent visibles, seul un `false` explicite masque le projet.
 *
 * La page `/realisations/<slug>` reste accessible dans tous les cas.
 */
export function isRealisationVisible(data?: { visible?: boolean } | null): boolean {
  return data?.visible !== false
}
