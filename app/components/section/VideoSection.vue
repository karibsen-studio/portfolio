<script setup lang="ts">
import { SmoothCorners } from '@lisse/vue'
</script>

<template>
  <SmoothCorners
    class="w-full max-w-300 bg-blue-200 aspect-video mx-auto"
    :corners="{ radius: 20, smoothing: 0.6 }"
  >
    <div />
  </SmoothCorners>
</template>
