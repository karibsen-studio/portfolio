<script setup lang="ts">
import HeroLocaleSection from '~/components/section/HeroLocaleSection.vue'
import ServicesSection from '~/components/section/ServicesSection.vue'
import WhyKaribsenSection from '~/components/section/WhyKaribsenSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import PromoPopup from '~/components/ui/PromoPopup.vue'

useSeoMeta({
  title: 'Agence web Guadeloupe : création de sites à distance | Karibsen',
  description: 'Création de sites vitrines et d’applications web pour les entreprises guadeloupéennes. Fondée par un Guadeloupéen installé en métropole, Karibsen travaille à distance avec des échanges cadrés.'
})

const process = [
  {
    title: 'Organiser les échanges autour du décalage horaire',
    description: 'Le premier rendez-vous se tient en visioconférence sur un créneau défini ensemble. Nous préparons les questions en amont pour consacrer l’appel aux décisions utiles, puis nous gardons une trace écrite des réponses et des prochaines actions.\n\nEntre deux rendez-vous, vous pouvez transmettre vos contenus et vos retours sans attendre que nous soyons connectés au même moment.',
    image: '/assets/image/services/call.png',
    imageAlt: 'Visioconférence organisée entre la Guadeloupe et la métropole'
  },
  {
    title: 'Présenter votre activité avec ses réalités locales',
    description: 'Nous partons des services que vous proposez réellement en Guadeloupe, des personnes que vous ciblez et des questions qu’elles vous posent. Le contenu ne reprend pas le discours générique d’une entreprise située en métropole.\n\nNous construisons ensuite les pages et les parcours autour de ces usages, avec des textes que vos clients peuvent comprendre sans connaître votre métier.',
    image: '/assets/image/services/maquette.png',
    imageAlt: 'Organisation des contenus d’un site destiné au public guadeloupéen'
  },
  {
    title: 'Valider la maquette à distance, écran par écran',
    description: 'Vous découvrez le futur site avant le développement et commentez chaque écran depuis la Guadeloupe. Nous regroupons les retours au même endroit afin de distinguer les corrections nécessaires des nouvelles idées.\n\nCette validation porte sur le contenu, la navigation et l’affichage mobile. Le développement commence lorsque les choix importants sont clairs pour tout le monde.',
    image: '/assets/image/services/code.png',
    imageAlt: 'Validation à distance des écrans avant leur développement'
  },
  {
    title: 'Mettre en ligne et transmettre la gestion du site',
    description: 'Nous convenons d’un jour de publication et vérifions le domaine, les formulaires et les coordonnées affichées avant le passage en ligne. Vous n’avez pas besoin d’être devant votre écran pendant toute l’opération.\n\nUne visioconférence de prise en main vous montre comment modifier les contenus courants. Vous recevez aussi les accès nécessaires pour rester propriétaire de votre site.',
    image: '/assets/image/services/online.png',
    imageAlt: 'Mise en ligne à distance d’un site pour une activité en Guadeloupe'
  }
]
</script>

<template>
  <div class="pb-24 sm:pb-32">
    <HeroLocaleSection
      title="Une agence web guadeloupéenne, à la hauteur de votre activité."
      description="Karibsen accompagne les entreprises, indépendants et associations de Guadeloupe avec des sites et des applications web sur mesure, entièrement à distance."
      image="/assets/image/locale/guadeloupe.jpeg"
      image-alt="Karibsen, agence web accompagnant les entreprises de Guadeloupe"
    />

    <ServicesSection
      class="mt-24 md:mt-32"
      title="Le bon format pour faire progresser votre présence en ligne."
      description="Site vitrine, refonte ou application sur mesure : nous choisissons avec vous le format qui sert vraiment votre activité en Guadeloupe, plutôt que celui qui remplit un devis."
    />

    <WhyKaribsenSection
      title="Pourquoi choisir Karibsen pour votre projet web en Guadeloupe ?"
      image="/assets/image/corentin.jpg"
      image-alt="Corentin, fondateur guadeloupéen de Karibsen"
      image-position="left"
      :paragraphs="[
        'Nous sommes originaires de l’île. Vous n’avez pas à expliquer votre contexte depuis le début : les habitudes locales, les saisons et la manière dont vos clients cherchent, nous les connaissons déjà.',
        'Vous travaillez avec un interlocuteur unique, disponible en visioconférence et par écrit. Rien ne se perd entre plusieurs intervenants, et vous savez toujours où en est votre projet.',
        'Chaque site est conçu sur mesure. La structure des pages, les contenus et l’interface sont construits autour de votre activité, pas autour d’un modèle réutilisé d’un client à l’autre.',
        'Le décalage horaire joue en votre faveur : ce que vous nous envoyez en fin de journée est traité pendant votre nuit, et vous retrouvez les avancées dès le lendemain matin.'
      ]"
    />

    <div class="mt-24 md:mt-32">
      <ProcessSection
        :steps="process"
        title="De notre premier échange en Guadeloupe jusqu’à la mise en ligne."
      />
    </div>

    <CTASection
      title="Parlons de ce que votre site peut faire de mieux pour vous."
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
    />

    <PromoPopup
      city="Guadeloupe"
      where="en Guadeloupe"
    />
  </div>
</template>
