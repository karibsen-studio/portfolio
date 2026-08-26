<script setup lang="ts">
import { resolveEponymeSeo, type EponymeSeoValue } from '@karibsen/eponyme/config'
import CTASection from '~/components/section/CTASection.vue'
import Heading from '~/components/ui/heading.vue'

definePageMeta({
  key: route => route.fullPath
})

const route = useRoute()
const slug = String(route.params.slug)

const { data, error, pending, refresh } = useEponymeCollectionEntry('articles', slug)

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

useSeoMeta({
  title: () => seo.value.title || `${article.value?.title} | Karibsen`,
  description: () => seo.value.description || article.value?.excerpt,
  ogTitle: () => seo.value.ogTitle,
  ogDescription: () => seo.value.ogDescription,
  ogImage: () => seo.value.image || article.value?.cover
})

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
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
    />
  </div>
</template>
