<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  title: string
  items: Array<{
    label: string
    to: RouteLocationRaw
  }>
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="font-sans text-sm font-semibold capitalize tracking-wide text-white/70">
      {{ title }}
    </h2>

    <ul class="flex flex-col gap-3">
      <li
        v-for="item in items"
        :key="item.label"
      >
        <NuxtLink
          :to="item.to"
          class="text-white/90 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
