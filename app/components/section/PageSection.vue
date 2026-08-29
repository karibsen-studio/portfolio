<script setup lang="ts">
import type { HeadingLevel, HeadingSize } from '~/types/heading'
import SectionTitle from '~/components/section/SectionTitle.vue'

withDefaults(defineProps<{
  /** Titre de la page. Ignoré si le slot `title` est fourni. */
  title?: string
  /** Texte d'introduction. Ignoré si le slot `description` est fourni. */
  description?: string
  /** Niveau sémantique du titre. */
  heading?: HeadingLevel
  /** Taille visuelle du titre, indépendante du niveau. */
  size?: HeadingSize
  /** `prose` pour un contenu qui se lit de haut en bas, `wide` pour une grille. */
  width?: 'prose' | 'wide'
}>(), {
  heading: 'h1',
  width: 'prose'
})

const headingId = useId()

const widthClasses = {
  prose: 'max-w-3xl px-4 md:px-8',
  wide: 'max-w-300 px-4 xl:px-0'
} as const
</script>

<template>
  <div class="pb-24 pt-36 sm:pb-32 sm:pt-44">
    <section
      :aria-labelledby="headingId"
      class="relative z-10 mx-auto flex flex-col gap-10"
      :class="widthClasses[width]"
    >
      <SectionTitle
        :id="headingId"
        :heading="heading"
        :size="size"
      >
        <template #title>
          <slot name="title">
            {{ title }}
          </slot>
        </template>

        <template
          v-if="$slots.description || description"
          #description
        >
          <slot name="description">
            <p class="max-w-2xl text-lg leading-relaxed text-foreground-300 md:text-center">
              {{ description }}
            </p>
          </slot>
        </template>
      </SectionTitle>

      <slot />
    </section>
  </div>
</template>
