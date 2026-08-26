<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import Heading from '~/components/ui/heading.vue'
import PressButton from '~/components/ui/PressButton.vue'
import BaseSection from '~/components/section/BaseSection.vue'
import Marquee from '~/components/ui/Marquee.vue'

interface ServiceItem {
  title: string
  description: string
  features: string[]
  image: string
  imageAlt: string
  to: RouteLocationRaw
  buttonLabel: string
}

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  services?: ServiceItem[]
}>(), {
  title: 'Nos services',
  description: 'Bien plus qu’un simple site web, nous créons des expériences digitales pensées pour affirmer votre présence, séduire vos clients et accompagner votre croissance.',
  services: () => []
})

const headingId = useId()

const defaultServices: ServiceItem[] = [
  {
    title: 'Sites vitrines',
    description: 'Présentez votre activité avec un site rapide, moderne et pensé pour convertir vos visiteurs en clients. Chaque site est conçu sur mesure pour votre image, vos objectifs et votre référencement.',
    features: [
      'Design entièrement sur mesure',
      'Optimisation du référencement naturel',
      'Interface rapide et adaptée à tous les écrans'
    ],
    image: '/assets/image/homepage/services/vitrine.png',
    imageAlt: 'Aperçu du site vitrine de l’auto-école RevyFormation',
    to: '/site-vitrine',
    buttonLabel: 'Créer un site vitrine'
  },
  {
    title: 'Applications web',
    description: 'Transformez vos idées en outils numériques performants et adaptés à vos usages. Nous développons des applications sur mesure, intuitives et capables d’évoluer avec vos besoins.',
    features: [
      'Fonctionnalités adaptées à votre métier',
      'Expérience utilisateur intuitive',
      'Plateforme multi-langues',
      'Intégration de l\'IA native'
    ],
    image: '/assets/image/homepage/services/application.png',
    imageAlt: 'Aperçu de l’application web de gestion de réservations TableKit',
    to: '/application-web-sur-mesure',
    buttonLabel: 'Créer une application web'
  },
  {
    title: 'Refonte de site web',
    description: 'Donnez un nouveau souffle à votre site avec une interface plus moderne, plus rapide et mieux adaptée à vos objectifs. Nous repensons l’expérience sans perdre les acquis de votre présence en ligne.',
    features: [
      'Audit de l’existant et des performances',
      'Design modernisé et expérience simplifiée',
      'Migration maîtrisée et référencement préservé'
    ],
    image: '/assets/image/homepage/services/refonte.png',
    imageAlt: 'Aperçu d’un site web modernisé après sa refonte',
    to: '/refonte-site-web',
    buttonLabel: 'Refondre mon site'
  }
]

const displayedServices = computed(() => props.services.length ? props.services : defaultServices)
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
        <div class="max-w-162.5">
          <p class="md:text-center md:text-lg">
            {{ description }}
          </p>
        </div>
      </template>
    </SectionTitle>

    <div class="relative flex w-full flex-col border border-border-100">
      <article
        v-for="(service, index) in displayedServices"
        :key="service.title"
        class="grid w-full border-border-100 md:grid-cols-2"
        :class="index < displayedServices.length - 1 ? 'border-b' : ''"
      >
        <div
          class="h-80 overflow-hidden border-b border-border-100 bg-white md:h-140 md:border-b-0"
          :class="index % 2 === 1 ? 'md:order-2' : 'md:border-r'"
        >
          <NuxtImg
            v-if="service.image"
            :src="service.image"
            :alt="service.imageAlt"
            width="1280"
            height="1120"
            sizes="100vw md:640px"
            loading="lazy"
            draggable="false"
            class="size-full select-none object-cover"
          />
        </div>

        <div
          class="flex flex-col gap-5 border-border-100 bg-white px-6 py-10 sm:px-10"
          :class="index % 2 === 1 ? 'md:order-1 md:border-r' : ''"
        >
          <Heading
            as="h3"
            class="text-4xl font-sans! font-medium text-black!"
          >
            {{ service.title }}
          </Heading>
          <p>{{ service.description }}</p>

          <ul class="flex flex-col gap-3">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="flex items-start gap-3"
            >
              <UIcon
                name="heroicons:check-circle-20-solid"
                aria-hidden="true"
                class="mt-1 size-5 shrink-0 text-black"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div class="pt-6">
            <PressButton
              color="primary"
              :to="service.to"
              :label="service.buttonLabel"
            />
          </div>
        </div>
      </article>

      <div
        class="pointer-events-none absolute inset-0 z-10 select-none"
        aria-hidden="true"
      >
        <div
          class="absolute -left-1.75 -top-1.75 size-3.5 rounded-[3px] border border-border-100 bg-white"
        />

        <div
          class="absolute -right-1.75 -top-1.75 size-3.5 rounded-[3px] border border-border-100 bg-white"
        />

        <div
          class="absolute -bottom-1.75 -left-1.75 size-3.5 rounded-[3px] border border-border-100 bg-white"
        />

        <div
          class="absolute -bottom-1.75 -right-1.75 size-3.5 rounded-[3px] border border-border-100 bg-white"
        />
      </div>
    </div>

    <slot>
      <div class="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-3.5">
        <h3 class="text-center text-xl font-semibold text-black">
          Votre besoin ne rentre pas dans une
          <span class="bg-theme-500/5 border-[0.5px] border-theme-800/20 text-theme-900 px-1.5 py-px">case</span> ?
        </h3>
        <p class="text-center">
          Espace client, outil métier, réservation ou automatisation : nous concevons aussi des solutions adaptées à votre activité.
        </p>
        <div class="mt-3.5">
          <Marquee to="/demarrer-un-projet">
            Intéressé ?
          </Marquee>
        </div>
      </div>
    </slot>
  </BaseSection>
</template>
