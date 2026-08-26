<script setup lang="ts">
import CornerHandles from '~/components/ui/CornerHandles.vue'

useSeoMeta({
  title: 'Blog | Karibsen',
  description: 'Nos réflexions sur la création de sites web, le référencement, les CMS et les outils qui font la différence.'
})

const { entries: articles, pending } = useEponymeCollection('articles', {
  orderBy: 'publishedOn',
  order: 'desc'
})

const headingId = useId()

const tags = computed(() => {
  const seen = new Set<string>()

  for (const article of articles.value) {
    for (const tag of (article.data.tags ?? []) as string[])
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
    ? articles.value.filter(article => ((article.data.tags ?? []) as string[]).includes(activeTag.value!))
    : articles.value
))

const gridColumns = computed(() => {
  const count = displayedArticles.value.length

  if (count >= 3) return 'md:grid-cols-2 lg:grid-cols-3'
  if (count === 2) return 'md:grid-cols-2'

  return 'mx-auto w-full max-w-150'
})

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })

function formatDate(value: string) {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
}
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
        class="[&_h1]:text-3xl [&_h1]:sm:text-4xl [&_h1]:lg:text-5xl"
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
            : 'border-border-100 bg-white text-black hover:border-black/30'"
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
            : 'border-border-100 bg-white text-black hover:border-black/30'"
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

      <ul
        v-else
        class="relative grid gap-px border border-border-100 bg-border-100"
        :class="gridColumns"
      >
        <CornerHandles />

        <li
          v-for="article in displayedArticles"
          :key="article.slug"
          class="bg-white"
        >
          <NuxtLink
            :to="`/blog/${article.slug}`"
            class="group flex h-full flex-col gap-5 p-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-theme-600"
          >
            <div
              v-if="article.data.cover"
              class="relative aspect-video overflow-hidden bg-black"
            >
              <NuxtImg
                :src="article.data.cover"
                alt=""
                width="640"
                height="360"
                sizes="100vw md:50vw lg:33vw"
                loading="lazy"
                class="absolute inset-0 size-full object-cover"
              />
            </div>

            <div class="flex flex-1 flex-col gap-3">
              <p class="flex items-center gap-2 font-sans text-sm font-medium text-foreground-300">
                <span v-if="article.data.publishedOn">{{ formatDate(article.data.publishedOn) }}</span>
                <span
                  v-if="article.data.publishedOn && article.data.readingTime"
                  aria-hidden="true"
                >·</span>
                <span v-if="article.data.readingTime">{{ article.data.readingTime }} min de lecture</span>
              </p>

              <h2 class="font-sans text-xl font-semibold text-black">
                {{ article.data.title }}
              </h2>

              <p
                v-if="article.data.excerpt"
                class="leading-relaxed text-foreground-300"
              >
                {{ article.data.excerpt }}
              </p>

              <ul
                v-if="article.data.tags?.length"
                class="flex flex-wrap gap-2"
              >
                <li
                  v-for="tag in article.data.tags"
                  :key="tag"
                  class="border border-border-100 px-2 py-1 font-sans text-xs text-foreground-300"
                >
                  {{ tag }}
                </li>
              </ul>

              <span class="mt-auto inline-flex items-center gap-2 pt-2 font-sans font-semibold text-black">
                Lire l’article
                <UIcon
                  name="heroicons:arrow-right-20-solid"
                  aria-hidden="true"
                  class="size-5 transition-transform group-hover:translate-x-1"
                />
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>
