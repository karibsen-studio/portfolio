<script setup lang="ts">
import CornerHandles from '~/components/ui/CornerHandles.vue'

useSeoMeta({
  title: 'Plan du site | Karibsen',
  description: 'Toutes les pages du site Karibsen : services, agences locales, réalisations, articles et informations légales.'
})

const headingId = useId()

const { entries: realisations } = useEponymeCollection('realisations', { orderBy: 'title', order: 'asc' })
const { entries: articles } = useEponymeCollection('articles', { orderBy: 'publishedOn', order: 'desc' })

const staticGroups = [
  {
    title: 'L’essentiel',
    links: [
      { label: 'Accueil', to: '/' },
      { label: 'Démarrer un projet', to: '/demarrer-un-projet' },
      { label: 'Réalisations', to: '/realisations' },
      { label: 'Blog', to: '/blog' }
    ]
  },
  {
    title: 'Nos services',
    links: [
      { label: 'Création de site vitrine', to: '/site-vitrine' },
      { label: 'Application web sur mesure', to: '/application-web-sur-mesure' },
      { label: 'Refonte de site web', to: '/refonte-site-web' },
      { label: 'Tarifs', to: '/tarifs' },
      { label: 'Agence Nuxt', to: '/agence-nuxt' }
    ]
  },
  {
    title: 'Où nous intervenons',
    links: [
      { label: 'Agence web Seine-et-Marne', to: '/agence-web-seine-et-marne' },
      { label: 'Agence web Paris', to: '/agence-web-paris' },
      { label: 'Agence web Guadeloupe', to: '/agence-web-guadeloupe' }
    ]
  },
  {
    title: 'Informations',
    links: [
      { label: 'Recrutement', to: '/recrutement' },
      { label: 'Mentions légales', to: '/mentions-legales' },
      { label: 'Plan du site', to: '/plan-du-site' }
    ]
  }
]

const groups = computed(() => [
  ...staticGroups,
  {
    title: 'Nos réalisations',
    links: realisations.value.map(entry => ({
      label: entry.data.name,
      to: `/realisations/${entry.slug}`
    }))
  },
  {
    title: 'Nos articles',
    links: articles.value.map(entry => ({
      label: entry.data.title,
      to: `/blog/${entry.slug}`
    }))
  }
].filter(group => group.links.length > 0))
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
      >
        <template #title>
          Plan du site
        </template>
        <template #description>
          <p class="max-w-2xl text-lg leading-relaxed text-theme-950 md:text-center">
            Toutes les pages du site, réunies au même endroit.
          </p>
        </template>
      </SectionTitle>

      <div class="relative grid gap-px border border-border-100 bg-border-100 sm:grid-cols-2 lg:grid-cols-3">
        <CornerHandles />

        <section
          v-for="group in groups"
          :key="group.title"
          class="flex flex-col gap-5 bg-white p-6 sm:p-8"
        >
          <h2 class="font-sans text-xl font-semibold text-black">
            {{ group.title }}
          </h2>

          <ul class="flex flex-col gap-3">
            <li
              v-for="link in group.links"
              :key="link.to"
            >
              <NuxtLink
                :to="link.to"
                class="inline-flex items-center gap-2 text-black underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-600"
              >
                <UIcon
                  name="heroicons:arrow-right-20-solid"
                  aria-hidden="true"
                  class="size-4 shrink-0 text-black"
                />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </div>
</template>
