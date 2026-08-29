<script setup lang="ts">
import type { Component } from 'vue'
import type { ProcessAnimation, ProcessStep } from '~/types/process'
import AnimationFirstCall from '~/components/animation/FirstCall.vue'
import AnimationSiteOnline from '~/components/animation/SiteOnline.vue'
import AnimationSkeletonLoading from '~/components/animation/SkeletonLoading.vue'
import AnimationWebsitePreview from '~/components/animation/WebsitePreview.vue'
import BaseSection from '~/components/section/BaseSection.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

withDefaults(defineProps<{
  title?: string
  steps: ProcessStep[]
}>(), {
  title: 'Un projet clair, du premier appel à la mise en ligne.'
})

const animations: Record<ProcessAnimation, Component> = {
  call: AnimationFirstCall,
  skeleton: AnimationSkeletonLoading,
  website: AnimationWebsitePreview,
  online: AnimationSiteOnline
}

const headingId = useId()

function stepNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <BaseSection
    id="processus"
    :aria-labelledby="headingId"
    class="flex w-full flex-col gap-9"
  >
    <SectionTitle
      :id="headingId"
      heading="h2"
    >
      <template #title>
        {{ title }}
      </template>
    </SectionTitle>

    <ol class="grid gap-5 md:grid-cols-2">
      <li
        v-for="(step, index) in steps"
        :key="step.title"
        class="relative flex flex-col gap-5 border border-border-100 bg-white"
      >
        <div class="relative aspect-[4/3] overflow-hidden">
          <component
            :is="animations[step.animation]"
            v-if="step.animation"
            class="absolute inset-0"
          />
          <span
            v-else
            class="absolute inset-0 flex items-center justify-center font-heading text-8xl tracking-heading text-white/25"
            aria-hidden="true"
          >
            {{ stepNumber(index) }}
          </span>
        </div>

        <div class="flex flex-col gap-2 px-6 pb-6">
          <h3 class="font-sans text-xl font-medium text-black sm:text-2xl">
            {{ step.title }}
          </h3>
          <p class="whitespace-pre-line leading-relaxed text-foreground-300">
            {{ step.description }}
          </p>
        </div>

        <CornerHandles />
      </li>
    </ol>
  </BaseSection>
</template>
