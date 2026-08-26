<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import Heading from '~/components/ui/heading.vue'
import PressButton from '~/components/ui/PressButton.vue'

withDefaults(defineProps<{
  ctaLabel: string
  ctaTo?: RouteLocationRaw
  title?: string
  description?: string
}>(), {
  ctaTo: '/demarrer-un-projet',
  title: 'Vous avez une idée, un besoin ou un site à faire évoluer ?',
  description: 'Un premier échange suffit pour y voir clair : on cadre le besoin, on vous dit ce qui est réaliste, et vous repartez avec des pistes concrètes.'
})

const headingId = useId()
</script>

<template>
  <section
    id="echangeons"
    :aria-labelledby="headingId"
    class="relative z-10 mx-auto mt-24 max-w-300 px-4 md:mt-32 xl:px-0"
  >
    <div class="relative border border-theme-600/20 bg-theme-500 p-8 sm:p-12">
      <div
        class="pointer-events-none absolute inset-0 z-10 select-none"
        aria-hidden="true"
      >
        <div class="absolute -left-1.75 -top-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
        <div class="absolute -right-1.75 -top-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
        <div class="absolute -bottom-1.75 -left-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
        <div class="absolute -bottom-1.75 -right-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
      </div>

      <div class="flex flex-col items-center gap-8 text-center">
        <div class="flex flex-col items-center gap-4">
          <Heading
            :id="headingId"
            as="h2"
            class="max-w-4xl text-3xl text-black! sm:text-4xl lg:text-5xl"
          >
            {{ title }}
          </Heading>

          <p
            v-if="description"
            class="max-w-2xl leading-relaxed text-black/70"
          >
            {{ description }}
          </p>
        </div>

        <PressButton
          :to="ctaTo"
          :label="ctaLabel"
          color="neutral"
        />
      </div>
    </div>
  </section>
</template>
