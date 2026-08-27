<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import Heading from '~/components/ui/heading.vue'

const props = defineProps<{
  name: string
  tags: string[]
  description: string
  image: string
  to: RouteLocationRaw
}>()

const imageFailed = ref(false)

watch(() => props.image, () => {
  imageFailed.value = false
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="group flex flex-col gap-5 rounded-md bg-white p-4 text-black outline-none focus-visible:ring-4 focus-visible:ring-theme-500 focus-visible:ring-offset-4"
  >
    <div class="relative min-h-87.5 overflow-hidden rounded-lg">
      <NuxtImg
        v-show="!imageFailed"
        :src="image"
        alt=""
        width="1280"
        height="960"
        sizes="100vw md:50vw"
        loading="lazy"
        draggable="false"
        class="absolute inset-0 size-full select-none object-cover"
        @error="imageFailed = true"
      />
      <div
        v-if="imageFailed"
        class="absolute inset-0 flex select-none items-center justify-center bg-foreground-100/5"
        aria-hidden="true"
      >
        <NuxtImg
          src="/assets/image/logo.svg"
          alt=""
          width="64"
          height="74"
          draggable="false"
          class="h-auto w-16 opacity-30"
        />
      </div>
    </div>

    <div class="flex items-end justify-between gap-5 px-2 pb-2">
      <div class="flex min-w-0 flex-col">
        <Heading
          as="h3"
          class="truncate font-sans! text-xl font-medium tracking-tight! text-black! sm:text-2xl"
        >
          {{ name }}
        </Heading>
        <div class="flex gap-2">
          <span
            v-for="(tag, index) in tags"
            :key="tag"
            class="text-lg font-medium text-foreground-200/50"
          >
            {{ tag }}{{ index < tags.length - 1 ? ',' : '' }}
          </span>
        </div>
      </div>

      <span
        class="flex shrink-0 items-center justify-center rounded-full text-black duration-500 group-hover:rotate-45"
      >
        <UIcon
          name="lucide:arrow-up-right"
          aria-hidden="true"
          class="size-7"
        />
      </span>
    </div>
  </NuxtLink>
</template>
