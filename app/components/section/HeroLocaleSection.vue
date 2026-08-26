<script setup lang="ts">
import Heading from '~/components/ui/heading.vue'
import { SmoothCorners } from '@lisse/vue'
import Marquee from '~/components/ui/Marquee.vue'
import Tag from '~/components/ui/tags/Tag.vue'
import WorkedWith from '~/components/ui/WorkedWith.vue'

withDefaults(defineProps<{
  title: string
  description: string
  image: string
  imageAlt: string
  ctaLabel?: string
  workedWith?: boolean
}>(), {
  ctaLabel: 'Démarrer un projet ?',
  workedWith: true
})
</script>

<template>
  <div class="relative z-10 grid gap-10 grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] max-w-300 mx-auto px-4 md:px-8 pt-32 md:pt-48 min-h-screen mb-20">
    <SmoothCorners
      :corners="{ radius: 12, smoothing: 0.6 }"
      class="rounded-xl h-full max-md:aspect-[4/3]"
    >
      <NuxtImg
        :src="image"
        :alt="imageAlt"
        draggable="false"
        class="size-full select-none object-cover"
      />
    </SmoothCorners>
    <div class="flex flex-col gap-9">
      <div class="flex flex-col gap-5">
        <Heading
          class="text-4xl sm:text-5xl lg:text-6xl"
          as="h1"
        >
          {{ title }}
        </Heading>
        <p>{{ description }}</p>
      </div>
      <div class="flex flex-wrap gap-4">
        <Tag label="100% sur mesure" />
        <Tag label="Retours illimités" />
        <Tag label="Livraison rapide" />
      </div>
      <WorkedWith v-if="workedWith" />
      <div>
        <Marquee
          :label="ctaLabel"
          to="/demarrer-un-projet"
        />
      </div>
    </div>
  </div>
</template>
