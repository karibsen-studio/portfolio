<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import Heading from '~/components/ui/heading.vue'

export interface ContentGridItem {
  title: string
  description: string
}

defineProps<{
  title: string
  description?: string
  items: ContentGridItem[]
}>()

const headingId = useId()
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="flex w-full flex-col gap-10"
  >
    <header class="grid gap-5 lg:grid-cols-2 lg:gap-20">
      <Heading
        :id="headingId"
        as="h2"
        class="text-4xl sm:text-5xl lg:text-6xl"
      >
        {{ title }}
      </Heading>

      <p
        v-if="description"
        class="max-w-2xl self-end text-lg leading-relaxed text-theme-950 sm:text-xl"
      >
        {{ description }}
      </p>
    </header>

    <ul class="grid border-t border-l border-border-100 sm:grid-cols-2 lg:grid-cols-4">
      <li
        v-for="(item, index) in items"
        :key="item.title"
        class="relative flex min-h-64 flex-col justify-between gap-10 border-r border-b border-border-100 bg-white p-6 sm:p-8"
      >
        <span
          class="font-heading text-4xl tracking-heading text-theme-500"
          aria-hidden="true"
        >
          {{ String(index + 1).padStart(2, '0') }}
        </span>

        <div class="flex flex-col gap-3">
          <Heading
            as="h3"
            class="font-sans! text-2xl font-medium text-black!"
          >
            {{ item.title }}
          </Heading>
          <p class="leading-relaxed text-theme-950">
            {{ item.description }}
          </p>
        </div>

        <CornerHandles />
      </li>
    </ul>
  </BaseSection>
</template>
