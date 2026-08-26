<script setup lang="ts">
import HeroSection from '~/components/section/HeroSection.vue'
import FeatureGrid from '~/components/ui/feature/featureGrid.vue'
import IntroductionSection from '~/components/section/IntroductionSection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import PricingSection from '~/components/section/PricingSection.vue'
import RelatedProjects from '~/components/section/RelatedProjects.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import OtherServicesSection from '~/components/section/OtherServicesSection.vue'
import CTASection from '~/components/section/CTASection.vue'

useSeoMeta({
  title: 'Applications web sur mesure | Karibsen',
  description: 'Conception et développement d’applications web sur mesure, adaptées à vos équipes, vos clients et vos métiers.'
})

const process = [
  {
    title: 'Cadrage de votre application métier',
    description: 'Nous commençons par comprendre vos processus, vos utilisateurs et les problèmes concrets à résoudre.\n\nAteliers de cadrage, priorisation des fonctionnalités, rôles, données à gérer et objectifs de la première version nous permettent de définir une application web sur mesure utile dès son lancement, sans complexité inutile.',
    image: '/assets/image/services/call.png',
    imageAlt: 'Premier appel en visioconférence avec Google Meet'
  },
  {
    title: 'Parcours utilisateurs et maquettes UX',
    description: 'Nous transformons les besoins métier en parcours simples : tableau de bord, espace client, gestion des demandes, réservations ou administration.\n\nLes maquettes permettent de valider les écrans, les règles de navigation et les priorités fonctionnelles avant le développement, avec une vision partagée de l’outil final.',
    image: '/assets/image/services/maquette.png',
    imageAlt: 'Échanges autour des maquettes UX d’une application web'
  },
  {
    title: 'Développement web robuste et évolutif',
    description: 'Nous développons votre application par étapes courtes, avec des points de suivi réguliers.\n\nInterface, logique métier, gestion des droits, intégrations et données sont conçues pour être maintenables, sécurisées et capables d’accompagner de nouveaux usages sans devoir reconstruire l’outil à chaque évolution.',
    image: '/assets/image/services/code.png',
    imageAlt: 'Extrait de code TypeScript utilisé pour le développement d’une application web'
  },
  {
    title: 'Tests, déploiement et prise en main',
    description: 'Nous testons les scénarios essentiels, les accès utilisateurs et le comportement de l’application sur les différents écrans avant la mise en production.\n\nUne fois en ligne, nous accompagnons la prise en main de vos équipes et préparons les prochaines évolutions pour que votre application continue de servir votre activité durablement.',
    image: '/assets/image/services/online.png',
    imageAlt: 'Indicateur confirmant que l’application web est en ligne'
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

const features = [
  {
    icon: 'heroicons:puzzle-piece',
    label: 'Des fonctionnalités utiles',
    description: 'Le périmètre est cadré avec vous : ce qui sert vraiment, rien de superflu.'
  },
  {
    icon: 'heroicons:users',
    label: 'Compris par vos équipes',
    description: 'Des parcours pensés pour être adoptés sans formation de plusieurs jours.'
  },
  {
    icon: 'heroicons:squares-plus',
    label: 'Une architecture prête à évoluer',
    description: 'De nouveaux modules s’ajoutent sans avoir à tout réécrire.'
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

    <FeatureGrid :features="features" />

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
