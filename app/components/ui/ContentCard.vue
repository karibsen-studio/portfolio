<script setup lang="ts">
import type { HeadingLevel } from '~/types/heading'
import CornerHandles from '~/components/ui/CornerHandles.vue'

withDefaults(defineProps<{
  /** Titre de la carte. Ignoré si le slot `title` est fourni. */
  title?: string
  /** Niveau sémantique du titre : ces cartes vivent sous le titre de page. */
  heading?: HeadingLevel
}>(), {
  heading: 'h2'
})
</script>

<template>
  <section class="relative flex flex-col gap-4 border border-border-100 bg-white p-6 sm:p-8">
    <CornerHandles />

    <component
      :is="heading"
      class="font-sans text-2xl font-semibold text-black"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </component>

    <slot />
  </section>
</template>
