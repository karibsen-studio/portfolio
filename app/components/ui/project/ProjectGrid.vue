<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import Project from '~/components/ui/project/Project.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'

export interface ProjectItem {
  name: string
  tags: string[]
  description: string
  image: string
  to: RouteLocationRaw
}

const props = withDefaults(defineProps<{
  projects?: ProjectItem[]
}>(), {
  projects: () => []
})

function getProjectBorderClasses(index: number) {
  const projectCount = props.projects.length
  const hasProjectAfter = index < projectCount - 1
  const hasProjectToTheRight = index % 2 === 0 && hasProjectAfter
  const lastRowStart = projectCount - (projectCount % 2 || 2)
  const hasRowBelow = index < lastRowStart

  return [
    hasProjectAfter ? 'border-b' : '',
    hasProjectToTheRight ? 'md:border-r' : '',
    hasRowBelow ? 'md:border-b' : 'md:border-b-0'
  ]
}
</script>

<template>
  <div
    class="relative"
    :class="projects.length === 1 ? 'mx-auto w-full max-w-150' : ''"
  >
    <ul
      class="border border-border-100"
      :class="projects.length > 1 ? 'grid md:grid-cols-4' : ''"
    >
      <li
        v-for="(project, index) in projects"
        :key="project.name"
        class="border-border-100 w-full"
        :class="[
          getProjectBorderClasses(index),
          projects.length > 1 ? 'md:col-span-2' : '',
          projects.length % 2 === 1 && index === projects.length - 1 ? 'md:col-start-2' : ''
        ]"
      >
        <Project v-bind="project" />
      </li>
    </ul>

    <CornerHandles />
  </div>
</template>
