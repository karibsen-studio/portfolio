<script setup lang="ts">
import type { HeadingLevel } from '~/types/heading'

withDefaults(defineProps<{
  icon: string
  label: string
  description: string
  /** Niveau du titre, à ajuster selon la place de la grille dans la page. */
  heading?: HeadingLevel
}>(), {
  heading: 'h3'
})
</script>

<template>
  <div class="w-full bg-white">
    <div class="p-8 flex flex-col items-start">
      <UIcon
        class="size-7"
        :name="icon"
      />
      <component
        :is="heading"
        class="font-sans text-lg text-foreground-200 font-medium mt-2 pt-2 pb-1"
      >
        {{ label }}
      </component>
      <p class="text-foreground-100/70">
        {{ description }}
      </p>
    </div>
  </div>
</template>
