<script setup lang="ts">
import CheckList from '~/components/ui/list/CheckList.vue'
import BaseSection from '~/components/section/BaseSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import FeatureGrid from '~/components/ui/feature/FeatureGrid.vue'
import IntroductionSection from '~/components/section/IntroductionSection.vue'
import PricingSection from '~/components/section/PricingSection.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import Heading from '~/components/ui/Heading.vue'
import PressButton from '~/components/ui/PressButton.vue'
import Tag from '~/components/ui/tags/Tag.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

const title = 'Karibsen: Création de site web à Chelles (77)'
const description = 'Création de site web à Chelles pour les entreprises qui veulent trouver plus de clients : site vitrine, refonte et accompagnement local par Karibsen.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const caseHighlights = [
  'Nouvelle architecture SEO',
  'Administration plus simple avec Eponyme',
  'Performances et expérience mobile retravaillées'
]

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
    title: 'Site vitrine essentiel',
    pricePrefix: 'À partir de',
    price: '700 € HT',
    description: 'Pour poser une présence en ligne nette et crédible, sans multiplier les pages ou les options inutiles.',
    features: [
      'Site une page ou jusqu’à 3 pages',
      'Design responsive',
      'Contenus structurés avec vous',
      'Formulaire de contact',
      'Mise en ligne'
    ],
    ctaLabel: 'Obtenir une estimation',
    ctaTo: '/demarrer-un-projet'
  },
  {
    title: 'Site vitrine sur mesure',
    pricePrefix: 'À partir de',
    price: '1 500 € HT',
    badge: 'Le plus demandé',
    highlight: true,
    description: 'Pour construire un site qui reflète votre savoir-faire, répond aux questions de vos clients et soutient votre visibilité locale.',
    features: [
      'Direction artistique sur mesure',
      'Pages et contenus structurés',
      'Fondations SEO techniques',
      'Formulaires et outils utiles',
      'Hébergement et mise en ligne'
    ],
    ctaLabel: 'Obtenir une estimation',
    ctaTo: '/demarrer-un-projet'
  }
]

const faq = [
  {
    question: 'Combien coûte la création d’un site web à Chelles ?',
    answer: 'Un site vitrine essentiel démarre à 700 € HT. Un site vitrine entièrement pensé autour de votre activité démarre à 1 500 € HT. Après un premier échange, nous vous indiquons le périmètre et le budget adaptés à votre projet avant de commencer.'
  },
  {
    question: 'Pouvez-vous vous déplacer à Chelles ?',
    answer: 'Oui. Karibsen est basé à Chelles et nous pouvons nous rencontrer lorsque cela facilite le cadrage du projet, la présentation d’une maquette ou la prise en main de votre site. Le suivi quotidien reste simple, par téléphone, e-mail ou visioconférence.'
  },
  {
    question: 'Combien de temps faut-il pour créer mon site ?',
    answer: 'Un site vitrine se réalise généralement en deux à six semaines, selon le nombre de pages, les contenus à préparer et les fonctionnalités utiles. Nous posons un calendrier clair dès le début pour que chacun sache quand valider les étapes.'
  },
  {
    question: 'Faites-vous le référencement local ?',
    answer: 'Oui. Nous travaillons les fondations techniques et les contenus qui aident vos futurs clients à comprendre votre activité, vos services et votre zone d’intervention. Le référencement local se construit aussi dans la durée avec vos informations Google Business Profile, vos avis et vos contenus.'
  },
  {
    question: 'Puis-je gérer mon site moi-même ?',
    answer: 'Oui. Si votre projet doit évoluer régulièrement, nous pouvons vous donner une administration adaptée aux contenus que vous devez modifier : textes, images, réalisations ou actualités. Vous gardez la main sans avoir à toucher au code.'
  },
  {
    question: 'Travaillez-vous avec les artisans et les commerçants ?',
    answer: 'Oui. L’objectif est le même quel que soit votre métier : rendre votre offre facile à comprendre, rassurer avant le premier contact et guider vos visiteurs vers l’action qui compte pour vous.'
  }
]

const caseStudyId = useId()
const beforeAfterId = useId()
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 lg:gap-16 lg:pb-32">
    <BaseSection>
      <div class="grid min-h-[80vh] gap-10 pt-32 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:pt-48">
        <div class="relative order-2 min-h-80 overflow-hidden rounded-xl md:order-1 md:min-h-full">
          <NuxtImg
            src="/assets/image/locale/chelles.jpg"
            format="webp"
            alt="Chelles et ses alentours, où Karibsen accompagne les entreprises locales"
            width="1200"
            height="900"
            sizes="xs:100vw md:40vw"
            class="absolute inset-0 size-full object-cover"
          />
        </div>

        <div class="order-1 flex flex-col justify-center gap-7 md:order-2">
          <div class="flex flex-col gap-5">
            <Heading
              as="h1"
              class="text-3xl text-black! sm:text-4xl lg:text-5xl"
            >
              Création de site web à Chelles pour les entreprises qui veulent trouver plus de clients
            </Heading>
            <p class="max-w-2xl text-lg leading-relaxed text-foreground-300 md:text-xl">
              Un site clair, rapide et réellement adapté à votre activité, avec un interlocuteur local du premier échange à la mise en ligne.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <Tag label="À partir de 700 € HT" />
            <Tag label="Réponse sous 24 h" />
            <Tag label="Rendez-vous possible à Chelles" />
          </div>

          <div>
            <PressButton
              to="/demarrer-un-projet"
              label="Obtenir une estimation"
            />
          </div>
        </div>
      </div>
    </BaseSection>

    <BaseSection :aria-labelledby="caseStudyId">
      <div class="relative">
        <article class="grid overflow-hidden border border-border-100 bg-white md:grid-cols-2">
          <div class="relative min-h-75 md:min-h-full">
            <NuxtImg
              src="/assets/image/project/as-chelles.png"
              format="webp"
              alt="Aperçu du site de l’AS Chelles Athlétisme repensé par Karibsen"
              width="1280"
              height="960"
              sizes="xs:100vw md:50vw"
              loading="lazy"
              class="absolute inset-0 size-full object-cover"
            />
          </div>
          <div class="flex flex-col items-start gap-6 p-7 sm:p-10">
            <Heading
              :id="caseStudyId"
              as="h2"
              class="font-sans! font-medium text-2xl text-black! sm:text-3xl"
            >
              Refonte du site de l’AS Chelles Athlétisme
            </Heading>
            <p class="leading-relaxed text-foreground-300 md:text-lg">
              Le site est passé de WordPress et PHP à une base Nuxt avec Eponyme : une architecture SEO plus claire, une administration simplifiée et une expérience plus rapide pour les licenciés comme les visiteurs.
            </p>
            <CheckList
              :items="caseHighlights"
              icon-class="text-green-600"
              class="text-black"
            />
            <PressButton
              to="/realisations/as-chelles-athletisme"
              label="Lire l’étude de cas"
            />
          </div>
        </article>

        <CornerHandles />
      </div>
    </BaseSection>

    <IntroductionSection
      title="Pour les entreprises de Chelles qui veulent être choisies plus facilement."
      text="Votre site doit permettre à la bonne personne de comprendre ce que vous faites, pourquoi vous choisir et comment vous contacter, sans chercher l’information pendant dix minutes."
    />

    <FeatureGrid :features="audiences" />

    <BaseSection :aria-labelledby="beforeAfterId">
      <div class="flex flex-col gap-9">
        <SectionTitle :id="beforeAfterId">
          <template #title>
            Une refonte utile, pas seulement plus jolie.
          </template>
          <template #description>
            <p class="max-w-2xl leading-relaxed text-foreground-300 md:text-center md:text-lg">
              Lorsqu’un site ne représente plus l’activité, la priorité est de corriger ce qui freine les visiteurs et de préserver ce qui fonctionne déjà.
            </p>
          </template>
        </SectionTitle>

        <ol class="grid gap-px border border-border-100 bg-border-100 md:grid-cols-3">
          <li class="bg-white p-6 sm:p-8">
            <h3 class="font-sans text-2xl font-medium text-black">
              Un site difficile à faire évoluer
            </h3>
            <p class="mt-3 leading-relaxed text-theme-950">
              Pages peu lisibles, administration compliquée, lenteurs sur mobile ou offres qui ne correspondent plus à votre activité.
            </p>
          </li>
          <li class="bg-white p-6 sm:p-8">
            <h3 class="font-sans text-2xl font-medium text-black">
              On repart des besoins réels
            </h3>
            <p class="mt-3 leading-relaxed text-theme-950">
              Audit, nouvelles priorités de contenus, design, développement, SEO et migration sont traités comme un seul projet cohérent.
            </p>
          </li>
          <li class="bg-white p-6 sm:p-8">
            <h3 class="font-sans text-2xl font-medium text-black">
              Une base claire pour attirer et convaincre
            </h3>
            <p class="mt-3 leading-relaxed text-theme-950">
              Un site plus rapide, plus simple à administrer et mieux préparé pour vos futures pages, campagnes ou évolutions métier.
            </p>
          </li>
        </ol>
      </div>
    </BaseSection>

    <PricingSection
      title="Combien coûte la création d’un site à Chelles ?"
      description="Deux points de départ clairs. Le devis final dépend des pages, contenus et fonctionnalités réellement utiles à votre activité."
      :plans="pricing"
      note="Les tarifs sont indiqués hors taxes. Après notre premier échange, vous recevez une estimation adaptée au périmètre de votre projet."
    />

    <FAQSection
      title="Questions fréquentes sur la création de site web à Chelles"
      :items="faq"
      :show-cta="false"
    />

    <CTASection
      title="Parlons de votre futur site à Chelles."
      description="Décrivez-nous votre activité et ce que vous voulez améliorer. Nous vous répondons personnellement sous 24 heures avec les prochaines étapes utiles."
      cta-label="Obtenir une estimation"
      cta-to="/demarrer-un-projet"
    />
  </div>
</template>
