<script setup lang="ts">
import type { JobItem } from '~/types/content'
import PressButton from '~/components/ui/PressButton.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import JobSkills from '~/components/ui/job/JobSkills.vue'

const props = withDefaults(defineProps<{
  jobs?: JobItem[]
}>(), {
  jobs: () => []
})

function getJobBorderClasses(index: number) {
  const jobCount = props.jobs.length
  const hasJobAfter = index < jobCount - 1
  const hasJobToTheRight = index % 2 === 0 && hasJobAfter
  const lastRowStart = jobCount - (jobCount % 2 || 2)
  const hasRowBelow = index < lastRowStart

  return [
    hasJobAfter ? 'border-b' : '',
    hasJobToTheRight ? 'md:border-r' : '',
    hasRowBelow ? 'md:border-b' : 'md:border-b-0'
  ]
}
</script>

<template>
  <div
    v-if="jobs.length"
    class="relative"
  >
    <ul class="grid border border-border-100 md:grid-cols-2">
      <li
        v-for="(job, index) in jobs"
        :key="job.slug"
        class="flex flex-col gap-4 border-border-100 p-5 md:p-10"
        :class="getJobBorderClasses(index)"
      >
        <span class="text-xs font-medium text-foreground-300">
          Offre #{{ job.reference }}
        </span>

        <h2 class="font-sans text-xl font-semibold text-black">
          <NuxtLink
            :to="job.to"
            class="hover:underline"
          >
            {{ job.title }}
          </NuxtLink>
        </h2>

        <p class="text-foreground-200">
          {{ job.excerpt }}
        </p>

        <JobSkills :skills="job.skills" />

        <div class="mt-4">
          <PressButton
            :to="job.to"
            :aria-label="`Consulter l’offre ${job.title}`"
            color="primary"
            label="Consulter l’offre"
          />
        </div>
      </li>
    </ul>

    <CornerHandles />
  </div>

  <p
    v-else
    class="text-center text-foreground-300"
  >
    Aucune offre disponible pour le moment, peut-être bientôt ?
  </p>
</template>
