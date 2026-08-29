<script setup lang="ts">
import type { FocusItem } from '~/types/content'
import CheckList from '~/components/ui/list/CheckList.vue'
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'

defineProps<{
  title: string
  description?: string
  items: FocusItem[]
}>()

const headingId = useId()
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="flex flex-col gap-10"
  >
    <SectionTitle :id="headingId">
      <template #title>
        {{ title }}
      </template>
      <template #description>
        <div
          v-if="description"
          class="max-w-162.5"
        >
          <p class="md:text-center md:text-lg">
            {{ description }}
          </p>
        </div>
      </template>
    </SectionTitle>

    <div class="relative z-10 grid w-full gap-px border border-border-100 bg-border-100 md:grid-cols-3">
      <article
        v-for="item in items"
        :key="item.title"
        class="flex flex-col gap-4 bg-white p-8"
      >
        <UIcon
          :name="item.icon"
          class="size-7 text-theme-500"
        />

        <h3 class="font-sans text-lg font-medium text-foreground-200">
          {{ item.title }}
        </h3>

        <p class="leading-relaxed text-foreground-100/70">
          {{ item.description }}
        </p>

        <CheckList
          :items="item.points"
          icon="lucide:check"
          icon-class="text-theme-500"
          size="sm"
          class="text-sm leading-relaxed text-foreground-300"
        />

        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="mt-auto inline-flex items-center gap-2 pt-2 font-sans text-sm font-medium text-theme-500 hover:underline"
        >
          {{ item.linkLabel ?? 'En savoir plus' }}
          <UIcon
            name="lucide:arrow-right"
            class="size-4"
            aria-hidden="true"
          />
        </NuxtLink>
      </article>

      <CornerHandles />
    </div>
  </BaseSection>
</template>
