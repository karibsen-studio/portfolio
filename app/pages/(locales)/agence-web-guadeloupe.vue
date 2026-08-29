<script setup lang="ts">
import type { ProcessStep } from '~/types/process'
import HeroLocaleSection from '~/components/section/HeroLocaleSection.vue'
import FocusSection from '~/components/section/FocusSection.vue'
import WhyKaribsenSection from '~/components/section/WhyKaribsenSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import ProcessSection from '~/components/section/ProcessSection.vue'
import PromoPopup from '~/components/ui/PromoPopup.vue'

const title = 'Karibsen: Agence de création de site web en Guadeloupe (971)'
const description = 'Création de sites web pour les entreprises guadeloupéennes : tourisme, réservation, commerce local. Une agence fondée par un Guadeloupéen, en métropole.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const focus = [
  {
    icon: 'heroicons:sun',
    title: 'Tourisme et réservation',
    description: 'Hôtels, locations saisonnières, excursions et restaurants : votre site doit rassurer un visiteur qui ne connaît pas encore l’île et lui permettre de réserver sans appeler.',
    points: [
      'Présentation des hébergements, sorties et menus',
      'Disponibilités, demandes de réservation et acomptes',
      'Photos et pages pensées pour la préparation d’un séjour',
      'Version consultable depuis la métropole comme depuis l’île'
    ],
    to: '/site-vitrine',
    linkLabel: 'Voir la création de site vitrine'
  },
  {
    icon: 'heroicons:map-pin',
    title: 'Commerce et services locaux',
    description: 'Vos clients vous cherchent depuis leur téléphone, souvent en déplacement. L’essentiel doit être trouvable en quelques secondes, sans zoomer ni chercher un numéro.',
    points: [
      'Fiche Google et site qui affichent les mêmes informations',
      'Horaires, itinéraire et appel accessibles en un geste',
      'Contact direct par WhatsApp en plus du formulaire',
      'Chargement rapide, y compris avec une connexion mobile faible'
    ],
    to: '/refonte-site-web',
    linkLabel: 'Voir la refonte de site'
  },
  {
    icon: 'heroicons:globe-alt',
    title: 'Clientèle locale et métropolitaine',
    description: 'Beaucoup d’activités guadeloupéennes s’adressent à deux publics à la fois : ceux qui vivent sur l’île et ceux qui préparent leur venue depuis l’Hexagone.',
    points: [
      'Un discours qui parle aux deux publics sans les mélanger',
      'Livraison, expédition ou déplacement expliqués clairement',
      'Paiement et prise de contact adaptés à distance',
      'Référencement travaillé sur les recherches des deux côtés'
    ],
    to: '/application-web-sur-mesure',
    linkLabel: 'Voir les applications sur mesure'
  }
]

const process: ProcessStep[] = [
  {
    title: 'Organiser les échanges autour du décalage horaire',
    description: 'Le premier rendez-vous se tient en visioconférence sur un créneau défini ensemble. Nous préparons les questions en amont pour consacrer l’appel aux décisions utiles, puis nous gardons une trace écrite des réponses et des prochaines actions.\n\nEntre deux rendez-vous, vous pouvez transmettre vos contenus et vos retours sans attendre que nous soyons connectés au même moment.',
    animation: 'call'
  },
  {
    title: 'Présenter votre activité avec ses réalités locales',
    description: 'Nous partons des services que vous proposez réellement en Guadeloupe, des personnes que vous ciblez et des questions qu’elles vous posent. Le contenu ne reprend pas le discours générique d’une entreprise située en métropole.\n\nNous construisons ensuite les pages et les parcours autour de ces usages, avec des textes que vos clients peuvent comprendre sans connaître votre métier.',
    animation: 'skeleton'
  },
  {
    title: 'Valider la maquette à distance, écran par écran',
    description: 'Vous découvrez le futur site avant le développement et commentez chaque écran depuis la Guadeloupe. Nous regroupons les retours au même endroit afin de distinguer les corrections nécessaires des nouvelles idées.\n\nCette validation porte sur le contenu, la navigation et l’affichage mobile. Le développement commence lorsque les choix importants sont clairs pour tout le monde.',
    animation: 'website'
  },
  {
    title: 'Mettre en ligne et transmettre la gestion du site',
    description: 'Nous convenons d’un jour de publication et vérifions le domaine, les formulaires et les coordonnées affichées avant le passage en ligne. Vous n’avez pas besoin d’être devant votre écran pendant toute l’opération.\n\nUne visioconférence de prise en main vous montre comment modifier les contenus courants. Vous recevez aussi les accès nécessaires pour rester propriétaire de votre site.',
    animation: 'online'
  }
]
</script>

<template>
  <div class="pb-24 sm:pb-32">
    <HeroLocaleSection
      title="Créer un site pour votre entreprise en Guadeloupe."
      description="Tourisme, commerce de proximité, services : nous concevons des sites pensés pour la clientèle guadeloupéenne comme pour celle qui prépare sa venue depuis la métropole."
      image="/assets/image/locale/guadeloupe.jpeg"
      image-alt="Karibsen, agence web accompagnant les entreprises de Guadeloupe"
    />

    <div class="mt-24 md:mt-32">
      <FocusSection
        title="Ce que nous construisons pour les entreprises guadeloupéennes."
        description="Trois besoins reviennent presque à chaque projet sur l’île. Votre activité en concerne souvent deux à la fois."
        :items="focus"
      />
    </div>

    <WhyKaribsenSection
      title="Travailler avec une agence guadeloupéenne installée en métropole."
      image="/assets/image/corentin.jpg"
      image-alt="Corentin, fondateur guadeloupéen de Karibsen"
      image-position="left"
      :paragraphs="[
        'Nous sommes originaires de l’île. Vous n’avez pas à expliquer votre contexte depuis le début : les habitudes locales, les saisons touristiques et la manière dont vos clients cherchent, nous les connaissons déjà.',
        'Être basés en métropole ne nous éloigne pas de votre projet, cela vous donne accès aux mêmes standards techniques que les entreprises hexagonales, sans les tarifs d’une grosse structure.',
        'Vous travaillez avec un interlocuteur unique, disponible en visioconférence et par écrit. Rien ne se perd entre plusieurs intervenants, et vous savez toujours où en est votre projet.',
        'Chaque site est conçu sur mesure. La structure des pages, les contenus et l’interface sont construits autour de votre activité, pas autour d’un modèle réutilisé d’un client à l’autre.'
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
