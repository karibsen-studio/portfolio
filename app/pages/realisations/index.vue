<script setup lang="ts">
import ProjectGrid from '~/components/ui/project/ProjectGrid.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import TagFilter from '~/components/ui/TagFilter.vue'

const title = 'Karibsen: Réalisations de sites et applications web'
const description = 'Sites vitrines, applications web et refontes : les projets conçus et développés par Karibsen, avec le contexte et les choix techniques de chacun.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const route = useRoute()

const activeTag = ref(typeof route.query.tag === 'string' ? route.query.tag : '')

const { entries, pending } = await useEponymeCollection('realisations', {
  orderBy: 'publishedAt',
  order: 'desc'
})

const tags = computed(() => sortTags(entries.value.flatMap(entry => entry.data.tags ?? [])))

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

      <TagFilter
        v-model="activeTag"
        :tags="tags"
        label="Filtrer par type de projet"
      />

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
