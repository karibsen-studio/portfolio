<script setup lang="ts">
import Marquee from '~/components/ui/Marquee.vue'

import type { AccordionItem } from '@nuxt/ui'
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

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
      >
        <template #body="{ item }">
          <!-- eslint-disable vue/no-v-html -- réponses rédigées dans les pages, aucune saisie visiteur -->
          <div
            class="[&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-theme-600 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-theme-600"
            v-html="item.content"
          />
          <!-- eslint-enable vue/no-v-html -->
        </template>
      </UAccordion>
    </div>

    <Marquee
      v-if="showCta"
      label="Intéressé ?"
      to="/demarrer-un-projet"
    />
  </BaseSection>
</template>
