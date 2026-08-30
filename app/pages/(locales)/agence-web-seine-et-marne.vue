<script setup lang="ts">
import type { ProcessStep } from '~/types/process'
import HeroLocaleSection from '~/components/section/HeroLocaleSection.vue'
import ServicesSection from '~/components/section/ServicesSection.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import FeatureGrid from '~/components/ui/feature/FeatureGrid.vue'
import WhyKaribsenSection from '~/components/section/WhyKaribsenSection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import RelatedProjects from '~/components/section/RelatedProjects.vue'

const title = 'Karibsen: Agence création site web en Seine-et-Marne (77)'
const description = 'Agence web à Chelles : sites vitrines, refontes et applications sur mesure pour les entreprises de Seine-et-Marne, avec un seul interlocuteur.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const process: ProcessStep[] = [
  {
    title: 'Un premier échange sur votre activité',
    description: 'Nous commençons par comprendre votre entreprise, vos clients et les résultats que vous attendez de votre futur site. Cet échange peut avoir lieu en Seine-et-Marne ou en visioconférence.\n\nNous clarifions ensemble les pages nécessaires, les messages importants, les fonctionnalités utiles et les actions que vos visiteurs devront pouvoir réaliser sans hésiter.',
    animation: 'call'
  },
  {
    title: 'La stratégie, les contenus et la maquette',
    description: 'Nous organisons votre offre pour qu’elle soit comprise rapidement, puis concevons une direction visuelle fidèle à votre identité.\n\nLa maquette permet de valider la hiérarchie des informations, les appels à l’action et l’expérience mobile avant le développement.',
    animation: 'skeleton'
  },
  {
    title: 'Le développement de votre projet web',
    description: 'Nous développons un site rapide, responsive et simple à administrer, sans partir d’un modèle générique. Le design, les performances et les fondations du référencement naturel sont travaillés ensemble.',
    animation: 'website'
  },
  {
    title: 'La mise en ligne et la prise en main',
    description: 'Avant la publication, nous vérifions les contenus, les formulaires, les liens et le comportement du site sur chaque taille d’écran.\n\nUne fois le projet en ligne, vous disposez des accès et des explications utiles pour faire vivre votre site.',
    animation: 'online'
  }
]

const faq = [
  {
    question: 'Travaillez-vous uniquement avec des entreprises de Seine-et-Marne ?',
    answer: 'Basé à Chelles, Karibsen accompagne les entreprises du secteur dans leur <a class="font-semibold" href="/creation-site-web-chelles">création de site web à Chelles</a>, ainsi que les projets partout en Seine-et-Marne.'
  },
  {
    question: 'Quels projets peut prendre en charge votre agence web ?',
    answer: 'Nous créons des sites vitrines, réalisons des refontes de site web et développons des applications web sur mesure. Le format dépend de votre besoin : mieux présenter votre activité, gagner en visibilité, convertir davantage ou simplifier un processus métier.'
  },
  {
    question: 'Prenez-vous en charge l’hébergement et la mise en ligne ?',
    answer: 'Oui. Nous vous accompagnons sur l’hébergement, le nom de domaine, les réglages techniques et la mise en ligne. Vous n’avez pas besoin de gérer seul la partie serveur ou de multiplier les prestataires pour finaliser votre projet web.'
  },
  {
    question: 'Comment démarre un projet avec Karibsen ?',
    answer: 'Tout commence par un premier échange pour comprendre votre activité, vos contraintes et vos objectifs. Nous vous proposons ensuite un périmètre clair, une méthode de travail et les étapes nécessaires pour avancer sereinement.'
  }
]

const features = [
  {
    icon: 'heroicons:map-pin',
    label: 'Une présence locale',
    description: 'Une agence basée à Chelles, disponible pour accompagner les projets partout en Seine-et-Marne.'
  },
  {
    icon: 'heroicons:chat-bubble-left-right',
    label: 'Un accompagnement direct',
    description: 'Un interlocuteur unique, des échanges simples et des décisions rapides du cadrage à la mise en ligne.'
  },
  {
    icon: 'heroicons:sparkles',
    label: 'Un projet sur mesure',
    description: 'Une solution conçue autour de votre activité, de vos clients et de vos objectifs, sans modèle générique.'
  }
]
</script>

<template>
  <div class="pb-24 sm:pb-32">
    <HeroLocaleSection
      title="En Seine-et-Marne, vos ambitions méritent mieux qu’un site ordinaire."
      description="Karibsen accompagne les entreprises, indépendants et équipes de Seine-et-Marne avec des expériences web utiles, singulières et durables."
      image="/assets/image/locale/seine-et-marne.jpg"
      image-alt="Karibsen, agence web intervenant en Seine-et-Marne"
    />

    <FeatureGrid
      class="mt-24 md:mt-32"
      :features="features"
      heading="h2"
    />

    <ServicesSection
      id="expertise"
      class="mt-24 md:mt-32"
      title="Nos expertises"
      description="Des solutions web conçues sur mesure pour faire avancer les projets des entreprises de Seine-et-Marne."
    />

    <WhyKaribsenSection
      title="Pourquoi choisir une agence web en Seine-et-Marne ?"
      image="/assets/image/corentin.jpg"
      image-alt="Corentin, fondateur de Karibsen, agence web basée en Seine-et-Marne"
      image-position="right"
      :paragraphs="[
        'Choisir une agence web en Seine-et-Marne facilite les échanges et permet de travailler avec un partenaire qui connaît le tissu économique local, des indépendants aux entreprises implantées dans les différentes villes du département.',
        'La proximité rend les moments importants plus simples à organiser. Nous pouvons nous rencontrer pour cadrer votre projet, présenter une maquette ou prendre une décision, tout en conservant un suivi fluide à distance au quotidien.',
        'Votre visibilité locale est prise en compte dès le départ. La structure du site, les contenus et les fondations techniques sont pensés autour des recherches réalisées par vos futurs clients en Seine-et-Marne.',
        'Avec Karibsen, vous échangez directement avec la personne qui conçoit et développe votre projet. Les informations ne se perdent pas entre plusieurs intermédiaires et vous gardez un interlocuteur unique jusqu’à la mise en ligne.'
      ]"
    />

    <div class="mt-24 md:mt-32">
      <RelatedProjects
        locale="Seine-et-Marne"
        title="Ils nous font confiance en Seine-et-Marne"
      />
    </div>

    <div class="mt-24 md:mt-32">
      <ProcessSection
        :steps="process"
        title="De notre premier échange en Seine-et-Marne jusqu’à la mise en ligne."
      />
    </div>

    <div class="mt-24 md:mt-32">
      <FAQSection
        title="Questions fréquentes sur notre agence web en Seine-et-Marne"
        :items="faq"
        :show-cta="false"
      />
    </div>

    <CTASection
      title="Parlons de ce que votre site peut faire de mieux pour vous."
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
    />
  </div>
</template>
