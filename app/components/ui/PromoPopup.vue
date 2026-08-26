<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { motion } from 'motion-v'
import Heading from '~/components/ui/heading.vue'
import PressButton from '~/components/ui/PressButton.vue'

const props = withDefaults(defineProps<{
  city: string
  where: string
  storageKey?: string
  badge?: string
  price?: string
  priceNote?: string
  description?: string
  includes?: string[]
  ctaLabel?: string
  ctaTo?: RouteLocationRaw
  delay?: number
}>(), {
  storageKey: 'karibsen-promo-vitrine-300',
  badge: 'Offre de lancement',
  price: '300 €',
  priceNote: 'HT · site vitrine 3 pages',
  ctaLabel: 'Réserver l’offre',
  ctaTo: '/demarrer-un-projet',
  includes: () => [
    'Design sur mesure, sans modèle recoloré',
    'Devis fixe, validé avant de commencer',
    'Mise en ligne et bases SEO incluses'
  ],
  delay: 4000
})

const isOpen = ref(false)
const titleId = useId()

const resolvedDescription = computed(() => props.description
  ?? `Un tarif de lancement pour nos premiers projets ${props.where}. Le moyen le plus simple de juger notre travail sur un vrai site, pas sur une promesse.`)

let openTimer: ReturnType<typeof setTimeout> | undefined

function dismiss() {
  isOpen.value = false

  try {
    localStorage.setItem(props.storageKey, '1')
  } catch {
    // stockage indisponible (navigation privée) : le popup réapparaîtra
  }
}

onMounted(() => {
  let dismissed = false

  try {
    dismissed = localStorage.getItem(props.storageKey) === '1'
  } catch {
    dismissed = false
  }

  if (dismissed) return

  openTimer = setTimeout(() => {
    isOpen.value = true
  }, props.delay)
})

onKeyStroke('Escape', () => {
  if (isOpen.value) dismiss()
})

onBeforeUnmount(() => {
  if (openTimer) clearTimeout(openTimer)
})
</script>

<template>
  <ClientOnly>
    <motion.aside
      :aria-labelledby="titleId"
      :aria-hidden="!isOpen"
      :inert="!isOpen"
      class="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-border-100 bg-white p-6 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.25)] will-change-[transform,opacity] sm:right-6 sm:bottom-6"
      :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'"
      :initial="{ opacity: 0, y: 24 }"
      :animate="isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }"
      :transition="{ type: 'spring', bounce: 0.2, visualDuration: 0.4 }"
    >
      <UButton
        icon="i-lucide-x"
        color="neutral"
        variant="ghost"
        size="sm"
        class="absolute top-3 right-3 rounded-full"
        :aria-label="`Fermer l’offre ${price} pour ${city}`"
        @click="dismiss"
      />

      <div class="flex flex-col items-start gap-4">
        <div class="flex flex-col gap-2">
          <Heading
            :id="titleId"
            as="h2"
            class="text-2xl sm:text-3xl font-sans font-semibold text-black!"
          >
            Site vitrine 3 pages à {{ price }}
          </Heading>

          <p class="text-sm leading-relaxed text-foreground-300">
            {{ resolvedDescription }}
          </p>
        </div>

        <ul class="flex flex-col gap-2">
          <li
            v-for="item in includes"
            :key="item"
            class="flex items-start gap-2 text-sm font-medium text-foreground-200"
          >
            <UIcon
              name="heroicons:check-20-solid"
              aria-hidden="true"
              class="mt-0.5 size-4 shrink-0 text-theme-500"
            />
            {{ item }}
          </li>
        </ul>

        <div class="flex w-full flex-col gap-3 border-t border-border-100 pt-4">
          <PressButton
            :to="ctaTo"
            :label="ctaLabel"
            color="neutral"
            @click="dismiss"
          />
        </div>
      </div>
    </motion.aside>
  </ClientOnly>
</template>
