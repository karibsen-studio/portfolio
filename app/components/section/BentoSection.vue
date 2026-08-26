<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import BentoValidation from '~/components/animation/bento-validation.vue'
import BentoDevelopment from '~/components/animation/bento-development.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'

defineProps<{
  title: string
  description?: string
}>()

const headingId = useId()
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="flex w-full flex-col gap-9"
  >
    <SectionTitle
      :id="headingId"
      heading="h2"
    >
      <template #title>
        {{ title }}
      </template>
      <template
        v-if="description"
        #description
      >
        <div class="max-w-162.5">
          <p class="md:text-lg leading-relaxed text-foreground-300 md:text-center">
            {{ description }}
          </p>
        </div>
      </template>
    </SectionTitle>

    <div class="relative w-full grid lg:grid-cols-12 auto-rows-auto grid-cols-1 gap-2 lg:auto-rows-93.25">
      <div class="md:h-56.5 lg:h-auto lg:col-span-4 p-8 bg-theme-500 flex flex-col justify-end gap-2 rounded-md">
        <UIcon
          class="size-7 mb-2 text-white"
          name="heroicons:video-camera"
        />
        <h3 class="text-lg font-semibold font-sans text-white">
          Échange & cadrage
        </h3>
        <p class="text-white">
          On commence par un appel pour comprendre votre activité, vos besoins, vos objectifs et vos contraintes. Cet échange nous permet de définir précisément le périmètre du projet avant de commencer.
        </p>
      </div>
      <div class="lg:col-span-8 border border-border-100 rounded-md flex flex-col gap-8 overflow-hidden">
        <div class="pt-8 px-8 flex flex-col gap-2">
          <h3 class="text-lg font-semibold font-sans text-black">
            Conception & validation
          </h3>
          <p class="text-foreground-300">
            Nous concevons la structure, l’interface et l’identité visuelle du projet, puis nous validons ensemble chaque choix avant de passer au développement.
          </p>
        </div>
        <div class="flex-1 min-h-0 px-8">
          <BentoValidation />
        </div>
      </div>

      <div class="lg:col-span-8 border border-border-100 rounded-md flex flex-col gap-8 overflow-hidden">
        <div class="flex-1 min-h-0 pt-8 px-8">
          <BentoDevelopment />
        </div>
        <div class="pb-8 px-8 flex flex-col gap-2">
          <h3 class="text-lg font-semibold font-sans text-black">
            Développement
          </h3>
          <p class="text-foreground-300">
            Le projet prend vie avec une base rapide, responsive, optimisée et pensée pour évoluer dans le temps.
          </p>
        </div>
      </div>

      <div class="h-56.5 lg:h-auto lg:col-span-4 border border-border-100 rounded-md flex flex-col justify-end">
        <div class="pb-8 px-8 flex flex-col gap-2">
          <UIcon
            class="size-7 mb-2 text-black"
            name="heroicons:globe-alt"
          />
          <h3 class="text-lg font-semibold font-sans text-black">
            Mise en ligne & suivi
          </h3>
          <p class="text-foreground-300">
            Nous déployons le projet, vérifions les derniers détails et restons disponibles pour les évolutions futures.
          </p>
        </div>
      </div>

      <CornerHandles />
    </div>
  </BaseSection>
</template>
