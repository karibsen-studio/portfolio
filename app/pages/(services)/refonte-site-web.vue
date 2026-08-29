<script setup lang="ts">
import type { ProcessStep } from '~/types/process'
import HeroSection from '~/components/section/HeroSection.vue'
import FeatureGrid from '~/components/ui/feature/FeatureGrid.vue'
import IntroductionSection from '~/components/section/IntroductionSection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import EponymeSection from '~/components/section/EponymeSection.vue'
import PricingSection from '~/components/section/PricingSection.vue'
import RelatedProjects from '~/components/section/RelatedProjects.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import OtherServicesSection from '~/components/section/OtherServicesSection.vue'
import CTASection from '~/components/section/CTASection.vue'

const title = 'Karibsen: Refonte de site web, performance et SEO'
const description = 'Refonte de site web : une expérience modernisée, plus rapide et pensée pour préserver vos acquis SEO. Audit, nouvelle structure et migration sans perte.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const process: ProcessStep[] = [
  {
    title: 'Audit de votre site existant',
    description: 'Nous analysons l’architecture, les contenus, les parcours utilisateurs, les performances et la visibilité de votre site sur les moteurs de recherche.\n\nCet audit de refonte de site web permet d’identifier précisément les pages à préserver, les freins à corriger et les opportunités de conversion à créer.',
    animation: 'call'
  },
  {
    title: 'Stratégie, arborescence et SEO',
    description: 'Nous réorganisons vos pages autour des besoins de vos visiteurs et de vos objectifs commerciaux.\n\nMessages prioritaires, maillage interne, parcours de conversion, intentions de recherche et plan de redirections SEO sont définis avant le design, pour ne pas sacrifier votre référencement naturel pendant la migration.',
    animation: 'skeleton'
  },
  {
    title: 'Design et développement sur mesure',
    description: 'Nous concevons une interface fidèle à votre identité, puis développons chaque page pour mobile et ordinateur.\n\nLisibilité, rapidité et appels à l’action sont pensés ensemble pour rendre votre site plus efficace.',
    animation: 'website'
  },
  {
    title: 'Migration et mise en ligne sécurisées',
    description: 'Avant la mise en ligne, nous vérifions les contenus, formulaires, liens, versions mobile et règles techniques.\n\nLes anciennes URLs importantes sont redirigées proprement vers les nouvelles pages afin de préserver votre trafic SEO et d’assurer une transition fiable pour vos visiteurs comme pour Google.',
    animation: 'online'
  }
]

const faq = [
  {
    question: 'Combien de temps prend une refonte de site web ?',
    answer: 'Une refonte de site web demande généralement entre six et douze semaines. Le délai varie selon la taille du site actuel, les contenus à retravailler, les fonctionnalités à conserver et le niveau de préparation nécessaire avant la migration.'
  },
  {
    question: 'Est-ce que je vais perdre mon référencement naturel ?',
    answer: 'Non, une refonte bien préparée vise justement à préserver vos acquis SEO. Nous identifions les pages importantes, préparons les redirections nécessaires et vérifions les éléments techniques avant la mise en ligne pour limiter les risques de perte de trafic.'
  },
  {
    question: 'Faut-il réécrire tous les contenus de mon ancien site ?',
    answer: 'Pas forcément. Nous auditons vos contenus pour décider lesquels conserver, simplifier, fusionner ou réécrire. L’objectif est de garder ce qui apporte déjà de la visibilité ou de la confiance, tout en améliorant la clarté de votre offre.'
  },
  {
    question: 'Pouvez-vous reprendre mon hébergement et mes outils existants ?',
    answer: 'Oui. Nous faisons le point sur votre hébergement, votre nom de domaine, vos formulaires et vos outils avant le projet. Si une migration est utile, nous la préparons avec vous ; sinon, nous conservons ce qui fonctionne déjà correctement.'
  }
]
const pricing = [
  {
    title: 'Refonte de site web',
    pricePrefix: 'À partir de',
    price: '1 000 € HT',
    description: 'Un site repris de fond en comble : design modernisé, performances retravaillées et référencement préservé, sans repartir de zéro.',
    features: [
      'Audit de l’existant et des performances',
      'Nouvelle direction visuelle',
      'Reprise et réécriture des contenus clés',
      'Redirections et référencement préservés',
      'Mise en ligne et suivi'
    ],
    ctaLabel: 'Parler de ma refonte',
    ctaTo: { hash: '#echangeons' }
  }
]

const features = [
  {
    icon: 'heroicons:magnifying-glass-circle',
    label: 'Un regard objectif',
    description: 'Un audit de l’existant pour distinguer ce qui fonctionne de ce qui vous ralentit.'
  },
  {
    icon: 'heroicons:sparkles',
    label: 'Une expérience plus simple',
    description: 'Une arborescence et des parcours repensés pour vos visiteurs d’aujourd’hui.'
  },
  {
    icon: 'heroicons:arrow-path',
    label: 'Une migration sans improvisation',
    description: 'Redirections, contenus et référencement préparés avant la bascule.'
  }
]
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 lg:gap-16 lg:pb-32">
    <HeroSection
      title="Votre site a fait son chemin. Il est temps de lui redonner une longueur d’avance."
      description="Une refonte réussie ne consiste pas seulement à changer le design : elle remet votre site au service de vos objectifs d’aujourd’hui."
      :cta-to="{ hash: '#processus' }"
      cta-label="Découvrir notre méthode"
    />

    <IntroductionSection
      title="Quand faut-il envisager une refonte de site web ?"
      text="Il n’y a pas d’âge limite pour un site : le signal, c’est le décalage. Vos offres ont changé mais le site parle encore de l’ancienne activité, il s’affiche mal sur mobile, met plusieurs secondes à charger, ne remonte plus dans les résultats de recherche, ou vous n’osez plus y toucher parce que la moindre modification demande un développeur. Une refonte devient utile quand votre site vous freine au lieu de vous servir : quand il ne ressemble plus à ce que vous êtes devenu, ou quand il ne transforme plus les visiteurs en contacts."
    />

    <FeatureGrid :features="features" />

    <EponymeSection
      title="Et si vous repreniez la main sur vos contenus ?"
      :paragraphs="[
        'Beaucoup de refontes commencent par le même constat : plus personne n’ose toucher au site, faute d’un back-office clair. Nous pouvons donc profiter de la refonte pour brancher Eponyme, le CMS que nous avons développé.',
        'L’administration est construite autour des contenus réellement présents sur votre site : vous modifiez vos textes, vos images, vos réalisations ou vos articles depuis une interface simple, sans risquer de casser le design ni les performances tout juste retrouvées.'
      ]"
      image-alt="Tableau de bord du CMS Eponyme, utilisé après une refonte de site"
    />

    <ProcessSection
      :steps="process"
      title="Une refonte pensée pour l’expérience, la performance et le SEO."
    />

    <RelatedProjects
      tag="Refonte"
      title="Des sites que nous avons repris en main."
    />

    <PricingSection
      title="Un budget clair avant de commencer"
      :plans="pricing"
      note="Ces tarifs sont des points de départ : le prix évolue selon le nombre de pages, les fonctionnalités, les intégrations et le volume de contenu à produire. Le périmètre exact est fixé ensemble avant le devis."
    />

    <FAQSection
      title="Questions fréquentes sur la refonte de site web"
      :items="faq"
      :show-cta="false"
    />

    <OtherServicesSection
      exclude="refonte-site-web"
      description="Au-delà de la refonte, nous créons aussi des sites vitrines et des applications web sur mesure."
    />

    <CTASection cta-label="Démarrer un projet" />
  </div>
</template>
