<script setup lang="ts">
import type { ProcessStep } from '~/types/process'
import HeroLocaleSection from '~/components/section/HeroLocaleSection.vue'
import ServicesSection from '~/components/section/ServicesSection.vue'
import WhyKaribsenSection from '~/components/section/WhyKaribsenSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import ComparisonSection from '~/components/section/ComparisonSection.vue'
import FeatureGrid from '~/components/ui/feature/FeatureGrid.vue'
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import PricingSection from '~/components/section/PricingSection.vue'
import FocusSection from '~/components/section/FocusSection.vue'
import PromoPopup from '~/components/ui/PromoPopup.vue'

const title = 'Karibsen: Agence de création de site web à Bordeaux (33)'
const description = 'Agence web intervenant à Bordeaux : sites vitrines, refontes et applications sur mesure, avec un interlocuteur unique du premier appel à la mise en ligne.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const process: ProcessStep[] = [
  {
    title: 'Cadrer le projet sans multiplier les réunions',
    description: 'Nous réunissons dès le départ les personnes qui décideront du contenu, du budget et du calendrier. Le rendez-vous peut avoir lieu en visioconférence ou lors de nos déplacements à Bordeaux.\n\nCet échange sert à fixer un objectif principal, les publics à convaincre et les contraintes à prendre en compte. Vous repartez avec un périmètre lisible, pas avec une succession d’ateliers sans décision.',
    animation: 'call'
  },
  {
    title: 'Faire ressortir votre offre dans un marché chargé',
    description: 'À Bordeaux et en Gironde, vos prospects comparent vite et ouvrent souvent plusieurs sites à la suite. Nous travaillons donc l’ordre des pages, les preuves et les appels à l’action avant de dessiner l’interface.\n\nLa maquette montre concrètement ce qu’un visiteur comprend en arrivant, où il trouve l’information utile et comment il vous contacte.',
    animation: 'skeleton'
  },
  {
    title: 'Développer avec des validations courtes',
    description: 'Nous avançons écran par écran, avec un point clair à chaque étape plutôt qu’une longue période sans nouvelle. Les retours sont regroupés, puis nous ajustons les contenus, les parcours et les détails qui comptent pour vos clients à Bordeaux et en Gironde.\n\nVous gardez le même interlocuteur du prototype au site final. Cela permet de valider une priorité sur place quand c’est utile, puis de poursuivre efficacement à distance entre deux rendez-vous.',
    animation: 'website'
  },
  {
    title: 'Préparer la bascule sans perdre vos acquis',
    description: 'Avant l’ouverture, nous testons les demandes de contact, les liens vers vos outils et les informations que vos clients cherchent avant de venir vous voir. Nous vérifions aussi le site sur mobile, là où beaucoup de recherches locales commencent.\n\nPour une refonte, nous conservons les pages qui attirent déjà des visiteurs et redirigeons les anciennes adresses vers les nouvelles. Vous recevez ensuite vos accès et un accompagnement sur les mises à jour courantes.',
    animation: 'online'
  }
]

const comparisonColumns = [
  {
    label: 'Agence classique',
    note: 'Structure à plusieurs étages',
    icon: 'heroicons:building-office-2'
  },
  {
    label: 'Karibsen',
    note: 'Studio indépendant à Bordeaux',
    image: '/assets/image/logo.svg',
    imageAlt: ''
  }
]

const comparisonRows = [
  {
    label: 'Premier contact',
    values: ['Des commerciaux', 'Vous parlez au développeur']
  },
  {
    label: 'Suivi du projet',
    values: ['Un chef de projet intermédiaire', 'Un interlocuteur direct']
  },
  {
    label: 'Organisation',
    values: ['Une structure lourde', 'Un studio indépendant']
  },
  {
    label: 'Budget',
    values: ['Un coût plus élevé', 'À partir de 300 €']
  },
  {
    label: 'Rythme de décision',
    values: ['De nombreux rendez-vous', 'Des validations courtes']
  }
]

const audiencesId = useId()

const audiences = [
  {
    icon: 'heroicons:wrench-screwdriver',
    label: 'Artisans',
    description: 'Rendre vos prestations, vos réalisations et votre zone d’intervention faciles à comprendre et à contacter.'
  },
  {
    icon: 'heroicons:building-storefront',
    label: 'Restaurants & commerces',
    description: 'Donner envie de venir, afficher les informations utiles et simplifier les réservations ou prises de contact.'
  },
  {
    icon: 'heroicons:user-group',
    label: 'Associations',
    description: 'Présenter vos actions, fédérer votre communauté et permettre à chacun de trouver l’information rapidement.'
  },
  {
    icon: 'heroicons:briefcase',
    label: 'Professions libérales',
    description: 'Installer une présence claire et rassurante, avec un parcours simple vers le premier rendez-vous.'
  },
  {
    icon: 'heroicons:building-office-2',
    label: 'TPE & PME',
    description: 'Faire de votre site un support commercial fiable, aligné sur vos offres et vos objectifs de développement.'
  },
  {
    icon: 'heroicons:user-circle',
    label: 'Indépendants',
    description: 'Présenter votre expertise avec un site professionnel qui transforme vos visites en prises de contact qualifiées.'
  }
]

const pricing = [
  {
    title: 'Site vitrine',
    pricePrefix: 'À partir de',
    price: '700 € HT',
    description: 'Présenter votre activité bordelaise, inspirer confiance et faciliter la prise de contact.',
    features: [
      'Design responsive sur mesure',
      'Contenus structurés avec vous',
      'Formulaire de contact',
      'Fondations SEO techniques',
      'Mise en ligne'
    ],
    ctaLabel: 'Voir les sites vitrines',
    ctaTo: '/site-vitrine'
  },
  {
    title: 'Refonte de site web',
    pricePrefix: 'À partir de',
    price: '1 000 € HT',
    description: 'Moderniser un site vieillissant sans perdre le référencement déjà acquis.',
    features: [
      'Audit du site existant',
      'Nouvelle direction visuelle',
      'Reprise des contenus clés',
      'Redirections et SEO préservés',
      'Migration et mise en ligne'
    ],
    ctaLabel: 'Voir les refontes',
    ctaTo: '/refonte-site-web'
  },
  {
    title: 'Application web sur mesure',
    pricePrefix: 'À partir de',
    price: '2 500 € HT',
    description: 'Outiller votre activité : espace client, réservation, back-office ou outil métier.',
    features: [
      'Cadrage et priorisation',
      'Parcours et maquettes UX',
      'Développement sur mesure',
      'Gestion des rôles et des accès',
      'Tests et mise en production'
    ],
    ctaLabel: 'Voir les applications web',
    ctaTo: '/application-web-sur-mesure'
  }
]

const meeting = [
  {
    icon: 'heroicons:map-pin',
    title: 'À Bordeaux, près de Mériadeck',
    description: 'Nous sommes installés dans le quartier de Mériadeck, à deux pas du centre. Un café ou une salle de réunion suffisent pour cadrer un projet.',
    points: [
      'Rendez-vous en centre-ville, accessible en tram',
      'Idéal pour le premier échange et la présentation des maquettes'
    ]
  },
  {
    icon: 'heroicons:truck',
    title: 'Partout en Gironde',
    description: 'Nous nous déplaçons dans la métropole et le reste du département lorsque le projet le justifie, sans facturer le trajet.',
    points: [
      'Mérignac, Pessac, Talence, Bègles, Libourne, Arcachon…',
      'Visite sur place quand votre lieu fait partie du sujet'
    ]
  },
  {
    icon: 'heroicons:video-camera',
    title: 'Ou en visioconférence',
    description: 'Si votre agenda est chargé, tout peut se faire à distance. La plupart de nos clients alternent un rendez-vous physique et des points en visio.',
    points: [
      'Créneaux courts, préparés à l’avance',
      'Compte rendu écrit après chaque échange'
    ]
  }
]
</script>

<template>
  <div class="pb-24 sm:pb-32">
    <HeroLocaleSection
      title="Une agence web pour vos projets à Bordeaux, sans les frais d’une grosse structure."
      description="Karibsen accompagne les entreprises, indépendants et équipes bordelaises avec des sites et des applications web sur mesure, pensés pour durer."
      image="/assets/image/locale/bordeaux.jpg"
      image-alt="Karibsen, agence web intervenant à Bordeaux et en Gironde"
    />

    <ServicesSection
      class="mt-24 md:mt-32"
      title="Le bon format pour faire progresser votre présence en ligne."
      description="Site vitrine, refonte ou application sur mesure : nous choisissons avec vous le format qui sert vraiment votre activité à Bordeaux, plutôt que celui qui remplit un devis."
    />

    <WhyKaribsenSection
      title="Pourquoi choisir Karibsen pour votre projet web à Bordeaux ?"
      image="/assets/image/corentin.jpg"
      image-alt="Corentin, fondateur de Karibsen, agence web"
      image-position="right"
      :paragraphs="[
        'Travailler avec Karibsen, c’est éviter la structure à plusieurs étages : vous parlez à la personne qui conçoit et développe votre site, du premier échange jusqu’à la mise en ligne.',
        'Chaque projet est construit sur mesure. Nous ne recolorons pas un modèle : l’arborescence, les contenus et l’interface sont pensés autour de votre offre pour vous distinguer d’un marché bordelais dynamique.',
        'Votre visibilité est travaillée dès le cadrage. La structure des pages, les textes et les fondations techniques tiennent compte des recherches réelles de vos futurs clients à Bordeaux et en Gironde.',
        'Installés tout près de Mériadeck, nous sommes proches de vous. Nous nous déplaçons facilement dans toute la métropole bordelaise pour les moments qui comptent, comme le cadrage ou la présentation du projet, tout en assurant un suivi quotidien fluide et réactif.'
      ]"
    />

    <ComparisonSection
      class="mt-24 md:mt-32"
      title="Ce qui change par rapport à une agence bordelaise classique."
      description="Le même projet, mais sans les intermédiaires : voici comment se déroule concrètement une collaboration avec Karibsen à Bordeaux."
      feature-label="Sur votre projet"
      caption="Comparatif entre une agence web classique et Karibsen à Bordeaux"
      switch-label="Choisir l’approche à afficher"
      :columns="comparisonColumns"
      :rows="comparisonRows"
      :action="{ label: 'Démarrer un projet', to: '/demarrer-un-projet' }"
    />

    <div
      :aria-labelledby="audiencesId"
      class="mt-24 flex flex-col gap-10 md:mt-32"
    >
      <BaseSection>
        <SectionTitle :id="audiencesId">
          <template #title>
            Pour qui travaillons-nous à Bordeaux ?
          </template>
          <template #description>
            <p class="max-w-2xl leading-relaxed text-foreground-300 md:text-center md:text-lg">
              Nous travaillons avec des structures à taille humaine, où la personne qui décide est aussi celle qui nous parle.
            </p>
          </template>
        </SectionTitle>
      </BaseSection>

      <FeatureGrid :features="audiences" />
    </div>

    <div class="mt-24 md:mt-32">
      <ProcessSection
        :steps="process"
        title="De notre premier échange jusqu’à la mise en ligne."
      />
    </div>

    <div class="mt-24 md:mt-32">
      <PricingSection
        title="Combien coûte un site web à Bordeaux ?"
        description="Les tarifs pratiqués à Bordeaux vont de quelques centaines d’euros pour un modèle réutilisé à plusieurs milliers pour une agence structurée. Voici nos points de départ, sans intermédiaire à financer."
        :plans="pricing"
        note="Ces montants sont des tarifs de départ hors taxes. Le prix dépend du nombre de pages, des fonctionnalités et du volume de contenu à produire : il est fixé dans un devis avant le lancement, après un premier échange gratuit."
      />
    </div>

    <div class="mt-24 md:mt-32">
      <FocusSection
        title="Nous pouvons nous rencontrer à Bordeaux."
        description="Un projet web se cadre mieux en se voyant au moins une fois. Vous choisissez le format qui vous arrange."
        :items="meeting"
      />
    </div>

    <CTASection
      title="Parlons de ce que votre site peut faire de mieux pour vous."
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
    />

    <PromoPopup
      city="Bordeaux"
      where="à Bordeaux"
    />
  </div>
</template>
