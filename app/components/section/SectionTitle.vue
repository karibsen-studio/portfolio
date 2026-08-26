<script setup lang="ts">
import Heading, { type HeadingSize } from '~/components/ui/heading.vue'

withDefaults(defineProps<{
  heading?: HeadingSize
  id?: string
}>(), {
  heading: 'h2'
})

const headingSizeClasses: Partial<Record<HeadingSize, string>> = {
  h1: 'md:text-center text-5xl sm:text-6xl lg:text-7xl',
  h2: 'md:text-center text-3xl sm:text-4xl lg:text-5xl max-w-4xl',
  h3: 'text-4xl'
}
</script>

<template>
  <div class="flex flex-col items-start gap-5 md:items-center">
    <Heading
      :id="id"
      :as="heading"
      :class="headingSizeClasses[heading]"
    >
      <slot name="title" />
    </Heading>

    <slot name="description" />
  </div>
</template>
