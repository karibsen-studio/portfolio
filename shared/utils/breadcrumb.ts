export interface BreadcrumbTrailItem {
  label: string
  to?: string
}

export function breadcrumbItemList(items: BreadcrumbTrailItem[], siteUrl: string) {
  return items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.label,
    ...(item.to ? { item: `${siteUrl}${item.to}` } : {})
  }))
}
