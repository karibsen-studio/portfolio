<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'

defineProps<{
  title: string
  description?: string
  items: string[]
  /** Phrase de conclusion affichée sous la liste. */
  note?: string
}>()

const headingId = useId()
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="flex flex-col gap-10"
  >
    <SectionTitle :id="headingId">
      <template #title>
        {{ title }}
      </template>
      <template #description>
        <div
          v-if="description"
          class="max-w-162.5"
        >
          <p class="md:text-center md:text-lg">
            {{ description }}
          </p>
        </div>
      </template>
    </SectionTitle>

    <div class="relative z-10 grid w-full gap-px border border-border-100 bg-border-100 md:grid-cols-2">
      <p
        v-for="item in items"
        :key="item"
        class="flex items-start gap-4 bg-white p-6 sm:p-8"
      >
        <UIcon
          name="lucide:check"
          class="mt-0.5 size-5 shrink-0 text-theme-500"
          aria-hidden="true"
        />
        <span class="leading-relaxed text-foreground-100/80">{{ item }}</span>
      </p>

      <CornerHandles />
    </div>

    <p
      v-if="note"
      class="max-w-162.5 leading-relaxed text-foreground-300 md:self-center md:text-center"
    >
      {{ note }}
    </p>
  </BaseSection>
</template>
