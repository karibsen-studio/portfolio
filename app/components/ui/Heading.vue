<script setup lang="ts">
import type { HeadingLevel } from '~/types/heading'
/** Niveau sémantique du titre, indépendant de sa taille visuelle. */

defineProps<{
  as: HeadingLevel
}>()
</script>

<template>
  <component
    :is="as"
    class="text-theme-500 font-heading tracking-heading leading-heading"
  >
    <slot />
  </component>
</template>
