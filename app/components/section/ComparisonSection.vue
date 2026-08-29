<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import ComparisonTable from '~/components/ui/comparison/ComparisonTable.vue'
import type { ComparisonAction, ComparisonColumn, ComparisonRow } from '~/types/comparison'

defineProps<{
  title: string
  description?: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  featureLabel?: string
  caption?: string
  action?: ComparisonAction
  switchLabel?: string
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

    <ComparisonTable
      :columns="columns"
      :rows="rows"
      :feature-label="featureLabel"
      :caption="caption"
      :action="action"
      :switch-label="switchLabel"
    />
  </BaseSection>
</template>
