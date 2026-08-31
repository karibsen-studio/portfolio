<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import JobGrid from '~/components/ui/job/JobGrid.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

const title = 'Karibsen: Recrutement, offres de stage et d\'emploi'
const description = 'Nous recrutons des profils curieux en design et en développement web. Découvrez les stages, alternances et postes ouverts chez Karibsen.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const { entries, pending } = await useEponymeCollection('jobs', {
  orderBy: 'publishedAt',
  order: 'desc',
  where: {
    open: true
  }
})

const jobs = computed(() => entries.value.map(entry => ({
  slug: entry.slug,
  reference: entry.data.reference,
  title: entry.data.title,
  excerpt: entry.data.excerpt,
  skills: entry.data.skills ?? [],
  to: { name: 'recrutement-slug', params: { slug: entry.slug } }
})))
</script>

<template>
  <div class="pb-24 pt-32 md:pt-48">
    <BaseSection class="flex flex-col gap-10">
      <SectionTitle
        heading="h1"
        size="h2"
      >
        <template #title>
          Rejoindre Karibsen
        </template>

        <template #description>
          <div class="max-w-170">
            <p class="md:text-center md:text-lg text-foreground-300">
              Nous sommes toujours curieux de rencontrer des personnes passionnées par le design, le développement web
              et les expériences numériques bien pensées.
            </p>
          </div>
        </template>
      </SectionTitle>

      <JobGrid
        v-if="!pending"
        :jobs="jobs"
      />

      <CTASection
        cta-to="mailto:contact@karibsen.fr?subject=Candidature%20spontan%C3%A9e"
        title="Vous souhaitez travailler avec Karibsen ?"
        description="Envoyez-nous quelques mots sur votre parcours, vos envies et les projets dont vous êtes fier."
        cta-label="Envoyer une candidature"
      />
    </BaseSection>
  </div>
</template>
