<script setup lang="ts">
import PricingSection from '~/components/section/PricingSection.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import CTASection from '~/components/section/CTASection.vue'

useSeoMeta({
  title: 'Tarifs création de site et application web | Karibsen',
  description: 'Découvrez les tarifs de départ pour un site vitrine, une application web sur mesure ou une refonte de site web avec Karibsen.'
})

const plans = [
  {
    title: 'Site vitrine',
    pricePrefix: 'À partir de',
    price: '700 € HT',
    description: 'Une présence en ligne claire, rapide et adaptée à votre activité pour présenter votre savoir-faire et faciliter la prise de contact.',
    features: [
      'Design responsive',
      'Contenus structurés avec vous',
      'Formulaire de contact',
      'Fondations SEO techniques',
      'Mise en ligne'
    ],
    ctaLabel: 'Voir les sites vitrines',
    ctaTo: '/site-vitrine'
  },
  {
    title: 'Application web sur mesure',
    pricePrefix: 'À partir de',
    price: '2 500 € HT',
    highlight: true,
    description: 'Un outil métier conçu autour de vos utilisateurs, de vos processus et des fonctionnalités réellement utiles à votre activité.',
    features: [
      'Cadrage et priorisation',
      'Parcours et maquettes UX',
      'Développement sur mesure',
      'Gestion des rôles et des accès',
      'Tests et mise en production'
    ],
    ctaLabel: 'Voir les applications web',
    ctaTo: '/application-web-sur-mesure'
  },
  {
    title: 'Refonte de site web',
    pricePrefix: 'À partir de',
    price: '1 000 € HT',
    description: 'Une reprise complète de votre site pour moderniser son design, améliorer ses performances et préserver ses acquis SEO.',
    features: [
      'Audit du site existant',
      'Nouvelle direction visuelle',
      'Reprise des contenus clés',
      'Redirections et SEO préservés',
      'Migration et mise en ligne'
    ],
    ctaLabel: 'Voir les refontes',
    ctaTo: '/refonte-site-web'
  }
]

const faq = [
  {
    question: 'Pourquoi indiquez-vous des tarifs « à partir de » ?',
    answer: 'Chaque projet a un périmètre différent. Le nombre de pages, les fonctionnalités, les intégrations et le volume de contenu influencent le budget final. Le tarif exact est établi avant le démarrage, à partir d’un périmètre clair.'
  },
  {
    question: 'Que comprend le devis ?',
    answer: 'Le devis détaille les étapes, les livrables, les fonctionnalités, les contenus à prévoir et les conditions de mise en ligne. Vous savez ce qui est inclus avant que la conception ou le développement commence.'
  },
  {
    question: 'Pouvez-vous adapter le projet à mon budget ?',
    answer: 'Oui. Nous pouvons prioriser les pages ou les fonctionnalités indispensables pour construire une première version utile, puis prévoir les évolutions suivantes sans fragiliser la base du projet.'
  },
  {
    question: 'L’hébergement et la maintenance sont-ils inclus ?',
    answer: 'La mise en ligne est incluse dans nos offres. Les besoins récurrents comme l’hébergement, la maintenance ou les évolutions sont précisés séparément dans le devis selon votre projet.'
  }
]
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 pt-36 sm:pt-44 lg:gap-16 lg:pb-32">
    <PricingSection
      id="tarifs"
      heading="h1"
      title="Choisissez le point de départ adapté à votre projet."
      description="Site vitrine, application métier ou refonte : chaque offre peut être ajustée à vos besoins."
      :plans="plans"
      note="Ces montants sont des tarifs de départ hors taxes. Le prix final est confirmé dans un devis avant le lancement du projet."
    />

    <FAQSection
      title="Questions fréquentes sur nos tarifs"
      :items="faq"
      :show-cta="false"
    />

    <CTASection
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
      title="Besoin d’un budget plus précis ?"
      description="Présentez-nous votre besoin en quelques lignes. Nous vous répondrons avec une première estimation et les prochaines étapes utiles."
    />
  </div>
</template>
