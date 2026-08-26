<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import Marquee from '~/components/ui/Marquee.vue'
import Tag from '~/components/ui/tags/Tag.vue'
import BaseSection from '~/components/section/BaseSection.vue'

withDefaults(defineProps<{
  title: string
  description?: string
  ctaLabel?: string
  ctaTo?: RouteLocationRaw
  workedWith?: boolean
}>(), {
  description: '',
  ctaLabel: '',
  workedWith: true
})
</script>

<template>
  <BaseSection>
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-250 bg-[radial-gradient(ellipse_85%_70%_at_50%_12%,color-mix(in_oklab,var(--color-theme-500)_35%,transparent),color-mix(in_oklab,var(--color-theme-300)_16%,transparent)_45%,transparent_75%)] blur-3xl"
      aria-hidden="true"
    />

    <div
      class="max-w-250 relative mx-auto md:px-8 pt-32 md:pt-48 min-h-[80vh] flex flex-col items-center gap-9"
      :class="$slots.outside ? 'mb-20' : ''"
    >
      <div class="flex flex-col items-center gap-5">
        <div class="max-w-lg md:max-w-3xl lg:max-w-5xl">
          <ui-heading
            class="text-4xl md:text-5xl lg:text-6xl text-center text-black!"
            as="h1"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </ui-heading>
        </div>

        <div
          v-if="description || $slots.description"
          class="md:max-w-[70%] flex flex-col"
        >
          <p class="text-lg text-foreground-200 text-center font-sans tracking-paragraph leading-heading">
            <slot name="description">
              {{ description }}
            </slot>
          </p>
        </div>
      </div>

      <div class="flex max-md:justify-center flex-wrap gap-4">
        <Tag label="100% sur mesure" />
        <Tag label="Retours illimités" />
        <Tag label="Livraison rapide" />
      </div>

      <Marquee
        v-if="ctaLabel"
        :to="ctaTo"
      >
        <div class="flex items-center gap-3.5">
          {{ ctaLabel }}
        </div>
      </Marquee>

      <slot />
    </div>

    <slot name="outside" />
  </BaseSection>
</template>
