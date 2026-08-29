<script setup lang="ts">
import type { HeadingSize, HeadingLevel } from '~/types/heading'
import Heading from '~/components/ui/Heading.vue'

/** Échelles typographiques disponibles, décorrélées du niveau du titre. */

const props = withDefaults(defineProps<{
  /** Niveau sémantique rendu dans le HTML. */
  heading?: HeadingLevel
  /** Taille visuelle. Par défaut celle du niveau : un h1 a la taille d'un h1. */
  size?: HeadingSize
  id?: string
}>(), {
  heading: 'h2'
})

const sizeClasses: Record<HeadingSize, string> = {
  h1: 'md:text-center text-5xl sm:text-6xl lg:text-7xl',
  h2: 'md:text-center text-3xl sm:text-4xl lg:text-5xl max-w-4xl',
  h3: 'text-4xl'
}

/** Au-delà du h3, aucune échelle propre : on reprend celle du h3. */
const defaultSize: Record<HeadingLevel, HeadingSize> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h3',
  h5: 'h3',
  h6: 'h3'
}

const sizeClass = computed(() => sizeClasses[props.size ?? defaultSize[props.heading]])
</script>

<template>
  <div class="flex flex-col items-start gap-5 md:items-center">
    <Heading
      :id="id"
      :as="heading"
      :class="sizeClass"
    >
      <slot name="title" />
    </Heading>

    <slot name="description" />
  </div>
</template>
