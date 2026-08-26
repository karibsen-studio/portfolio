<script setup lang="ts">
defineProps<{
  content: string
  reviewer: {
    avatarURL: string
    name: string
    position: string
  }
}>()
</script>

<template>
  <figure class="flex h-full flex-col justify-between gap-10 border border-black/10 bg-white/80 backdrop-blur-3xl p-7 sm:p-8">
    <blockquote>
      <p class="leading-relaxed text-theme-950">
        {{ content }}
      </p>
    </blockquote>

    <figcaption class="flex items-center gap-4">
      <UAvatar
        v-if="reviewer.avatarURL"
        :src="reviewer.avatarURL"
        :alt="reviewer.name"
        width="30"
        height="30"
        class="size-7.5 shrink-0 rounded-full object-cover"
      />
      <span
        v-else
        class="flex size-12 shrink-0 items-center justify-center rounded-full bg-theme-950 text-sm font-semibold text-white"
        aria-hidden="true"
      >
        {{ reviewer.name.charAt(0) }}
      </span>

      <span class="flex min-w-0 flex-col">
        <span class="font-semibold text-black">{{ reviewer.name }}</span>
        <span class="text-sm font-medium text-black/60">{{ reviewer.position }}</span>
      </span>
    </figcaption>
  </figure>
</template>
