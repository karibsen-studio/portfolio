<script setup lang="ts">
import type { ProcessStep } from '~/types/process'
import HeroSection from '~/components/section/HeroSection.vue'
import IntroductionSection from '~/components/section/IntroductionSection.vue'
import ChecklistSection from '~/components/section/ChecklistSection.vue'
import UseCasesSection from '~/components/section/UseCasesSection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import PricingSection from '~/components/section/PricingSection.vue'
import RelatedProjects from '~/components/section/RelatedProjects.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import OtherServicesSection from '~/components/section/OtherServicesSection.vue'
import CTASection from '~/components/section/CTASection.vue'

const title = 'Karibsen: Création d\'applications web sur mesure'
const description = 'Conception et développement d’applications web sur mesure, adaptées à vos équipes, vos clients et vos métiers.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const process: ProcessStep[] = [
  {
    title: 'Cadrage de votre application métier',
    description: 'Nous commençons par comprendre vos processus, vos utilisateurs et les problèmes concrets à résoudre.\n\nAteliers de cadrage, priorisation des fonctionnalités, rôles, données à gérer et objectifs de la première version nous permettent de définir une application web sur mesure utile dès son lancement, sans complexité inutile.',
    animation: 'call'
  },
  {
    title: 'Parcours utilisateurs et maquettes UX',
    description: 'Nous transformons les besoins métier en parcours simples : tableau de bord, espace client, gestion des demandes, réservations ou administration.\n\nLes maquettes permettent de valider les écrans, les règles de navigation et les priorités fonctionnelles avant le développement, avec une vision partagée de l’outil final.',
    animation: 'skeleton'
  },
  {
    title: 'Développement web robuste et évolutif',
    description: 'Nous développons votre application par étapes courtes, avec des points de suivi réguliers.\n\nInterface, logique métier, gestion des droits, intégrations et données sont conçues pour être maintenables, sécurisées et capables d’accompagner de nouveaux usages sans devoir reconstruire l’outil à chaque évolution.',
    animation: 'website'
  },
  {
    title: 'Tests, déploiement et prise en main',
    description: 'Nous testons les scénarios essentiels, les accès utilisateurs et le comportement de l’application sur les différents écrans avant la mise en production.\n\nUne fois en ligne, nous accompagnons la prise en main de vos équipes et préparons les prochaines évolutions pour que votre application continue de servir votre activité durablement.',
    animation: 'online'
  }
]

const faq = [
  {
    question: 'Combien de temps faut-il pour développer une application web sur mesure ?',
    answer: 'Le délai dépend du périmètre fonctionnel. Une première version utile peut être livrée en quelques semaines, tandis qu’une plateforme avec plusieurs rôles, intégrations et workflows métier demande davantage de temps. Le cadrage initial permet de vous donner une estimation réaliste.'
  },
  {
    question: 'Pouvez-vous connecter mon application à des outils externes ?',
    answer: 'Oui. Nous pouvons connecter votre application web à un CRM, une solution de paiement, un logiciel de facturation, une API métier, un outil de réservation ou vos systèmes internes lorsque les connexions techniques sont disponibles.'
  },
  {
    question: 'Mon application web fonctionnera-t-elle sur mobile ?',
    answer: 'Oui. Les parcours sont conçus pour rester utilisables sur ordinateur, tablette et mobile. Selon les besoins de vos équipes ou de vos clients, nous adaptons l’interface pour que les actions essentielles restent simples à réaliser, même en déplacement.'
  },
  {
    question: 'Pourrai-je faire évoluer mon application après sa mise en ligne ?',
    answer: 'Oui. Nous construisons l’application par étapes et préparons les futures évolutions dès le départ. Une fois votre première version en production, nous pouvons prioriser les nouvelles fonctionnalités à partir des retours réels de vos utilisateurs.'
  }
]
const pricing = [
  {
    title: 'Application web sur mesure',
    pricePrefix: 'À partir de',
    price: '2 500 € HT',
    description: 'Une première version utile, cadrée avec vous et mise en production rapidement, sur une base prête à accueillir les évolutions suivantes.',
    features: [
      'Ateliers de cadrage et priorisation',
      'Parcours et maquettes validés avant développement',
      'Développement sur mesure, sans template',
      'Gestion des rôles et des accès',
      'Tests, déploiement et prise en main'
    ],
    ctaLabel: 'Parler de mon projet',
    ctaTo: { hash: '#echangeons' }
  }
]

const signs = [
  'Vos équipes passent encore par plusieurs fichiers Excel pour suivre la même activité.',
  'Vous recopiez les mêmes informations d’un outil à l’autre, avec le risque d’erreur que cela suppose.',
  'Votre logiciel actuel ne correspond plus à vos processus et vos équipes le contournent.',
  'Vos clients ont besoin d’un espace dédié pour suivre leurs demandes, documents ou commandes.',
  'Vous souhaitez centraliser vos données au même endroit, plutôt que dans cinq outils différents.',
  'Vous avez besoin de réservation, de workflows, de droits par profil ou d’automatisations spécifiques.'
]

const useCases = [
  {
    icon: 'heroicons:identification',
    label: 'CRM métier',
    description: 'Suivez prospects, clients et affaires avec les étapes et les champs de votre activité, pas ceux d’un CRM générique.'
  },
  {
    icon: 'heroicons:user-circle',
    label: 'Espace client',
    description: 'Un accès sécurisé où vos clients retrouvent leurs documents, devis, factures et demandes en cours.'
  },
  {
    icon: 'heroicons:calendar-days',
    label: 'Système de réservation',
    description: 'Créneaux, disponibilités, paiement et rappels automatiques, calés sur vos règles de planning.'
  },
  {
    icon: 'heroicons:chart-bar',
    label: 'Tableau de bord',
    description: 'Vos indicateurs clés réunis sur un écran lisible, alimenté par vos données réelles plutôt que par un export.'
  },
  {
    icon: 'heroicons:cloud',
    label: 'Plateforme SaaS',
    description: 'Un produit accessible par abonnement, avec comptes, rôles, facturation récurrente et suivi des usages.'
  },
  {
    icon: 'heroicons:squares-2x2',
    label: 'Back-office',
    description: 'Une administration pour gérer contenus, commandes, stocks ou utilisateurs sans dépendre de nous.'
  },
  {
    icon: 'heroicons:bolt',
    label: 'Automatisation',
    description: 'Fin des ressaisies : synchronisation entre vos outils, relances et documents générés automatiquement.'
  },
  {
    icon: 'heroicons:building-office-2',
    label: 'Portail interne',
    description: 'Procédures, demandes et données d’équipe centralisées dans un espace unique, avec droits par profil.'
  }
]
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 lg:gap-16 lg:pb-32">
    <HeroSection
      title="Votre métier est unique. Votre application doit l’être aussi."
      description="Quand les solutions standard vous limitent, une application sur mesure peut simplifier vos opérations et révéler de nouvelles possibilités."
      :cta-to="{ hash: '#processus' }"
      cta-label="Explorer les étapes"
    />

    <IntroductionSection
      title="Qu’est-ce qu’une application web sur mesure ?"
      text="Une application web sur mesure est un outil accessible depuis un simple navigateur, conçu spécifiquement pour votre organisation. Espace client, tableau de bord, gestion des demandes, réservations, suivi d’activité ou administration interne : elle reprend vos processus réels plutôt que de vous forcer à entrer dans le moule d’un logiciel générique. Contrairement à un site vitrine, qui présente votre activité, une application web sert à la faire fonctionner au quotidien. Vos équipes et vos clients y réalisent des actions, y saisissent et y consultent des données."
    />

    <ChecklistSection
      title="Vous avez probablement besoin d’une application sur mesure si…"
      description="La plupart de nos projets démarrent sur les mêmes symptômes. Si vous en reconnaissez deux ou trois, un outil sur mesure est sans doute rentable."
      :items="signs"
      note="Si aucun de ces points ne vous parle, nous vous le dirons : un outil du marché suffit parfois, et c’est très bien ainsi."
    />

    <UseCasesSection
      title="Exemples d’applications que nous pouvons développer"
      description="Chaque projet est différent, mais la plupart des applications web sur mesure que nous concevons entrent dans l’une de ces familles."
      :items="useCases"
    />

    <ProcessSection
      :steps="process"
      title="Du cadrage métier au déploiement de votre application web sur mesure."
    />

    <RelatedProjects
      tag="Application web"
      title="Des applications web déjà en production."
    />

    <PricingSection
      title="Un budget cadré dès le départ"
      description="Le prix dépend du périmètre fonctionnel : nous le fixons ensemble au cadrage, avant la moindre ligne de code."
      :plans="pricing"
      note="Ces tarifs sont des points de départ : le prix évolue selon le nombre de pages, les fonctionnalités, les intégrations et le volume de contenu à produire. Le périmètre exact est fixé ensemble avant le devis."
    />

    <FAQSection
      title="Questions fréquentes sur les applications web sur mesure"
      :items="faq"
      :show-cta="false"
    />

    <OtherServicesSection
      exclude="application-web-sur-mesure"
      description="Votre besoin n’est pas (encore) une application ? Nous créons aussi des sites vitrines et reprenons les sites existants."
    />

    <CTASection cta-label="Démarrer un projet" />
  </div>
</template>
