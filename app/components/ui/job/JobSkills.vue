<script setup lang="ts">
defineProps<{
  skills?: string[]
}>()
</script>

<template>
  <ul
    v-if="skills?.length"
    class="flex flex-wrap gap-2"
  >
    <li
      v-for="skill in skills"
      :key="skill"
      class="border border-border-100 bg-white px-3 py-1 font-sans text-sm text-foreground-300"
    >
      {{ skill }}
    </li>
  </ul>
</template>
