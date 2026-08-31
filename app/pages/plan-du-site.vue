<script setup lang="ts">
import PageSection from '~/components/section/PageSection.vue'
import ContentCard from '~/components/ui/ContentCard.vue'

const title = 'Karibsen: Plan du site, services, réalisations et blog'
const description = 'Toutes les pages du site Karibsen : services, agences locales, réalisations, articles et informations légales.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const { entries: realisations } = await useEponymeCollection('realisations', { orderBy: 'title', order: 'asc' })
const { entries: articles } = await useEponymeCollection('articles', { orderBy: 'publishedOn', order: 'desc' })
const { entries: jobs } = await useEponymeCollection('jobs', {
  orderBy: 'publishedAt',
  order: 'desc',
  where: { open: true }
})

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
      { label: 'Création de site web Chelles', to: '/creation-site-web-chelles' },
      { label: 'Agence web Paris', to: '/agence-web-paris' },
      { label: 'Agence web Guadeloupe', to: '/agence-web-guadeloupe' },
      { label: 'Agence web Bordeaux', to: '/agence-web-bordeaux' }
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
  },
  {
    title: 'Nos offres d’emploi',
    links: jobs.value.map(entry => ({
      label: entry.data.title,
      to: `/recrutement/${entry.slug}`
    }))
  }
].filter(group => group.links.length > 0))
</script>

<template>
  <PageSection
    title="Plan du site"
    description="Toutes les pages du site, réunies au même endroit."
    size="h2"
  >
    <div class="flex flex-col gap-6">
      <ContentCard
        v-for="group in groups"
        :key="group.title"
        :title="group.title"
      >
        <ul class="flex flex-col gap-3">
          <li
            v-for="link in group.links"
            :key="link.to"
          >
            <NuxtLink
              :to="link.to"
              class="text-black underline underline-offset-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-600"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </ContentCard>
    </div>
  </PageSection>
</template>
