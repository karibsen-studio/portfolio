<script setup lang="ts">
import HeroSection from '~/components/section/HeroSection.vue'
import ServicesSection from '~/components/section/ServicesSection.vue'
import RealisationSection from '~/components/section/RealisationSection.vue'
import FAQSection from '~/components/section/FAQSection.vue'
import CTASection from '~/components/section/CTASection.vue'
import FeatureGrid from '~/components/ui/feature/FeatureGrid.vue'
import BentoSection from '~/components/section/BentoSection.vue'

const seoTitle = 'Agence web sur mesure : sites et applications'
const seoDescription = 'Chez Karibsen, nous créons des sites web uniques et performants qui renforcent votre image, attirent vos clients et font grandir votre activité.'

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription
})

const { data: homepage } = await useEponyme('homepage')

const hero = computed(() => homepage.value?.hero)
const faq = computed(() => homepage.value?.faq)

const { entries: realisations } = await useEponymeCollection('realisations', { take: 6 })

const projects = computed(() => realisations.value.map(entry => ({
  name: entry.data.name,
  tags: entry.data.tags,
  description: entry.data.description,
  image: entry.data.image,
  to: `/realisations/${entry.slug}`
})))
</script>

<template>
  <div class="flex flex-col gap-18 pb-24 lg:gap-16 lg:pb-32">
    <HeroSection
      :title="hero?.title ?? ''"
      :description="hero?.description"
      :cta-label="hero?.ctaLabel"
      :cta-to="hero?.ctaTo.href"
      :worked-with="hero?.workedWith ?? true"
    />

    <ServicesSection />
    <FeatureGrid />

    <BentoSection
      title="Votre projet avance sans zone d’ombre."
      description="De la première idée à la mise en ligne, chaque étape est cadrée, expliquée et validée avec vous pour avancer sereinement."
    />
    <RealisationSection :projects="projects" />
    <FAQSection
      :title="faq?.title"
      :description="faq?.description"
      :items="faq?.items"
    />
    <CTASection
      class="w-full"
      title="Discutons de votre projet."
      description="Dites-moi en deux lignes ce que vous avez en tête. Je réponds personnellement, sous 24 heures."
      cta-label="Démarrer un projet"
      cta-to="/demarrer-un-projet"
    />
  </div>
</template>
