export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    'motion-v/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@karibsen/eponyme',
    '@nuxtjs/seo'
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

  routeRules: {
    '/start-a-project': { redirect: { to: '/demarrer-un-projet', statusCode: 301 } },
    '/devis': { redirect: { to: '/demarrer-un-projet', statusCode: 301 } },
    '/legal-notice': { redirect: { to: '/mentions-legales', statusCode: 301 } },
    '/mention-legales': { redirect: { to: '/mentions-legales', statusCode: 301 } },
    '/work': { redirect: { to: '/realisations', statusCode: 301 } },
    '/as-chelles': { redirect: { to: '/realisations/as-chelles-athletisme', statusCode: 301 } },
    '/mxflash': { redirect: { to: '/realisations/mxflash', statusCode: 301 } },
    '/krak-lite': { redirect: { to: '/realisations', statusCode: 301 } },
    '/lettermaker': { redirect: { to: '/realisations', statusCode: 301 } },
    '/tablekit': { redirect: { to: '/realisations', statusCode: 301 } },
    '/agence-web-chelles': { redirect: { to: '/agence-web-seine-et-marne', statusCode: 301 } },

    '/articles': { redirect: { to: '/blog', statusCode: 301 } },
    '/articles/**': { redirect: { to: '/blog/**', statusCode: 301 } },
  },

  compatibilityDate: '2026-06-30',

  eponyme: {
    prismaClient: '~~/server/utils/prisma',
    dashboardPath: '/__eponyme',
    previewPaths: {
      homepage: '/',
      recrutement: '/recrutement',
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
      { name: 'Inter', src: '/assets/fonts/inter/font.woff2', weights: ['100 900'] }
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
      '/seo/sitemap'
    ]
  }
})
