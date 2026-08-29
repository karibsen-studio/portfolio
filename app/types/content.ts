import type { RouteLocationRaw } from 'vue-router'

/** Une réalisation affichée dans la grille de projets. */
export interface ProjectItem {
  name: string
  tags: string[]
  description: string
  image: string
  to: RouteLocationRaw
}

/** Une offre affichée sur la page recrutement. */
export interface JobItem {
  slug: string
  reference: string
  title: string
  excerpt: string
  skills: string[]
  to: RouteLocationRaw
}

/** Un article affiché dans la grille du blog. */
export interface ArticleItem {
  slug: string
  title: string
  to: RouteLocationRaw
  excerpt?: string
  cover?: string
  tags?: string[]
  publishedOn?: string
  readingTime?: number
}

/** Un argument court affiché dans une grille de points forts. */
export interface FeatureItem {
  icon: string
  label: string
  description: string
}

/** Un service mis en avant en bas des pages service. */
export interface OtherService {
  key: string
  icon: string
  label: string
  description: string
  to: string
}

/** Un besoin détaillé, avec ses exemples et son lien. */
export interface FocusItem {
  icon: string
  title: string
  description: string
  /** Exemples concrets listés sous la description. */
  points?: string[]
  to?: RouteLocationRaw
  linkLabel?: string
}

/** Un cas d'usage court, affiché en grille. */
export interface UseCaseItem {
  icon: string
  label: string
  description: string
}
