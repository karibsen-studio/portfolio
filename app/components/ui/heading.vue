<script setup lang="ts">
export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

defineProps<{
  as: HeadingSize
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
