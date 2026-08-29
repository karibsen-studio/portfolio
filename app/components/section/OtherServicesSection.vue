<script setup lang="ts">
import type { OtherService } from '~/types/content'
import BaseSection from '~/components/section/BaseSection.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

const props = withDefaults(defineProps<{
  exclude?: string
  title?: string
  description?: string
  services?: OtherService[]
}>(), {
  exclude: '',
  title: 'On fait aussi ça.',
  description: '',
  services: () => []
})

const defaultServices: OtherService[] = [
  {
    key: 'site-vitrine',
    icon: 'heroicons:sparkles',
    label: 'Création de site vitrine',
    description: 'Présenter votre activité avec un site rapide, distinctif et pensé pour déclencher des prises de contact.',
    to: '/site-vitrine'
  },
  {
    key: 'application-web-sur-mesure',
    icon: 'heroicons:puzzle-piece',
    label: 'Application web sur mesure',
    description: 'Un outil construit autour de vos processus : espace client, tableau de bord, réservations ou gestion interne.',
    to: '/application-web-sur-mesure'
  },
  {
    key: 'refonte-site-web',
    icon: 'heroicons:arrow-path',
    label: 'Refonte de site web',
    description: 'Repartir sur une base moderne et rapide, sans perdre le référencement déjà acquis.',
    to: '/refonte-site-web'
  }
]

const displayedServices = computed(() => {
  const catalogue = props.services.length ? props.services : defaultServices

  return catalogue.filter(service => service.key !== props.exclude)
})

const columnClasses: Record<number, string> = {
  1: '',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3'
}

const gridColumns = computed(() => columnClasses[displayedServices.value.length] ?? 'md:grid-cols-3')

const headingId = useId()
</script>

<template>
  <BaseSection
    v-if="displayedServices.length"
    :aria-labelledby="headingId"
    class="flex w-full flex-col gap-9"
  >
    <SectionTitle :id="headingId">
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

    <ul
      class="relative z-10 grid w-full gap-px border border-border-100 bg-border-100"
      :class="gridColumns"
    >
      <li
        v-for="service in displayedServices"
        :key="service.key"
        class="bg-white"
      >
        <NuxtLink
          :to="service.to"
          class="flex h-full flex-col items-start gap-2 p-8 transition-colors hover:bg-theme-500/5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-theme-600"
        >
          <UIcon
            :name="service.icon"
            aria-hidden="true"
            class="size-7"
          />
          <h3 class="mt-2 pb-1 pt-2 font-sans text-lg font-medium text-foreground-200">
            {{ service.label }}
          </h3>
          <p class="text-foreground-100/70">{{ service.description }}</p>

          <span class="mt-auto inline-flex items-center gap-2 pt-6 font-sans font-medium text-foreground-200">
            En savoir plus
            <UIcon
              name="heroicons:arrow-right-20-solid"
              aria-hidden="true"
              class="size-5"
            />
          </span>
        </NuxtLink>
      </li>

      <CornerHandles />
    </ul>
  </BaseSection>
</template>
