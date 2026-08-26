<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { motion } from 'motion-v'

const props = withDefaults(defineProps<{
  label?: string
  icon?: string
  to?: RouteLocationRaw
}>(), {
  label: '',
  icon: 'i-lucide-arrow-up-right'
})

const rootComponent = computed(() => props.to ? resolveComponent('NuxtLink') : 'div')
const rootProps = computed(() => props.to ? { to: props.to } : {})

const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')

const isActive = ref(false)

watch(canHover, (value) => {
  if (!value) isActive.value = false
})

const transition = { type: 'spring', bounce: 0.22, visualDuration: 0.4 } as const
</script>

<template>
  <component
    :is="rootComponent"
    v-bind="rootProps"
    class="relative inline-flex h-12 shrink-0 items-center gap-4 rounded-full bg-black pr-1.5 pl-6 transition-transform active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-950"
    @mouseenter="canHover && (isActive = true)"
    @mouseleave="isActive = false"
    @focusin="canHover && (isActive = true)"
    @focusout="isActive = false"
  >
    <motion.span
      class="font-medium leading-tight text-white will-change-[transform,opacity]"
      :animate="{ opacity: isActive ? 0 : 1, x: isActive ? -8 : 0 }"
      :transition="transition"
    >
      <slot>{{ label }}</slot>
    </motion.span>

    <span
      class="size-9 shrink-0"
      aria-hidden="true"
    />

    <motion.span
      layout
      class="absolute flex items-center justify-center bg-white text-theme-950"
      :class="isActive ? 'inset-0' : 'top-1.5 right-1.5 size-9'"
      :style="{ borderRadius: 9999 }"
      :transition="transition"
    >
      <motion.span
        layout
        class="flex size-9 items-center justify-center"
      >
        <UIcon
          :name="icon"
          class="size-5"
          aria-hidden="true"
        />
      </motion.span>
    </motion.span>
  </component>
</template>
