# Rapport Schema.org

Analyse du 23 août 2026 pour `https://karibsen.fr/`.

## Implémentation

Le JSON-LD est injecté dans le HTML rendu côté serveur depuis `app/app.vue`.
Il décrit :

- une identité `Organization` globale ;
- un nœud `WebSite` global.

L’organisation reprend uniquement les informations publiques et vérifiables du site :
nom, URL, logo, description, adresse, téléphone, email, LinkedIn et X.

## Validation

| Schéma | Statut | Remarque |
| --- | --- | --- |
| Organization | Valide | Identité globale avec coordonnées et profils sociaux |
| WebSite | Valide | Nom, URL, langue et description du site |

Le fichier `generated-schema.json` présente le graphe global de référence injecté par Nuxt.

Le sous-module automatique `nuxt-schema-org` reste désactivé : sa version 6.3.0 est incompatible avec la version d’Unhead actuellement résolue dans le projet. L’injection native évite cette erreur tout en conservant un JSON-LD présent dès le SSR.
