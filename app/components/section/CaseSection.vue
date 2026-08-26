<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
</script>

<template>
  <BaseSection>
    <div class="grid grid-cols-4 gap-10">
      <div
        v-for="index in 4"
        :key="index"
        class="aspect-square border-l border-l-border-100 size-70"
      />
    </div>
  </BaseSection>
</template>
