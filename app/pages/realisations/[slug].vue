<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import OtherServicesSection from '~/components/section/OtherServicesSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

definePageMeta({
  key: route => route.fullPath
})

const route = useRoute()
const slug = route.params.slug as string

const { data, error, pending, refresh } = useEponymeCollectionEntry('realisations', slug)

const project = computed(() => data.value?.data)

if (pending.value) await refresh()

if (error.value || !project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Réalisation introuvable',
    fatal: true
  })
}

const title = () => project.value?.name
  ? `Karibsen: Étude de cas ${project.value.name}`
  : 'Karibsen: Étude de cas'

const description = () => project.value?.description

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <BaseSection class="relative z-10 pt-32 md:pt-48 flex w-full flex-col gap-9">
    <SectionTitle
      heading="h1"
      size="h2"
    >
      <template #title>
        {{ project?.name }}
      </template>
    </SectionTitle>

    <div class="karibsen-prose max-w-180 mx-auto">
      <EponymeRichText :html="project?.text" />

      <p v-if="slug === 'as-chelles-athletisme'">
        Pour un projet similaire, découvrez notre accompagnement en
        <NuxtLink to="/creation-site-web-chelles">création de site web à Chelles</NuxtLink>.
      </p>
    </div>

    <div class="mb-20">
      <OtherServicesSection
        class="px-0!"
        description="Au-delà de la refonte, nous créons aussi des sites vitrines et des applications web sur mesure."
      />
    </div>
  </BaseSection>
</template>
