<script setup lang="ts">
import HeroSection from '~/components/section/HeroSection.vue'
import FeatureGrid from '~/components/ui/feature/featureGrid.vue'
import EponymeSection from '~/components/section/EponymeSection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import RelatedProjects from '~/components/section/RelatedProjects.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import OtherServicesSection from '~/components/section/OtherServicesSection.vue'
import CTASection from '~/components/section/CTASection.vue'

useSeoMeta({
  title: 'Agence Nuxt : développement d’applications et sites Nuxt | Karibsen',
  description: 'Agence spécialisée Nuxt et Vue : sites vitrines, applications web et migrations Nuxt 4, avec un vrai souci des performances et du référencement.'
})

const process = [
  {
    title: 'Le cadrage technique',
    description: 'Nous listons vos besoins réels : rendu, SEO, données et intégrations. Nous choisissons ensuite le mode de rendu adapté plutôt qu’un réglage par défaut.',
    image: '/assets/image/services/call.png',
    imageAlt: 'Premier appel en visioconférence avec Google Meet'
  },
  {
    title: 'L’architecture',
    description: 'Composants, composables, routes serveur et couche de données sont posés dès le départ, pour que le projet reste lisible quand il grandit.',
    image: '/assets/image/services/maquette.png',
    imageAlt: 'Échanges autour de l’architecture et de la maquette d’un projet Nuxt'
  },
  {
    title: 'Le développement',
    description: 'Nous construisons en TypeScript strict, avec des composants accessibles et un rendu serveur qui sert le contenu du premier coup.',
    image: '/assets/image/services/code.png',
    imageAlt: 'Extrait de code TypeScript utilisé pour le développement d’une application Nuxt'
  },
  {
    title: 'La mise en production',
    description: 'Déploiement, cache, images, polices, métriques Web Vitals : nous mesurons avant et après la mise en ligne.',
    image: '/assets/image/services/online.png',
    imageAlt: 'Indicateur confirmant que l’application Nuxt est en ligne'
  }
]

const faq = [
  {
    question: 'Pourquoi choisir Nuxt pour un site ou une application web ?',
    answer: 'Nuxt permet de construire des interfaces rapides avec Vue tout en prenant en charge le rendu serveur, le routage, les API et l’optimisation des contenus. Cette base convient aussi bien à un site visible sur Google qu’à une application web plus complète.'
  },
  {
    question: 'Nuxt est-il adapté au référencement naturel ?',
    answer: 'Oui. Le rendu serveur permet de fournir directement le contenu des pages aux moteurs de recherche. Nous travaillons également la structure HTML, les métadonnées, les performances, les images et le maillage interne pour donner au site des fondations SEO solides.'
  },
  {
    question: 'Pouvez-vous reprendre un projet Vue ou Nuxt existant ?',
    answer: 'Oui. Nous commençons par auditer l’architecture, les dépendances, les performances et les points de fragilité du projet. Nous pouvons ensuite corriger l’existant, le faire évoluer ou préparer une migration progressive sans reconstruire inutilement ce qui fonctionne déjà.'
  },
  {
    question: 'Prenez-vous en charge le déploiement et la maintenance ?',
    answer: 'Oui. Nous préparons la mise en production, le cache, les variables d’environnement, les images et le suivi des performances. Après le lancement, nous pouvons également assurer la maintenance et accompagner les évolutions du projet.'
  }
]

const features = [
  {
    icon: 'heroicons:server-stack',
    label: 'Un rendu côté serveur',
    description: 'Vos contenus servis directement aux moteurs de recherche, sans attendre le JavaScript.'
  },
  {
    icon: 'heroicons:code-bracket-square',
    label: 'Une base typée de bout en bout',
    description: 'Du serveur à l’interface, les erreurs se voient à l’écriture plutôt qu’en production.'
  },
  {
    icon: 'heroicons:users',
    label: 'Repris sans mode d’emploi',
    description: 'Du Nuxt standard, que n’importe quelle équipe Vue peut reprendre après nous.'
  }
]
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 lg:gap-16 lg:pb-32">
    <HeroSection
      title="Des pages instantanées. Une base solide pour longtemps."
      description="Nous concevons et développons des sites et des applications Nuxt, du site vitrine rendu côté serveur jusqu’à l’application métier complète."
      :cta-to="{ hash: '#processus' }"
      cta-label="Voir notre méthode"
    />

    <FeatureGrid :features="features" />

    <EponymeSection
      title="Eponyme, notre CMS développé sous Nuxt."
      :paragraphs="[
        'Plutôt que de brancher un CMS généraliste sur une base Nuxt, nous avons développé le nôtre. Eponyme est conçu pour Nuxt : le contenu est récupéré au rendu serveur, sans couche d’API superflue ni plugin qui alourdit chaque page.',
        'L’espace d’administration est construit autour des contenus réellement présents sur votre site. Vous modifiez vos textes, vos images et vos collections depuis une interface claire, sans pouvoir casser le design ni les performances du projet.'
      ]"
      image-alt="Tableau de bord du CMS Eponyme, développé sous Nuxt"
    />

    <ProcessSection :steps="process" />

    <RelatedProjects
      title="Des projets construits avec Nuxt."
    />

    <FAQSection
      title="Questions fréquentes sur Nuxt"
      :items="faq"
      :show-cta="false"
    />

    <OtherServicesSection />

    <CTASection cta-label="Démarrer un projet" />
  </div>
</template>
