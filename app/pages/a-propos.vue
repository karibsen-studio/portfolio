<script setup lang="ts">
import HeroLocaleSection from '~/components/section/HeroLocaleSection.vue'
import WhyKaribsenSection from '~/components/section/WhyKaribsenSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import FeatureGrid from '~/components/ui/feature/featureGrid.vue'

useSeoMeta({
  title: 'À propos | Karibsen',
  description: 'Découvrez l\'histoire de Karibsen, un studio web indépendant qui conçoit des sites et applications sur mesure sans les lourdeurs d\'une grande agence.'
})
</script>

<template>
  <div class="pb-24 sm:pb-32">
    <HeroLocaleSection
      title="Un studio web indépendant, à taille humaine."
      description="Chez Karibsen, nous croyons qu'un bon site web naît d'une collaboration directe et transparente. Pas d'intermédiaires, pas de jargon inutile."
      image="/assets/image/corentin.png"
      image-alt="Corentin, fondateur de Karibsen"
    />

    <WhyKaribsenSection
      class="mt-24 md:mt-32"
      title="L'approche Karibsen : simplicité et efficacité."
      image="/assets/image/locale/chelles.jpg"
      image-alt="Karibsen, basé à Chelles en Île-de-France"
      image-position="left"
      :paragraphs="[
        'Après plusieurs années à travailler dans le développement web, j\'ai créé Karibsen avec une idée simple : offrir la qualité d\'une grande agence sans ses lourdeurs administratives.',
        'Lorsque vous travaillez avec nous, vous parlez directement à la personne qui code votre site. Cela signifie des réponses plus rapides, une meilleure compréhension de vos enjeux et des ajustements en temps réel.',
        'Notre indépendance est notre force. Elle nous permet de choisir nos projets, de nous y investir pleinement et de construire des relations de confiance sur le long terme avec nos clients.',
        'Basés en Île-de-France, nous travaillons avec des entreprises de toutes tailles, que ce soit localement ou à travers toute la France grâce à des méthodes de travail à distance éprouvées.'
      ]"
    />

    <div class="mt-24 md:mt-32 px-4 md:px-8">
      <div class="max-w-4xl mx-auto text-center mb-16">
        <h2 class="text-3xl font-semibold sm:text-4xl text-black">
          Nos valeurs fondamentales
        </h2>
        <p class="mt-6 text-lg text-theme-950">
          Des principes simples qui guident chacune de nos collaborations.
        </p>
      </div>
      <FeatureGrid />
    </div>

    <CTASection
      class="mt-24 md:mt-32"
      title="Une idée de projet ? Discutons-en."
      description="Que vous ayez un cahier des charges détaillé ou juste une idée, le premier échange est toujours gratuit et sans engagement."
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
    />
  </div>
</template>
