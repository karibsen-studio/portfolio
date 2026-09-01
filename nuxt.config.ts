import { fileURLToPath } from 'node:url'

import { fr } from '@eponyme/locale/fr'

const isProd = process.env.NODE_ENV === 'production'

const realisationsTag = {
  'Vercel-Cache-Tag': 'eponyme:realisations',
  'Cache-Tag': 'eponyme:realisations'
}

const goRedirects = {
  '/go/linkedin': { redirect: { to: 'https://www.linkedin.com/company/104961685', statusCode: 302 } },
  '/go/instagram': { redirect: { to: 'https://www.instagram.com/karibsen.studio/', statusCode: 302 } },
  '/go/x': { redirect: { to: 'https://x.com/karibsenstudios', statusCode: 302 } },
  '/go/whatsapp': { redirect: { to: 'https://wa.me/33749348748', statusCode: 302 } }
} as const

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    'motion-v/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@karibsen/eponyme',
    '@nuxtjs/seo',
    '@vercel/speed-insights'
  ],
  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://karibsen.fr',
    name: 'Karibsen',
    defaultLocale: 'fr',
    description: 'Karibsen conçoit des sites internet et des applications web sur mesure, rapides et pensés pour durer.'
  },

  ui: {
    colorMode: false
  },

  routeRules: isProd
    ? {
        ...goRedirects,

        '/': { isr: 3600 },
        '/recrutement': { isr: 86400 },
        '/recrutement/**': { isr: 86400 },
        '/realisations': { isr: 86400 },
        '/realisations/**': { isr: 86400 },

        '/blog': { isr: 86400 },
        '/blog/**': { isr: 86400 },

        '/plan-du-site': {
          isr: 86400,
          headers: {
            'Vercel-Cache-Tag': 'eponyme:plan-du-site',
            'Cache-Tag': 'eponyme:plan-du-site'
          }
        },

        '/agence-web-bordeaux': { prerender: true },
        '/agence-web-guadeloupe': { prerender: true },
        '/agence-web-paris': { prerender: true },
        '/creation-site-web-chelles': { prerender: true },
        '/a-propos': { prerender: true },
        '/tarifs': { prerender: true },
        '/demarrer-un-projet': { prerender: true },
        '/mentions-legales': { prerender: true },

        '/agence-web-seine-et-marne': { isr: 86400, headers: realisationsTag },
        '/agence-nuxt': { isr: 86400, headers: realisationsTag },
        '/application-web-sur-mesure': { isr: 86400, headers: realisationsTag },
        '/refonte-site-web': { isr: 86400, headers: realisationsTag },
        '/site-vitrine': { isr: 86400, headers: realisationsTag },

        '/start-a-project': { redirect: { to: '/demarrer-un-projet', statusCode: 301 } },
        '/devis': { redirect: { to: '/demarrer-un-projet', statusCode: 301 } },
        '/legal-notice': { redirect: { to: '/mentions-legales', statusCode: 301 } },
        '/mention-legales': { redirect: { to: '/mentions-legales', statusCode: 301 } },
        '/work': { redirect: { to: '/realisations', statusCode: 301 } },
        '/as-chelles': { redirect: { to: '/realisations/as-chelles-athletisme', statusCode: 301 } },
        '/mxflash': { redirect: { to: '/realisations/mxflash', statusCode: 301 } },
        '/krak-lite': { redirect: { to: '/realisations', statusCode: 301 } },
        '/2480-sowo': { redirect: { to: '/realisations', statusCode: 301 } },
        '/lettermaker': { redirect: { to: '/realisations', statusCode: 301 } },
        '/tablekit': { redirect: { to: '/realisations', statusCode: 301 } },
        '/agence-web-chelles': { redirect: { to: '/agence-web-seine-et-marne', statusCode: 301 } },

        '/articles': { redirect: { to: '/blog', statusCode: 301 } },
        '/articles/**': { redirect: { to: '/blog/**', statusCode: 301 } }
      }
    : { ...goRedirects },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'vercel'
  },

  vite: {
    optimizeDeps: {
      include: [
        '@lisse/vue'
      ]
    }
  },

  hooks: {
    /**
     * Runs our 404 handler before Nuxt's, without replacing it: `nitro.errorHandler`
     * is a chain, and a handler that returns without answering hands the request to
     * the next one — so browsers still get `error.vue`.
     */
    'nitro:init'(nitro) {
      const existing = nitro.options.errorHandler
      nitro.options.errorHandler = [
        fileURLToPath(new URL('server/error', import.meta.url)),
        ...(Array.isArray(existing) ? existing : existing ? [existing] : [])
      ]
    }
  },

  eponyme: {
    prismaClient: '~~/server/utils/prisma',
    dashboardPath: '/__eponyme',
    locale: fr(),
    rateLimits: {
      formGlobal: 1000
    },
    previewPaths: {
      homepage: '/',
      recrutement: '/recrutement',
      jobs: '/recrutement/:slug',
      realisations: '/realisations/:slug',
      articles: '/blog/:slug'
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    defaults: {
      weights: ['400 900'],
      formats: ['woff', 'woff2']
    },
    families: [
      { name: 'Stratford Serial', src: '/assets/fonts/startford/font.woff2', weight: 'medium' },
      { name: 'Inter', src: '/assets/fonts/inter/font.woff2', weight: '100 900' }
    ]
  },

  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'simple-icons:linkedin',
        'simple-icons:x'
      ]
    }
  },

  image: { format: ['webp'], quality: 78 },

  ogImage: {
    enabled: false
  },

  schemaOrg: {
    enabled: false
  },

  sitemap: {
    sources: ['/seo/sitemap'],
    exclude: [
      '/__eponyme',
      '/__eponyme/**',
      '/seo/sitemap',
      '/r/**',
      '/go/**'
    ]
  }
})
