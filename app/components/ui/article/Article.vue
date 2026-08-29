<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  title: string
  to: RouteLocationRaw
  excerpt?: string
  cover?: string
  tags?: string[]
  publishedOn?: string
  readingTime?: number
}>()

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })

const publishedLabel = computed(() => {
  if (!props.publishedOn) return ''

  const date = new Date(props.publishedOn)

  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex h-full flex-col gap-5 p-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-theme-600"
  >
    <div
      v-if="cover"
      class="relative aspect-video overflow-hidden bg-black"
    >
      <NuxtImg
        :src="cover"
        format="webp"
        alt=""
        width="640"
        height="360"
        sizes="100vw md:45vw lg:47vw xl:560px"
        loading="lazy"
        class="absolute inset-0 size-full object-cover"
      />
    </div>

    <div class="flex flex-1 flex-col gap-3">
      <p class="flex items-center gap-2 font-sans text-sm font-medium text-foreground-300">
        <span v-if="publishedLabel">{{ publishedLabel }}</span>
        <span
          v-if="publishedLabel && readingTime"
          aria-hidden="true"
        >·</span>
        <span v-if="readingTime">{{ readingTime }} min de lecture</span>
      </p>

      <h2 class="font-sans text-xl font-semibold text-black">
        {{ title }}
      </h2>

      <p
        v-if="excerpt"
        class="leading-relaxed text-foreground-300"
      >
        {{ excerpt }}
      </p>

      <ul
        v-if="tags?.length"
        class="flex flex-wrap gap-2"
      >
        <li
          v-for="tag in tags"
          :key="tag"
          class="border border-border-100 px-2 py-1 font-sans text-xs text-foreground-300"
        >
          {{ tag }}
        </li>
      </ul>

      <span class="mt-auto inline-flex items-center gap-2 pt-2 font-sans font-semibold text-black">
        Lire l’article
        <UIcon
          name="heroicons:arrow-right-20-solid"
          aria-hidden="true"
          class="size-5 transition-transform group-hover:translate-x-1"
        />
      </span>
    </div>
  </NuxtLink>
</template>
