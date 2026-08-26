<script setup lang="ts">
import { motion } from 'motion-v'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  label?: string
  color?: 'primary' | 'neutral'
  pressScale?: number
}>(), {
  label: '',
  color: 'neutral',
  pressScale: 0.94
})
</script>

<template>
  <motion.span
    class="inline-flex will-change-transform"
    :while-press="{ scale: pressScale }"
    :transition="{ type: 'spring', bounce: 0.25, visualDuration: 0.18 }"
  >
    <UButton
      size="lg"
      :color
      class="rounded-full px-6 py-3 text-base"
      v-bind="$attrs"
      :label="label"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps ?? {}"
        />
      </template>
    </UButton>
  </motion.span>
</template>
