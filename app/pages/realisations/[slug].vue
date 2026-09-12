<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import OtherServicesSection from '~/components/section/OtherServicesSection.vue'
import PageBreadcrumb from '~/components/ui/PageBreadcrumb.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

definePageMeta({
  key: route => route.fullPath
})

const route = useRoute()
const slug = route.params.slug as string

const { data, error, pending, refresh } = useEponymeCollectionEntry('realisations', slug)

const project = computed(() => data.value?.data)

if (pending.value) await refresh()

if (error.value || !project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Réalisation introuvable',
    fatal: true
  })
}

const breadcrumb = computed<BreadcrumbTrailItem[]>(() => [
  { label: 'Accueil', to: '/' },
  { label: 'Réalisations', to: '/realisations' },
  { label: project.value?.name ?? 'Étude de cas' }
])

const title = () => project.value?.name
  ? `Karibsen: Étude de cas ${project.value.name}`
  : 'Karibsen: Étude de cas'

const description = () => project.value?.description

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const siteUrl = useSiteConfig().url.replace(/\/+$/, '')
const projectUrl = `${siteUrl}/realisations/${slug}`

const absoluteUrl = (value?: string) => {
  if (!value) return undefined
  return /^https?:\/\//.test(value) ? value : `${siteUrl}${value.startsWith('/') ? '' : '/'}${value}`
}

const schemaOrg = computed(() => {
  const entry = project.value
  if (!entry) return null

  const image = absoluteUrl(entry.image)
  const tags = (entry.tags ?? []) as string[]
  const locales = (entry.locales ?? []) as string[]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${projectUrl}#project`,
        'name': entry.name,
        'headline': entry.name,
        'description': entry.description,
        'url': projectUrl,
        'mainEntityOfPage': { '@id': `${projectUrl}#webpage` },
        'inLanguage': 'fr',
        ...(image ? { image: [image] } : {}),
        ...(tags.length ? { keywords: tags } : {}),
        ...(locales.length ? { spatialCoverage: locales } : {}),
        'creator': { '@id': 'https://karibsen.fr/#identity' },
        'publisher': { '@id': 'https://karibsen.fr/#identity' },
        'isPartOf': { '@id': 'https://karibsen.fr/#website' }
      },
      {
        '@type': 'WebPage',
        '@id': `${projectUrl}#webpage`,
        'url': projectUrl,
        'name': title(),
        'isPartOf': { '@id': 'https://karibsen.fr/#website' },
        'primaryImageOfPage': image ? { '@id': `${projectUrl}#primaryimage` } : undefined,
        'breadcrumb': { '@id': `${projectUrl}#breadcrumb` }
      },
      ...(image
        ? [{
            '@type': 'ImageObject',
            '@id': `${projectUrl}#primaryimage`,
            'url': image,
            'contentUrl': image,
            'caption': entry.name
          }]
        : []),
      {
        '@type': 'BreadcrumbList',
        '@id': `${projectUrl}#breadcrumb`,
        'itemListElement': breadcrumbItemList(breadcrumb.value, siteUrl)
      }
    ]
  }
})

useHead(() => ({
  script: schemaOrg.value
    ? [{
        key: 'schema-org-realisation',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaOrg.value)
      }]
    : []
}))
</script>

<template>
  <BaseSection class="relative z-10 pt-32 md:pt-48 flex w-full flex-col gap-9">
    <div class="max-w-180 mx-auto w-full">
      <PageBreadcrumb :items="breadcrumb" />
    </div>

    <SectionTitle
      heading="h1"
      size="h2"
    >
      <template #title>
        {{ project?.name }}
      </template>
    </SectionTitle>

    <div class="karibsen-prose max-w-180 mx-auto">
      <EponymeRichText :html="project?.text" />

      <p v-if="slug === 'as-chelles-athletisme'">
        Pour un projet similaire, découvrez notre accompagnement en
        <NuxtLink to="/creation-site-web-chelles">création de site web à Chelles</NuxtLink>.
      </p>
    </div>

    <div class="mb-20">
      <OtherServicesSection
        class="px-0!"
        description="Au-delà de la refonte, nous créons aussi des sites vitrines et des applications web sur mesure."
      />
    </div>
  </BaseSection>
</template>
