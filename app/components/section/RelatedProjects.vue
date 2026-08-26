<script setup lang="ts">
import PressButton from '~/components/ui/PressButton.vue'
import ProjectGrid from '~/components/ui/project/ProjectGrid.vue'
import BaseSection from '~/components/section/BaseSection.vue'

const props = withDefaults(defineProps<{
  tag?: string
  locale?: string
  title?: string
  description?: string
  take?: number
  centered?: boolean
}>(), {
  tag: '',
  locale: '',
  title: 'Nos réalisations',
  description: '',
  take: 4,
  centered: false
})

const headingId = useId()

const { entries } = useEponymeCollection('realisations', {
  orderBy: 'publishedAt',
  order: 'desc',
  take: props.take,
  where: props.locale
    ? { locales: [props.locale] }
    : (props.tag ? { tags: [props.tag] } : undefined)
})

const projects = computed(() => entries.value.map(entry => ({
  name: entry.data.name,
  tags: entry.data.tags,
  description: entry.data.description,
  image: entry.data.image,
  to: `/realisations/${entry.slug}`
})))

const allProjectsLink = computed(() => props.tag
  ? { path: '/realisations', query: { tag: props.tag } }
  : { path: '/realisations' })
</script>

<template>
  <BaseSection
    v-if="projects.length"
    :aria-labelledby="headingId"
    class="flex w-full flex-col gap-9"
  >
    <SectionTitle
      :id="headingId"
      heading="h2"
    >
      <template #title>
        {{ title }}
      </template>
      <template
        v-if="description"
        #description
      >
        {{ description }}
      </template>
    </SectionTitle>

    <ProjectGrid :projects="projects" />

    <div class="flex justify-center">
      <PressButton
        :to="allProjectsLink"
        label="Voir toutes nos réalisations"
      />
    </div>
  </BaseSection>
</template>
