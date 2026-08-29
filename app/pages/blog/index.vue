<script setup lang="ts">
import ArticleGrid from '~/components/ui/article/ArticleGrid.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

const title = 'Karibsen: Blog sur la création de sites web et le SEO'
const description = 'Nos réflexions sur la création de sites web, le référencement, les CMS et les outils qui font la différence. Retours d’expérience et cas concrets.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const { entries, pending } = useEponymeCollection('articles', {
  orderBy: 'publishedOn',
  order: 'desc'
})

const headingId = useId()

const articles = computed(() => entries.value.map(entry => ({
  slug: entry.slug,
  title: entry.data.title,
  to: `/blog/${entry.slug}`,
  excerpt: entry.data.excerpt,
  cover: entry.data.cover,
  tags: (entry.data.tags ?? []) as string[],
  publishedOn: entry.data.publishedOn,
  readingTime: entry.data.readingTime
})))

const tags = computed(() => {
  const seen = new Set<string>()

  for (const article of articles.value) {
    for (const tag of article.tags)
      seen.add(tag)
  }

  return [...seen].sort((a, b) => a.localeCompare(b, 'fr'))
})

const activeTag = ref<string | null>(null)

watch(tags, (list) => {
  if (activeTag.value && !list.includes(activeTag.value))
    activeTag.value = null
})

const displayedArticles = computed(() => (
  activeTag.value
    ? articles.value.filter(article => article.tags.includes(activeTag.value!))
    : articles.value
))
</script>

<template>
  <div class="pb-24 pt-36 sm:pb-32 sm:pt-44">
    <section
      :aria-labelledby="headingId"
      class="relative z-10 mx-auto flex max-w-300 flex-col gap-10 px-4 xl:px-0"
    >
      <SectionTitle
        :id="headingId"
        heading="h1"
        size="h2"
      >
        <template #title>
          Ce que nous apprenons en construisant le web.
        </template>
        <template #description>
          <p class="max-w-2xl md:text-lg leading-relaxed text-foreground-300 md:text-center">
            Des articles concrets sur la création de sites, le choix des outils et tout ce qui
            fait qu’un projet web tient dans la durée.
          </p>
        </template>
      </SectionTitle>

      <div
        v-if="tags.length"
        class="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filtrer par catégorie"
      >
        <button
          type="button"
          class="border px-4 py-2 font-sans text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600"
          :class="activeTag === null
            ? 'border-black bg-black text-white'
            : 'border-border-100 cursor-pointer bg-white text-black hover:border-black/30'"
          :aria-pressed="activeTag === null"
          @click="activeTag = null"
        >
          Tout
        </button>

        <button
          v-for="tag in tags"
          :key="tag"
          type="button"
          class="border px-4 py-2 font-sans text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600"
          :class="activeTag === tag
            ? 'border-black bg-black text-white'
            : 'border-border-100 cursor-pointer bg-white text-black hover:border-black/30'"
          :aria-pressed="activeTag === tag"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <p
        v-if="pending"
        class="text-lg text-foreground-300"
      >
        Chargement des articles…
      </p>

      <p
        v-else-if="!articles.length"
        class="text-lg text-foreground-300"
      >
        Les premiers articles arrivent bientôt.
      </p>

      <p
        v-else-if="!displayedArticles.length"
        class="text-lg text-foreground-300"
      >
        Aucun article dans cette catégorie pour le moment.
      </p>

      <ArticleGrid
        v-else
        :articles="displayedArticles"
      />
    </section>
  </div>
</template>
