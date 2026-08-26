<script setup lang="ts">
import HeroSection from '~/components/section/HeroSection.vue'
import FeatureGrid from '~/components/ui/feature/featureGrid.vue'
import IntroductionSection from '~/components/section/IntroductionSection.vue'
import EponymeSection from '~/components/section/EponymeSection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import RelatedProjects from '~/components/section/RelatedProjects.vue'
import PricingSection from '~/components/section/PricingSection.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import OtherServicesSection from '~/components/section/OtherServicesSection.vue'
import CTASection from '~/components/section/CTASection.vue'

useSeoMeta({
  title: 'Création de site vitrine sur mesure | Karibsen',
  description: 'Création de sites vitrines sur mesure, rapides et pensés pour convertir vos visiteurs en clients.'
})

const process = [
  {
    title: 'L’appel découverte',
    description: 'Nous échangeons sur votre activité, vos clients, vos objectifs et ce que votre futur site doit réellement accomplir.\n\nCet appel permet de poser les bonnes bases : positionnement, messages clés, pages nécessaires et actions que vos futurs visiteurs devront pouvoir réaliser simplement.',
    image: '/assets/image/services/call.png',
    imageAlt: 'Premier appel en visioconférence avec Google Meet'
  },
  {
    title: 'La maquette',
    description: 'Nous concevons une direction visuelle fidèle à votre identité, puis nous l’ajustons avec vos retours.\n\nLa maquette définit la structure de vos pages, la hiérarchie des contenus, les appels à l’action et l’expérience mobile avant de passer au développement du site vitrine.',
    image: '/assets/image/services/maquette.png',
    imageAlt: 'Échanges avec un client autour de la première maquette de son site vitrine'
  },
  {
    title: 'La réalisation',
    description: 'Nous développons un site vitrine rapide, adapté à chaque écran et structuré pour Google.\n\nPerformance, SEO, contenus et formulaires sont intégrés avec soin pour une présence en ligne solide et agréable.',
    image: '/assets/image/services/code.png',
    imageAlt: 'Extrait de code TypeScript utilisé pour le développement d’un projet web'
  },
  {
    title: 'La mise en ligne',
    description: 'Nous testons chaque détail, mettons votre site vitrine en ligne et vous donnons les clés pour le faire vivre.\n\nVous partez avec une base prête à évoluer, les accès nécessaires et un accompagnement clair pour publier de nouveaux contenus ou poursuivre l’amélioration de votre référencement.',
    image: '/assets/image/services/online.png',
    imageAlt: 'Indicateur confirmant que le site vitrine est en ligne'
  }
]

const faq = [
  {
    question: 'Combien de temps dure la création de mon site vitrine ?',
    answer: 'Un site vitrine est conçu et mis en ligne en deux semaines maximum. Ce délai repose sur des échanges réactifs : nous cadrons rapidement le projet, validons la maquette avec vous, puis passons au développement et aux derniers tests.'
  },
  {
    question: 'Ai-je besoin de trouver un hébergement web ?',
    answer: 'Non. Nous gérons l’hébergement, la mise en ligne et les réglages techniques nécessaires au bon fonctionnement de votre site. Vous avez un interlocuteur unique pour votre présence web, sans avoir à gérer seul la partie serveur.'
  },
  {
    question: 'Combien de révisions sont incluses pour mon site vitrine ?',
    answer: 'Les retours sont illimités pendant la phase de conception, jusqu’à ce que la direction visuelle et les pages répondent à vos attentes. Nous avançons avec des échanges réguliers pour éviter les surprises à la fin du projet.'
  },
  {
    question: 'Pouvez-vous connecter mon site vitrine à des outils externes ?',
    answer: 'Oui. Formulaire relié à votre CRM, outil de prise de rendez-vous, newsletter, statistiques, carte, paiement ou solution métier : nous intégrons les outils utiles à votre activité, à condition qu’ils disposent d’une connexion compatible.'
  }
]

const features = [
  {
    icon: 'heroicons:sparkles',
    label: 'Une identité qui vous ressemble',
    description: 'Une direction artistique sur mesure, sans modèle préfabriqué, qui marque dès les premières secondes.'
  },
  {
    icon: 'heroicons:cursor-arrow-rays',
    label: 'Un parcours qui convertit',
    description: 'Des pages structurées et des appels à l’action clairs, qui guident vos visiteurs vers la prise de contact.'
  },
  {
    icon: 'heroicons:magnifying-glass',
    label: 'Des fondations saines',
    description: 'Performance, balises et maillage interne soignés pour installer durablement votre visibilité.'
  }
]

const pricing = [
  {
    title: 'Site vitrine essentiel',
    pricePrefix: 'À partir de',
    price: '700 € HT',
    description: 'Une présence en ligne claire et rapide à mettre en place, idéale pour lancer votre activité avec l’essentiel bien fait.',
    features: [
      'Site une page ou 3 pages',
      'Design responsive à partir d’une base sur mesure',
      'Contenus structurés avec vous',
      'Formulaire de contact',
      'Mise en ligne et nom de domaine'
    ],
    ctaLabel: 'Lancer mon site',
    ctaTo: { hash: '#echangeons' }
  },
  {
    title: 'Site vitrine sur mesure',
    pricePrefix: 'À partir de',
    price: '1 500 € HT',
    badge: 'Le plus demandé',
    highlight: true,
    description: 'Un site pensé autour de votre activité, de vos futurs clients et des actions qui comptent vraiment pour votre développement.',
    features: [
      'Direction artistique sur mesure',
      'Design responsive',
      'Pages et contenus structurés',
      'Fondations SEO techniques',
      'Formulaires de contact',
      'Hébergement et mise en ligne'
    ],
    ctaLabel: 'Parler de mon projet',
    ctaTo: { hash: '#echangeons' }
  }
]
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 lg:gap-16 lg:pb-32">
    <HeroSection
      title="Un site qui présente vraiment votre savoir-faire. Et qui transforme vos visiteurs en prospects."
      description="Votre site vitrine doit refléter votre savoir-faire dès les premières secondes et guider naturellement vers la prise de contact."
      :cta-to="{ hash: '#echangeons' }"
      cta-label="Parler de mon site vitrine"
    />

    <IntroductionSection
      title="Qu’est-ce qu’un site vitrine ?"
      text="Un site vitrine est un site internet conçu pour présenter une entreprise, une activité ou un savoir-faire. Il réunit les informations essentielles dont vos visiteurs ont besoin pour vous découvrir : qui vous êtes, ce que vous proposez, à qui vous vous adressez et comment vous contacter. Contrairement à une boutique en ligne ou à une application web, son objectif principal n’est pas de vendre directement un produit, mais de rendre votre offre visible, compréhensible et crédible."
    />

    <FeatureGrid :features="features" />

    <EponymeSection />

    <ProcessSection :steps="process" />

    <RelatedProjects
      tag="Site vitrine"
      title="Nos dernières réalisations de site vitrine."
    />

    <PricingSection
      title="Des offres claires et transparentes"
      :plans="pricing"
      note="Ces tarifs sont des points de départ : le prix évolue selon le nombre de pages, les fonctionnalités, les intégrations et le volume de contenu à produire. Le périmètre exact est fixé ensemble avant le devis."
    />

    <FAQSection
      title="Questions fréquentes sur la création de site vitrine"
      :items="faq"
      :show-cta="false"
    />

    <OtherServicesSection
      exclude="site-vitrine"
      description="Votre projet dépasse le site vitrine ? Nous concevons aussi des outils métier et reprenons les sites existants."
    />

    <CTASection cta-label="Démarrer un projet" />
  </div>
</template>
