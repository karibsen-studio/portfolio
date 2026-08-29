<script setup lang="ts">
import type { UseCaseItem } from '~/types/content'
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import Feature from '~/components/ui/feature/Feature.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'

const props = defineProps<{
  title: string
  description?: string
  items: UseCaseItem[]
}>()

const headingId = useId()

const columnClasses: Record<number, string> = {
  1: '',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  5: 'sm:grid-cols-2 lg:grid-cols-5'
}

const gridColumns = computed(() => columnClasses[props.items.length] ?? 'sm:grid-cols-2 lg:grid-cols-4')
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

    <div
      class="relative z-10 grid w-full gap-px border border-border-100 bg-border-100"
      :class="gridColumns"
    >
      <Feature
        v-for="item in items"
        :key="item.label"
        :icon="item.icon"
        :label="item.label"
        :description="item.description"
      />

      <CornerHandles />
    </div>
  </BaseSection>
</template>
