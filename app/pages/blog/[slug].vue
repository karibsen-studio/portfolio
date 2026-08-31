<script setup lang="ts">
import { resolveEponymeSeo, type EponymeSeoValue } from '@karibsen/eponyme/config'
import CTASection from '~/components/section/CTASection.vue'
import Heading from '~/components/ui/Heading.vue'

definePageMeta({
  key: route => route.fullPath
})

const route = useRoute()
const slug = String(route.params.slug)

const { data, error, pending, refresh, publishedAt } = useEponymeCollectionEntry('articles', slug)

const article = computed(() => data.value?.data)

if (pending.value) await refresh()

if (error.value || !article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article introuvable',
    fatal: true
  })
}

const seo = computed(() => resolveEponymeSeo(article.value?.seo as EponymeSeoValue | undefined))
const cta = computed(() => article.value?.cta)

useSeoMeta({
  title: () => seo.value.title || `${article.value?.title} | Karibsen`,
  description: () => seo.value.description || article.value?.excerpt,
  ogTitle: () => seo.value.ogTitle,
  ogDescription: () => seo.value.ogDescription,
  ogImage: () => seo.value.image || article.value?.cover
})

const siteUrl = useSiteConfig().url.replace(/\/+$/, '')
const articleUrl = `${siteUrl}/blog/${slug}`

const absoluteUrl = (value?: string) => {
  if (!value) return undefined
  return /^https?:\/\//.test(value) ? value : `${siteUrl}${value.startsWith('/') ? '' : '/'}${value}`
}

const schemaOrg = computed(() => {
  const entry = article.value
  if (!entry) return null

  const image = absoluteUrl(seo.value.image || entry.cover)
  const tags = (entry.tags ?? []) as string[]

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        'headline': entry.title,
        'name': entry.title,
        'description': seo.value.description || entry.excerpt,
        'url': articleUrl,
        'mainEntityOfPage': { '@id': `${articleUrl}#webpage` },
        'inLanguage': 'fr',
        ...(image ? { image: [image] } : {}),
        ...(entry.publishedOn ? { datePublished: entry.publishedOn } : {}),
        'dateModified': publishedAt.value || entry.publishedOn || undefined,
        ...(tags.length ? { keywords: tags } : {}),
        ...(entry.readingTime ? { timeRequired: `PT${entry.readingTime}M` } : {}),
        'author': { '@id': 'https://karibsen.fr/#identity' },
        'publisher': { '@id': 'https://karibsen.fr/#identity' },
        'isPartOf': { '@id': 'https://karibsen.fr/#website' }
      },
      {
        '@type': 'WebPage',
        '@id': `${articleUrl}#webpage`,
        'url': articleUrl,
        'name': seo.value.title || entry.title,
        'isPartOf': { '@id': 'https://karibsen.fr/#website' },
        'primaryImageOfPage': image ? { '@id': `${articleUrl}#primaryimage` } : undefined,
        'breadcrumb': { '@id': `${articleUrl}#breadcrumb` }
      },
      ...(image
        ? [{
            '@type': 'ImageObject',
            '@id': `${articleUrl}#primaryimage`,
            'url': image,
            'contentUrl': image,
            'caption': entry.title
          }]
        : []),
      {
        '@type': 'BreadcrumbList',
        '@id': `${articleUrl}#breadcrumb`,
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': `${siteUrl}/` },
          { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${siteUrl}/blog` },
          { '@type': 'ListItem', 'position': 3, 'name': entry.title }
        ]
      }
    ]
  }
})

useHead(() => ({
  script: schemaOrg.value
    ? [{
        key: 'schema-org-article',
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaOrg.value)
      }]
    : []
}))

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })

const publishedLabel = computed(() => {
  const value = article.value?.publishedOn
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
})
</script>

<template>
  <div class="pb-24 pt-32 md:pt-48">
    <article class="relative z-10 mx-auto flex max-w-3xl flex-col gap-10 px-4 md:px-8">
      <header class="flex flex-col gap-5">
        <p class="flex items-center gap-2 font-sans text-sm font-medium text-foreground-300">
          <span v-if="publishedLabel">{{ publishedLabel }}</span>
          <span
            v-if="publishedLabel && article?.readingTime"
            aria-hidden="true"
          >·</span>
          <span v-if="article?.readingTime">{{ article.readingTime }} min de lecture</span>
        </p>

        <Heading
          as="h1"
          class="text-4xl sm:text-5xl"
        >
          {{ article?.title }}
        </Heading>

        <p
          v-if="article?.excerpt"
          class="md:text-lg leading-relaxed text-foreground-300"
        >
          {{ article.excerpt }}
        </p>
      </header>

      <NuxtImg
        v-if="article?.cover"
        :src="article.cover"
        format="webp"
        :alt="article.title"
        width="1280"
        height="720"
        sizes="100vw md:768px"
        class="aspect-video w-full rounded-3xl object-cover"
      />

      <EponymeRichText
        class="karibsen-prose"
        :html="article?.body"
      />
    </article>

    <CTASection
      v-if="cta"
      :cta-label="cta?.label"
      :cta-to="cta?.to.href"
      :title="cta?.title"
      :description="cta?.description"
    />
  </div>
</template>
