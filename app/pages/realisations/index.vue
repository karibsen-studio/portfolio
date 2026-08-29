<script setup lang="ts">
import ProjectGrid from '~/components/ui/project/ProjectGrid.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

const title = 'Karibsen: Réalisations de sites et applications web'
const description = 'Sites vitrines, applications web et refontes : les projets conçus et développés par Karibsen, avec le contexte et les choix techniques de chacun.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const route = useRoute()

const activeTag = computed(() => typeof route.query.tag === 'string' ? route.query.tag : '')

const { entries, pending } = useEponymeCollection('realisations', {
  orderBy: 'publishedAt',
  order: 'desc'
})

const tags = computed(() => [...new Set(entries.value.flatMap(entry => entry.data.tags ?? []))].sort())

const projects = computed(() => entries.value
  .filter(entry => !activeTag.value || (entry.data.tags ?? []).includes(activeTag.value))
  .map(entry => ({
    name: entry.data.name,
    tags: entry.data.tags,
    description: entry.data.description,
    image: entry.data.image,
    to: `/realisations/${entry.slug}`
  })))

const headingId = useId()
const filterId = useId()

const chipClasses = 'inline-flex border px-4 py-2 font-sans text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600'
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
          Des projets pensés pour durer.
        </template>
        <template #description>
          <p class="max-w-2xl md:text-lg leading-relaxed text-foreground-300 md:text-center">
            Chaque réalisation part d’un besoin réel : présenter une activité, simplifier un
            métier ou repartir sur des bases plus saines.
          </p>
        </template>
      </SectionTitle>

      <nav
        v-if="tags.length"
        :aria-labelledby="filterId"
      >
        <h2
          :id="filterId"
          class="sr-only"
        >
          Filtrer par type de projet
        </h2>

        <ul class="flex flex-wrap justify-center gap-2">
          <li>
            <NuxtLink
              to="/realisations"
              :aria-current="activeTag ? undefined : 'page'"
              :class="[
                chipClasses,
                activeTag
                  ? 'border-border-100 bg-white text-black hover:border-black/30'
                  : 'border-black bg-black text-white'
              ]"
            >
              Tous
            </NuxtLink>
          </li>

          <li
            v-for="tag in tags"
            :key="tag"
          >
            <NuxtLink
              :to="{ path: '/realisations', query: { tag } }"
              :aria-current="activeTag === tag ? 'page' : undefined"
              :class="[
                chipClasses,
                activeTag === tag
                  ? 'border-black bg-black text-white'
                  : 'border-border-100 bg-white text-black hover:border-black/30'
              ]"
            >
              {{ tag }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <p
        v-if="pending"
        class="text-lg text-foreground-300"
      >
        Chargement des réalisations…
      </p>

      <p
        v-else-if="!projects.length"
        class="text-lg text-foreground-300"
      >
        <template v-if="activeTag">
          Aucune réalisation ne porte le tag « {{ activeTag }} ».
        </template>
        <template v-else>
          Les premières réalisations arrivent bientôt.
        </template>
      </p>

      <ProjectGrid
        v-else
        :projects="projects"
      />
    </section>
  </div>
</template>
