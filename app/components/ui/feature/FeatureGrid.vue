<script setup lang="ts">
import type { FeatureItem } from '~/types/content'
import type { HeadingLevel } from '~/types/heading'
import Feature from '~/components/ui/feature/Feature.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import BaseSection from '~/components/section/BaseSection.vue'

const props = withDefaults(defineProps<{
  features?: FeatureItem[]
  /** Niveau des titres, à ajuster selon la place de la grille dans la page. */
  heading?: HeadingLevel
}>(), {
  heading: 'h3',
  features: () => [
    {
      icon: 'heroicons:sparkles',
      label: 'Chargement éclair',
      description: 'Des pages rapides, fluides et optimisées sur tous les appareils.'
    },
    {
      icon: 'heroicons:cube',
      label: 'Pensée sur mesure',
      description: 'Un site conçu autour de votre activité, sans template générique.'
    },
    {
      icon: 'heroicons:squares-plus',
      label: 'Prêt à évoluer',
      description: 'Une base solide pour ajouter de nouvelles pages, fonctionnalités et outils.'
    }
  ]
})

const columnClasses: Record<number, string> = {
  1: '',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4'
}

const gridColumns = computed(() => columnClasses[props.features.length] ?? 'md:grid-cols-3')
</script>

<template>
  <BaseSection>
    <div
      class="relative z-10 mx-auto grid w-full max-w-300 gap-px
           border border-border-100 bg-border-100"
      :class="gridColumns"
    >
      <Feature
        v-for="feature in features"
        :key="feature.label"
        :icon="feature.icon"
        :label="feature.label"
        :description="feature.description"
        :heading="heading"
      />

      <CornerHandles />
    </div>
  </BaseSection>
</template>
