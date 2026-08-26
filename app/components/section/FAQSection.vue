<script setup lang="ts">
import Marquee from '~/components/ui/Marquee.vue'

import type { AccordionItem } from '@nuxt/ui'
import BaseSection from '~/components/section/BaseSection.vue'

interface FaqItem {
  question: string
  answer: string
}

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  items?: FaqItem[]
  showCta?: boolean
}>(), {
  title: '',
  description: '',
  items: () => [],
  showCta: true
})

const headingId = useId()

const accordionItems = computed<AccordionItem[]>(() => props.items.map(item => ({
  label: item.question,
  content: item.answer
})))
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="w-full flex flex-col gap-9 items-center"
  >
    <SectionTitle :id="headingId">
      <template #title>
        {{ title }}
      </template>
      <template
        v-if="description"
        #description
      >
        <div class="max-w-162.5">
          <p class="md:text-center md:text-lg">
            {{ description }}
          </p>
        </div>
      </template>
    </SectionTitle>

    <div class="max-w-4xl w-full mx-auto">
      <UAccordion
        size="xl"
        trailing-icon="heroicons:plus-solid"
        :ui="{
          label: 'text-lg md:text-xl',
          trailingIcon: 'size-6 group-data-[state=open]:rotate-135',
          body: 'text-base md:text-lg',
          trigger: 'py-6 cursor-pointer bg-white',
          item: 'border-t-border-100 bg-white'
        }"
        :items="accordionItems"
      />
    </div>

    <Marquee
      v-if="showCta"
      label="Intéressé ?"
      to="/demarrer-un-projet"
    />
  </BaseSection>
</template>
