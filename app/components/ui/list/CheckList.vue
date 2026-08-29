<script setup lang="ts">
const props = withDefaults(defineProps<{
  items?: string[]
  icon?: string
  iconClass?: string
  size?: 'sm' | 'md'
}>(), {
  items: () => [],
  icon: 'heroicons:check-circle-20-solid',
  iconClass: 'text-black',
  size: 'md'
})

const sizeClasses = computed(() => (
  props.size === 'sm'
    ? { list: 'gap-2', item: 'gap-2', icon: 'mt-0.5 size-4' }
    : { list: 'gap-3', item: 'gap-3', icon: 'mt-1 size-5' }
))
</script>

<template>
  <ul
    v-if="items.length"
    class="flex flex-col"
    :class="sizeClasses.list"
  >
    <li
      v-for="item in items"
      :key="item"
      class="flex items-start"
      :class="sizeClasses.item"
    >
      <UIcon
        :name="icon"
        class="shrink-0"
        :class="[sizeClasses.icon, iconClass]"
        aria-hidden="true"
      />
      <span>{{ item }}</span>
    </li>
  </ul>
</template>
