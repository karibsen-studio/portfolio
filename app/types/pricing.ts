import type { RouteLocationRaw } from 'vue-router'

export interface PricingPlan {
  title: string
  price: string
  pricePrefix?: string
  priceSuffix?: string
  description: string
  features: string[]
  ctaLabel?: string
  ctaTo?: RouteLocationRaw
  image?: string
  imageAlt?: string
  highlight?: boolean
  badge?: string
}

export interface PricingDetail {
  title: string
  description: string
  icon?: string
}
