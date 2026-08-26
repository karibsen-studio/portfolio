<script setup lang="ts">
import Heading from '~/components/ui/heading.vue'
import BaseSection from '~/components/section/BaseSection.vue'

withDefaults(defineProps<{
  title?: string
  text: string
}>(), {
  title: 'Conçu pour faire avancer votre activité.'
})

const headingId = useId()
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="grid w-full gap-6"
  >
    <Heading
      :id="headingId"
      as="h2"
      class="text-3xl md:text-4xl md:text-center"
    >
      {{ title }}
    </Heading>

    <p class="max-w-2xl md:text-center mx-auto leading-relaxed text-theme-950 md:text-lg">
      {{ text }}
    </p>
  </BaseSection>
</template>
