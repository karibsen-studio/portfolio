<script setup>
import AppFooter from '~/components/layout/footer/AppFooter.vue'
import AppNavbar from '~/components/layout/navbar/AppNavbarElastic.vue'
import { MotionConfig } from 'motion-v'

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://karibsen.fr/#identity',
      'name': 'Karibsen',
      'url': 'https://karibsen.fr/',
      'logo': 'https://karibsen.fr/assets/image/logo.svg',
      'description': 'Studio indépendant de création de sites internet et d’applications web sur mesure.',
      'email': 'contact@karibsen.fr',
      'telephone': '+33749348748',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '33 avenue du Maréchal Foch',
        'postalCode': '77500',
        'addressLocality': 'Chelles',
        'addressRegion': 'Île-de-France',
        'addressCountry': 'FR'
      },
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'contactType': 'sales',
          'email': 'contact@karibsen.fr',
          'telephone': '+33749348748',
          'url': 'https://karibsen.fr/demarrer-un-projet',
          'availableLanguage': ['fr', 'en'],
          'areaServed': 'FR'
        },
        {
          '@type': 'ContactPoint',
          'contactType': 'customer service',
          'email': 'contact@karibsen.fr',
          'telephone': '+33749348748',
          'availableLanguage': ['fr', 'en'],
          'areaServed': 'FR'
        }
      ],
      'sameAs': [
        'https://www.linkedin.com/company/karibsen',
        'https://x.com/karibsenstudios'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://karibsen.fr/#website',
      'url': 'https://karibsen.fr/',
      'name': 'Karibsen',
      'inLanguage': 'fr',
      'description': 'Karibsen conçoit des sites internet et des applications web sur mesure, rapides et pensés pour durer.',
      'publisher': {
        '@id': 'https://karibsen.fr/#identity'
      }
    }
  ]
}

useHead({
  titleTemplate: '%s',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png?v=202605021', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=202605021' },
    { rel: 'shortcut icon', href: '/favicon.ico?v=202605021' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=202605021' },
    { rel: 'manifest', href: '/site.webmanifest?v=202605021' }
  ],
  script: [
    {
      key: 'schema-org',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schemaOrg)
    }
  ],
  htmlAttrs: {
    lang: 'fr'
  },
  bodyAttrs: {
    class: 'relative min-h-svh w-full'
  }
})

const route = useRoute()
const siteUrl = useSiteConfig().url

useHead(() => {
  const markdownPath = toMarkdownPath(route.path)

  return {
    link: markdownPath
      ? [{ rel: 'alternate', type: 'text/markdown', href: `${siteUrl.replace(/\/+$/, '')}${markdownPath}` }]
      : []
  }
})

const description = 'Karibsen conçoit des sites internet, des applications web et des expériences numériques sur mesure, rapides et pensées pour durer.'
const ogImage = 'https://karibsen.fr/assets/image/og-image.jpg'

useSeoMeta({
  description,
  ogSiteName: 'Karibsen',
  ogTitle: 'Karibsen',
  ogDescription: description,
  ogType: 'website',
  ogLocale: 'fr_FR',
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Karibsen, studio de création de sites et d’applications web',
  twitterCard: 'summary_large_image',
  twitterImage: ogImage,
  themeColor: '#ff5c0a',
  colorScheme: 'only light'
})
</script>

<template>
  <MotionConfig reduced-motion="user">
    <UApp>
      <a
        href="#contenu"
        class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-1001 focus:rounded-sm focus:bg-black focus:px-4 focus:py-2 focus:font-sans focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-theme-500"
      >
        Aller au contenu
      </a>

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
      <UMain
        id="contenu"
        tabindex="-1"
        class="outline-none"
      >
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </UMain>
      <AppFooter />
    </UApp>
  </MotionConfig>
</template>
