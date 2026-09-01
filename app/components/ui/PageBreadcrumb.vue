<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const props = defineProps<{
  items: BreadcrumbTrailItem[]
}>()

const breadcrumb = computed<BreadcrumbItem[]>(() => props.items.map(item => ({
  label: item.label,
  to: item.to
})))
</script>

<template>
  <UBreadcrumb :items="breadcrumb">
    <template #separator>
      <span class="mx-2 text-muted">/</span>
    </template>
  </UBreadcrumb>
</template>
