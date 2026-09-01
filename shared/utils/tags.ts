/**
 * Dédoublonne et trie les tags d’une collection.
 *
 * `Array.prototype.sort()` compare les chaînes par point de code : « Édition » finirait
 * après « Zoo ». Les tags sont saisis en français dans Eponyme, donc la comparaison doit
 * l’être aussi.
 */
export function sortTags(tags: Iterable<string>) {
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b, 'fr'))
}
