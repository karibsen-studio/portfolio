<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  icon?: string
}>(), {
  icon: 'heroicons:check-20-solid'
})
</script>

<template>
  <div class="flex w-fit items-center gap-2 border border-border-100 bg-white px-3.5 py-2 font-sans text-sm font-medium text-black">
    <UIcon
      v-if="icon"
      :name="icon"
      aria-hidden="true"
      class="size-4 shrink-0 text-theme-500"
    />
    {{ label }}
  </div>
</template>
