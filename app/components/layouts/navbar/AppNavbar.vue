<script setup lang="ts">
import PressButton from '~/components/ui/PressButton.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
</script>

<template>
  <nav
    aria-label="Principale"
    class="fixed top-10 z-1000 left-0 w-full"
  >
    <div
      class="relative h-17.5 max-w-6xl w-full mx-auto bg-white border border-border-100 flex items-center justify-between px-4 md:px-6"
    >
      <NuxtLink
        to="/"
        aria-label="Karibsen, accueil"
        class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-600"
      >
        <NuxtImg
          width="36"
          height="42"
          class="h-auto w-9"
          src="/assets/image/logo.svg"
          alt=""
        />
      </NuxtLink>
      <PressButton
        to="/demarrer-un-projet"
        label="Parlons ensemble"
      />

      <CornerHandles />
    </div>
  </nav>
</template>
