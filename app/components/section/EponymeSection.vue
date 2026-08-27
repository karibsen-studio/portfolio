<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import BaseSection from '~/components/section/BaseSection.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import Heading from '~/components/ui/heading.vue'
import PressButton from '~/components/ui/PressButton.vue'

withDefaults(defineProps<{
  title?: string
  paragraphs?: string[]
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaTo?: RouteLocationRaw
}>(), {
  title: 'Eponyme, le CMS pensé pour votre site vitrine.',
  paragraphs: () => [
    'Eponyme est le gestionnaire de contenu que nous avons conçu pour vous laisser la main sur votre site sans vous exposer à sa complexité technique. Depuis une interface claire, vous modifiez vos textes, vos images, vos réalisations ou vos articles, puis publiez vos changements en quelques clics.',
    'L’espace d’administration est construit autour des contenus réellement présents sur votre site. Vous ne cherchez pas parmi des dizaines de réglages inutiles : chaque champ a une place précise et votre design reste protégé.'
  ],
  image: '/assets/image/eponyme.png',
  imageAlt: 'Tableau de bord du CMS Eponyme affichant les contenus modifiables d’un site',
  ctaLabel: 'Découvrir Eponyme',
  ctaTo: '/blog/choisir-son-cms-eponyme-ou-wordpress'
})

const headingId = useId()
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="grid w-full gap-10 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16 px-4!"
  >
    <div class="flex flex-col items-start gap-7">
      <Heading
        :id="headingId"
        as="h2"
        class="text-3xl lg:text-4xl"
      >
        {{ title }}
      </Heading>

      <div class="flex max-w-2xl flex-col gap-5 leading-relaxed text-foreground-200">
        <p
          v-for="paragraph in paragraphs"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>
      </div>

      <PressButton
        v-if="ctaLabel"
        :to="ctaTo"
        :label="ctaLabel"
        color="primary"
      />
    </div>

    <div class="relative min-w-0 border border-border-100 bg-white p-2 sm:p-3">
      <CornerHandles />

      <NuxtImg
        :src="image"
        :alt="imageAlt"
        width="2438"
        height="1550"
        sizes="xs:100vw sm:100vw md:100vw lg:542px xl:650px"
        loading="lazy"
        class="block h-auto w-full max-w-full object-contain rounded-md"
      />
    </div>
  </BaseSection>
</template>
