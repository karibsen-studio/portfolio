<script setup lang="ts">
import { resolveEponymeSeo, type EponymeSeoValue } from '@karibsen/eponyme/config'
import CTASection from '~/components/section/CTASection.vue'
import FeatureGrid from '~/components/ui/feature/featureGrid.vue'

const { data: recrutement } = useEponyme('recrutement')
const headingId = useId()

const seo = computed(() => resolveEponymeSeo(recrutement.value?.seo as EponymeSeoValue | undefined))

const features = [
  {
    icon: 'heroicons:sparkles',
    label: 'Des projets soignés',
    description: 'Des sites et des applications où le design, le contenu et la qualité technique comptent vraiment.'
  },
  {
    icon: 'heroicons:light-bulb',
    label: 'De l’autonomie',
    description: 'La liberté de proposer, d’expérimenter et de prendre des responsabilités sur les projets.'
  },
  {
    icon: 'heroicons:chat-bubble-left-right',
    label: 'Une collaboration directe',
    description: 'Des échanges simples, des décisions rapides et une place réelle pour chaque contribution.'
  }
]

useSeoMeta({
  title: () => seo.value.title || 'Recrutement | Karibsen',
  description: () => seo.value.description || recrutement.value?.description,
  ogTitle: () => seo.value.ogTitle,
  ogDescription: () => seo.value.ogDescription,
  ogImage: () => seo.value.image
})
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:gap-16">
    <section
      :aria-labelledby="headingId"
      class="relative z-10 mx-auto flex max-w-3xl flex-col gap-10 px-4 md:px-8"
    >
      <SectionTitle
        :id="headingId"
        heading="h1"
      >
        <template #title>
          {{ recrutement?.title }}
        </template>
        <template #description>
          <p class="max-w-2xl md:text-lg leading-relaxed text-foreground-300 md:text-center">
            {{ recrutement?.description }}
          </p>
        </template>
      </SectionTitle>
    </section>

    <FeatureGrid :features="features" />

    <CTASection
      :title="recrutement?.cta.title"
      :description="recrutement?.cta.description"
      :cta-label="recrutement?.cta.label ?? 'Envoyer une candidature'"
      :cta-to="recrutement?.cta.to.href ?? 'mailto:contact@karibsen.fr'"
    />
  </div>
</template>
