<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  description: string
}>()
</script>

<template>
  <div class="w-full bg-white">
    <div class="p-8 flex flex-col items-start">
      <UIcon
        class="size-7"
        :name="icon"
      />
      <h3 class="font-sans text-lg text-foreground-200 font-medium mt-2 pt-2 pb-1">
        {{ label }}
      </h3>
      <p class="text-foreground-100/70">
        {{ description }}
      </p>
    </div>
  </div>
</template>
