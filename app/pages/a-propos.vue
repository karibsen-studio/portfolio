<script setup lang="ts">
import WhyKaribsenSection from '~/components/section/WhyKaribsenSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import FeatureGrid from '~/components/ui/feature/FeatureGrid.vue'
import HeroSection from '~/components/section/HeroSection.vue'

const title = 'Karibsen: À propos de notre studio web indépendant'
const description = 'Découvrez l\'histoire de Karibsen, un studio web indépendant qui conçoit des sites et applications sur mesure sans les lourdeurs d\'une grande agence.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 lg:gap-16 lg:pb-32">
    <HeroSection
      title="Découvrez qui se cache derrière Karibsen"
      description="Derrière Karibsen, il y a surtout l’envie de créer des projets utiles, bien pensés et agréables à utiliser, en travaillant au plus proche des personnes qui nous font confiance."
      cta-label="Nous rejoindre"
      cta-to="/recrutement"
    />

    <WhyKaribsenSection
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

    <div class="px-4 md:px-8">
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
      title="Une idée de projet ? Discutons-en."
      description="Que vous ayez un cahier des charges détaillé ou juste une idée, le premier échange est toujours gratuit et sans engagement."
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
    />
  </div>
</template>
