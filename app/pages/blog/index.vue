<script setup lang="ts">
import ArticleGrid from '~/components/ui/article/ArticleGrid.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import TagFilter from '~/components/ui/TagFilter.vue'

const title = 'Karibsen: Blog sur la création de sites web et le SEO'
const description = 'Nos réflexions sur la création de sites web, le référencement, les CMS et les outils qui font la différence. Retours d’expérience et cas concrets.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const activeTag = ref('')

const { entries, pending } = await useEponymeCollection('articles', {
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

const tags = computed(() => sortTags(articles.value.flatMap(article => article.tags)))

const displayedArticles = computed(() => (
  activeTag.value
    ? articles.value.filter(article => article.tags.includes(activeTag.value))
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

      <TagFilter
        v-model="activeTag"
        :tags="tags"
        label="Filtrer par catégorie"
        all-label="Tout"
      />

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
