<script setup lang="ts">
import type { NuxtError } from '#app'
import AppFooter from '~/components/layout/footer/AppFooter.vue'
import AppNavbar from '~/components/layout/navbar/AppNavbarElastic.vue'
import { MotionConfig } from 'motion-v'
import BaseSection from '~/components/section/BaseSection.vue'
import Heading from '~/components/ui/Heading.vue'
import PressButton from '~/components/ui/PressButton.vue'

defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <MotionConfig reduced-motion="user">
    <UApp>
      <div class="absolute top-0 left-1/2 h-full w-full max-w-300 -translate-x-1/2 bg-white" />

      <div
        class="pointer-events-none absolute top-0 left-1/2 h-full w-full max-w-300 -translate-x-1/2"
        aria-hidden="true"
      >
        <svg class="absolute inset-0 size-full text-[var(--color-border-100)]">
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100%"
            stroke="currentColor"
            stroke-width="1"
            stroke-dasharray="16,16"
          />
          <line
            x1="100%"
            y1="0"
            x2="100%"
            y2="100%"
            transform="translate(-0.5, 0)"
            stroke="currentColor"
            stroke-width="1"
            stroke-dasharray="16,16"
          />
        </svg>
      </div>

      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute top-0 left-1/2 h-full w-section -translate-x-1/2">
          <svg
            class="pointer-events-none absolute inset-0 size-full"
            aria-hidden="true"
          >
            <pattern
              id="dots"
              x="0"
              y="0"
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="6"
                cy="6"
                r="0.75"
                class="fill-neutral-300"
              />
            </pattern>
            <rect
              width="100%"
              height="100%"
              fill="url(#dots)"
            />
          </svg>
        </div>
      </div>

      <AppNavbar />

      <UMain>
        <div class="flex flex-col gap-16 pb-24 pt-36 sm:pb-32 sm:pt-44 lg:gap-24">
          <BaseSection class="flex flex-col items-center gap-7 text-center">
            <div class="flex max-w-4xl flex-col items-center gap-5">
              <Heading
                as="h1"
                class="text-3xl sm:text-4xl lg:text-5xl"
              >
                {{ error?.statusCode === 404 ? 'Page introuvable' : 'Une erreur est survenue' }}
              </Heading>
              <p class="max-w-2xl text-lg leading-relaxed text-theme-950 sm:text-xl">
                {{ error?.statusCode === 404 ? "Désolé, la page que vous recherchez n'existe pas ou a été déplacée." : "Un problème technique s'est produit. Nous vous prions de nous excuser pour la gêne occasionnée." }}
              </p>
            </div>

            <div class="mt-8 flex justify-center">
              <PressButton
                label="Retour à l'accueil"
                @click="handleError"
              />
            </div>
          </BaseSection>
        </div>
      </UMain>

      <AppFooter />
    </UApp>
  </MotionConfig>
</template>
