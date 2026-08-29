import type { RouteLocationRaw } from 'vue-router'

export interface ComparisonAction {
  label: string
  to: RouteLocationRaw
  color?: 'primary' | 'neutral'
}

export interface ComparisonColumn {
  /** Nom affiché en tête de colonne (ex. « Karibsen », « Agence classique »). */
  label: string
  /** Petite précision sous le nom (ex. « à partir de 700 € »). */
  note?: string
  /** Icône Iconify optionnelle affichée au dessus du nom. */
  icon?: string
  /** Image (logo) affichée au dessus du nom, prioritaire sur `icon`. */
  image?: string
  /** Texte alternatif de l'image, vide si elle est décorative. */
  imageAlt?: string
}

export type ComparisonValue = boolean | string

export interface ComparisonRow {
  /** Critère comparé, affiché dans la première colonne. */
  label: string
  /** Précision optionnelle sous le critère. */
  description?: string
  /**
   * Une valeur par colonne, dans le même ordre que `columns`.
   * `true` / `false` affichent une icône, une chaîne est affichée telle quelle.
   */
  values: ComparisonValue[]
}
