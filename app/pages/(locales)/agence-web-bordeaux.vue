<script setup lang="ts">
import HeroLocaleSection from '~/components/section/HeroLocaleSection.vue'
import ServicesSection from '~/components/section/ServicesSection.vue'
import WhyKaribsenSection from '~/components/section/WhyKaribsenSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import PromoPopup from '~/components/ui/PromoPopup.vue'

useSeoMeta({
  title: 'Agence web à Bordeaux : création de sites et applications | Karibsen',
  description: 'Agence web intervenant à Bordeaux : sites vitrines, refontes et applications sur mesure, avec un interlocuteur unique du premier appel à la mise en ligne.'
})

const process = [
  {
    title: 'Cadrer le projet sans multiplier les réunions',
    description: 'Nous réunissons dès le départ les personnes qui décideront du contenu, du budget et du calendrier. Le rendez-vous peut avoir lieu en visioconférence ou lors de nos déplacements à Bordeaux.\n\nCet échange sert à fixer un objectif principal, les publics à convaincre et les contraintes à prendre en compte. Vous repartez avec un périmètre lisible, pas avec une succession d’ateliers sans décision.',
    image: '/assets/image/services/call.png',
    imageAlt: 'Réunion de cadrage pour un projet web à Bordeaux'
  },
  {
    title: 'Faire ressortir votre offre dans un marché chargé',
    description: 'À Bordeaux et en Gironde, vos prospects comparent vite et ouvrent souvent plusieurs sites à la suite. Nous travaillons donc l’ordre des pages, les preuves et les appels à l’action avant de dessiner l’interface.\n\nLa maquette montre concrètement ce qu’un visiteur comprend en arrivant, où il trouve l’information utile et comment il vous contacte.',
    image: '/assets/image/services/maquette.png',
    imageAlt: 'Maquette conçue pour présenter clairement une offre à Bordeaux'
  },
  {
    title: 'Développer avec des validations courtes',
    description: 'Une fois la direction validée, nous développons les écrans et les fonctionnalités par étapes. Vous échangez directement avec la personne qui écrit le code, ce qui permet de trancher rapidement lorsqu’un détail doit évoluer.\n\nLe site reste lisible sur mobile, rapide à charger et administrable sans dépendre de nous pour chaque modification.',
    image: '/assets/image/services/code.png',
    imageAlt: 'Développement sur mesure d’un site pour une entreprise bordelaise'
  },
  {
    title: 'Préparer la bascule sans perdre vos acquis',
    description: 'Nous contrôlons les formulaires, les liens, le nom de domaine et les pages importantes avant l’ouverture au public. Lors d’une refonte, les anciennes adresses sont redirigées vers les nouvelles pour conserver le chemin des visiteurs et des moteurs de recherche.\n\nAprès la mise en ligne, nous vous remettons les accès et vous montrons les actions courantes pour gérer le site.',
    image: '/assets/image/services/online.png',
    imageAlt: 'Contrôle final avant la mise en ligne d’un site à Bordeaux'
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

    <div class="mt-24 md:mt-32">
      <ProcessSection
        :steps="process"
        title="De notre premier échange jusqu’à la mise en ligne."
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
