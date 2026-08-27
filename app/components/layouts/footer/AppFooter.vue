<script setup lang="ts">
import FooterItem from '~/components/layouts/footer/FooterItem.vue'

const offerItems = [
  { label: 'Site vitrine', to: '/site-vitrine' },
  { label: 'Application web sur mesure', to: '/application-web-sur-mesure' },
  { label: 'Refonte de site web', to: '/refonte-site-web' },
  { label: 'Agence Nuxt', to: '/agence-nuxt' }
]

const discoverItems = [
  { label: 'Démarrer un projet', to: '/demarrer-un-projet' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Tarifs', to: '/tarifs' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Blog', to: '/blog' },
  { label: 'Recrutement', to: '/recrutement' }
]

const areaItems = [
  { label: 'Agence web Seine-et-Marne', to: '/agence-web-seine-et-marne' },
  { label: 'Agence web Paris', to: '/agence-web-paris' },
  { label: 'Agence web Guadeloupe', to: '/agence-web-guadeloupe' },
  { label: 'Agence web Bordeaux', to: '/agence-web-bordeaux' }
]

const legalItems = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Plan du site', to: '/plan-du-site' }
]

const email = 'contact@karibsen.fr'
const phone = '07 49 34 87 48'
const phoneHref = '+33749348748'

const currentYear = new Date().getFullYear()

const socialLinks = [
  {
    label: 'LinkedIn',
    icon: 'i-simple-icons-linkedin',
    to: 'https://www.linkedin.com/company/karibsen'
  },
  {
    label: 'X',
    icon: 'i-simple-icons-x',
    to: 'https://x.com/karibsenstudios'
  }
]
</script>

<template>
  <footer class="relative z-10 px-4 pb-8 xl:px-0">
    <div class="relative mx-auto w-full max-w-300 bg-black text-white">
      <div
        class="pointer-events-none absolute inset-0 z-10 select-none"
        aria-hidden="true"
      >
        <div class="absolute -left-1.75 -top-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
        <div class="absolute -right-1.75 -top-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
        <div class="absolute -bottom-1.75 -left-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
        <div class="absolute -bottom-1.75 -right-1.75 size-3.5 rounded-[3px] border border-black/30 bg-white" />
      </div>

      <div class="grid gap-12 p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <div class="flex flex-col items-start gap-6">
          <NuxtLink
            to="/"
            aria-label="Karibsen, retour à l’accueil"
            class="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <NuxtImg
              width="50"
              height="58"
              class="h-auto w-12.5 [filter:brightness(0)_invert(1)]"
              src="/assets/image/logo.svg"
              alt=""
            />
          </NuxtLink>

          <p class="max-w-sm leading-relaxed text-white/70">
            Studio indépendant de création de sites et d’applications web sur mesure.
            Un seul interlocuteur, du premier échange à la mise en ligne.
          </p>

          <div class="flex flex-col items-start gap-2">
            <NuxtLink
              :to="`mailto:${email}`"
              class="font-sans font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {{ email }}
            </NuxtLink>

            <NuxtLink
              :to="`tel:${phoneHref}`"
              class="font-sans font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {{ phone }}
            </NuxtLink>
          </div>

          <nav aria-label="Réseaux sociaux">
            <ul class="flex items-center gap-3">
              <li
                v-for="social in socialLinks"
                :key="social.label"
              >
                <NuxtLink
                  :to="social.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.label"
                  aria-describedby="footer-new-tab-hint"
                  class="flex size-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <UIcon
                    :name="social.icon"
                    aria-hidden="true"
                    class="size-5"
                  />
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <span
            id="footer-new-tab-hint"
            hidden
          >Ouvre dans un nouvel onglet</span>
        </div>

        <nav
          aria-label="Pied de page"
          class="grid gap-10 sm:grid-cols-3"
        >
          <FooterItem
            title="Offres"
            :items="offerItems"
          />
          <FooterItem
            title="Découvrir"
            :items="discoverItems"
          />
          <FooterItem
            title="Où nous intervenons"
            :items="areaItems"
          />
        </nav>
      </div>

      <div class="border-t border-white/15 px-8 py-6 sm:px-10">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-white/60">
            © {{ currentYear }} Karibsen. Sites et applications web sur mesure.
          </p>

          <ul class="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li
              v-for="item in legalItems"
              :key="item.label"
            >
              <NuxtLink
                :to="item.to"
                class="text-sm text-white/60 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
