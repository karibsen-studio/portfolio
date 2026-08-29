<script setup lang="ts">
import PressButton from '~/components/ui/PressButton.vue'
import ProjectGrid from '~/components/ui/project/ProjectGrid.vue'
import type { ProjectItem } from '~/types/content'
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'

withDefaults(defineProps<{
  projects?: ProjectItem[]
}>(), {
  projects: () => []
})

const headingId = useId()
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="flex w-full flex-col gap-9"
  >
    <SectionTitle
      :id="headingId"
      heading="h2"
    >
      <template #title>
        Nos réalisations
      </template>
    </SectionTitle>

    <ProjectGrid :projects="projects" />

    <div class="flex justify-center">
      <PressButton
        to="/realisations"
        label="Voir toutes nos réalisations"
      />
    </div>
  </BaseSection>
</template>
