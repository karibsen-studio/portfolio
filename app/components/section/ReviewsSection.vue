<script setup lang="ts">
import Heading from '~/components/ui/heading.vue'
import Review from '~/components/ui/review/Review.vue'
import BaseSection from '~/components/section/BaseSection.vue'

const headingId = useId()

const { entries } = useEponymeCollection('reviews')

const reviews = computed(() => entries.value.map(entry => ({
  slug: entry.slug,
  content: entry.data.content,
  reviewer: {
    avatarURL: entry.data.avatar,
    name: entry.data.name,
    position: entry.data.position
  }
})))
</script>

<template>
  <BaseSection
    :aria-labelledby="headingId"
    class="flex w-full flex-col gap-9 px-4 md:px-8"
  >
    <div class="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
      <Heading
        :id="headingId"
        as="h2"
        class="text-4xl sm:text-5xl lg:text-6xl"
      >
        Ce que disent nos clients
      </Heading>

      <p class="max-w-2xl text-lg text-theme-950">
        Des collaborations basées sur l’écoute, la confiance et des résultats concrets.
      </p>
    </div>

    <ul class="grid gap-5 md:grid-cols-3">
      <li
        v-for="review in reviews"
        :key="review.slug"
        class="h-full"
      >
        <Review
          :content="review.content"
          :reviewer="review.reviewer"
        />
      </li>
    </ul>
  </BaseSection>
</template>
