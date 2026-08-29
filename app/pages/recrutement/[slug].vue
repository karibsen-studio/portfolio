<script setup lang="ts">
import BaseSection from '~/components/section/BaseSection.vue'
import SectionTitle from '~/components/section/SectionTitle.vue'
import PressButton from '~/components/ui/PressButton.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import JobSkills from '~/components/ui/job/JobSkills.vue'

definePageMeta({
  key: route => route.fullPath
})

const route = useRoute()
const slug = route.params.slug as string

const { data, error, pending, refresh } = useEponymeCollectionEntry('jobs', slug)

const job = computed(() => data.value?.data)

if (pending.value) await refresh()

if (error.value || !job.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Offre introuvable',
    fatal: true
  })
}

const contractLabels: Record<string, string> = {
  stage: 'Stage',
  alternance: 'Alternance',
  cdi: 'CDI',
  cdd: 'CDD',
  freelance: 'Freelance'
}

const contractLabel = computed(() => contractLabels[job.value?.contract ?? ''] ?? job.value?.contract)

const facts = computed(() => [
  { icon: 'lucide:briefcase', label: contractLabel.value },
  { icon: 'lucide:clock', label: job.value?.duration },
  { icon: 'lucide:map-pin', label: job.value?.location },
  { icon: 'lucide:wifi', label: job.value?.remote ? 'Télétravail possible' : '' }
].filter(fact => fact.label))

const title = () => job.value?.title ? `Karibsen: ${job.value.title}` : 'Karibsen: Offre d’emploi'
const description = () => job.value?.excerpt

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: () => job.value?.excerpt
})
</script>

<template>
  <BaseSection class="relative z-10 flex w-full flex-col gap-9 pt-32 md:pt-48">
    <SectionTitle
      heading="h1"
      size="h2"
    >
      <template #title>
        {{ job?.title }}
      </template>
      <template #description>
        <p class="max-w-2xl leading-relaxed text-foreground-300 md:text-center md:text-lg">
          {{ job?.excerpt }}
        </p>
      </template>
    </SectionTitle>

    <div class="relative z-10 mx-auto w-full max-w-180 border border-border-100 bg-white">
      <dl class="grid gap-px bg-border-100 sm:grid-cols-2">
        <div
          v-for="fact in facts"
          :key="fact.label"
          class="flex items-center gap-3 bg-white px-6 py-5"
        >
          <UIcon
            :name="fact.icon"
            class="size-5 shrink-0 text-theme-500"
            aria-hidden="true"
          />
          <dd class="font-sans font-medium text-foreground-200">
            {{ fact.label }}
          </dd>
        </div>
      </dl>

      <p class="border-t border-border-100 px-6 py-5 font-mono text-sm text-foreground-300">
        Référence {{ job?.reference }}
      </p>

      <CornerHandles />
    </div>

    <JobSkills
      :skills="job?.skills"
      class="mx-auto max-w-180 justify-center"
    />

    <div class="karibsen-prose mx-auto max-w-180">
      <EponymeRichText :html="job?.body" />
    </div>

    <div class="mx-auto mb-20 flex flex-col items-center gap-4">
      <PressButton
        v-if="job?.open"
        :to="job?.applyTo?.href ?? 'mailto:contact@karibsen.fr'"
        :label="`Postuler à l’offre #${job?.reference}`"
        color="primary"
      />
      <div
        v-else
        class="flex flex-col gap-4"
      >
        <p
          class="text-foreground-300"
        >
          Cette offre est pourvue. Vous pouvez toujours nous envoyer une candidature spontanée.
        </p>

        <div class="mx-auto">
          <PressButton to="/recrutement">
            Retour aux offres
          </PressButton>
        </div>
      </div>
    </div>
  </BaseSection>
</template>
