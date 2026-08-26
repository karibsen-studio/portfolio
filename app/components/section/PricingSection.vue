<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import BaseSection from '~/components/section/BaseSection.vue'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import Heading, { type HeadingSize } from '~/components/ui/heading.vue'
import PressButton from '~/components/ui/PressButton.vue'

export interface PricingPlan {
  title: string
  price: string
  pricePrefix?: string
  priceSuffix?: string
  description: string
  features: string[]
  ctaLabel?: string
  ctaTo?: RouteLocationRaw
  image?: string
  imageAlt?: string
  highlight?: boolean
  badge?: string
}

export interface PricingDetail {
  title: string
  description: string
  icon?: string
}

const props = withDefaults(defineProps<{
  title?: string
  heading?: HeadingSize
  description?: string
  plans?: PricingPlan[]
  plan?: PricingPlan
  note?: string
  details?: PricingDetail[]
}>(), {
  title: 'Un accompagnement adapté à votre projet.',
  heading: 'h2',
  description: '',
  note: '',
  plans: () => [],
  details: () => []
})

const headingId = useId()

const resolvedPlans = computed<PricingPlan[]>(() => (
  props.plans.length ? props.plans : props.plan ? [props.plan] : []
))

const isSplitLayout = computed(() => resolvedPlans.value.length === 1 && props.details.length > 0)

const plansGridClass = computed(() => {
  const count = resolvedPlans.value.length

  if (count >= 3)
    return 'sm:grid-cols-2 sm:divide-x lg:grid-cols-3'

  if (count === 2)
    return 'md:grid-cols-2 md:divide-x md:divide-y-0'

  return ''
})
</script>

<template>
  <BaseSection :aria-labelledby="headingId">
    <SectionTitle
      :id="headingId"
      :heading="heading"
      class="mb-10"
    >
      <template #title>
        {{ title }}
      </template>
      <template
        v-if="description"
        #description
      >
        <div class="max-w-162.5">
          <p class="text-lg leading-relaxed text-theme-950 md:text-center">
            {{ description }}
          </p>
        </div>
      </template>
    </SectionTitle>

    <div
      class="grid gap-6"
      :class="isSplitLayout ? 'lg:grid-cols-[minmax(0,.68fr)_minmax(20rem,1.32fr)] lg:items-start' : ''"
    >
      <div
        class="relative border border-border-100 bg-white"
        :class="resolvedPlans.length === 1 && !isSplitLayout ? 'mx-auto w-full max-w-150' : ''"
      >
        <CornerHandles />

        <ul
          class="grid divide-y divide-border-100"
          :class="plansGridClass"
        >
          <li
            v-for="planItem in resolvedPlans"
            :key="planItem.title"
            class="flex h-full flex-col p-6 sm:p-8"
            :class="planItem.highlight ? 'bg-theme-500/8' : ''"
          >
            <NuxtImg
              v-if="planItem.image"
              :src="planItem.image"
              :alt="planItem.imageAlt || ''"
              width="160"
              height="160"
              class="mb-5 size-14 rounded-full object-cover"
            />

            <p
              v-if="planItem.badge"
              class="mb-3 w-fit rounded-full bg-theme-500 px-3 py-1 text-sm font-medium text-theme-950"
            >
              {{ planItem.badge }}
            </p>

            <Heading
              as="h3"
              class="text-2xl font-sans! font-medium text-black!"
            >
              {{ planItem.title }}
            </Heading>

            <p class="mt-2 max-w-md text-base leading-relaxed text-theme-950">
              {{ planItem.description }}
            </p>

            <div class="mt-6">
              <span
                v-if="planItem.pricePrefix"
                class="block text-sm text-theme-950"
              >{{ planItem.pricePrefix }}</span>
              <p class="font-heading text-3xl tracking-heading text-black sm:text-4xl">
                {{ planItem.price }}
              </p>
              <span
                v-if="planItem.priceSuffix"
                class="text-sm text-theme-950"
              >{{ planItem.priceSuffix }}</span>
            </div>

            <ul class="mt-6 flex flex-col gap-3">
              <li
                v-for="feature in planItem.features"
                :key="feature"
                class="flex items-start gap-3 text-base text-black"
              >
                <UIcon
                  name="heroicons:check-circle-20-solid"
                  aria-hidden="true"
                  class="mt-1 size-5 shrink-0 text-green-500"
                />
                <span>{{ feature }}</span>
              </li>
            </ul>

            <div
              v-if="planItem.ctaLabel"
              class="mt-auto pt-8"
            >
              <PressButton
                :to="planItem.ctaTo"
                :color="planItem.highlight ? 'primary' : 'neutral'"
                :label="planItem.ctaLabel"
              />
            </div>
          </li>
        </ul>
      </div>

      <p
        v-if="note"
        class="mx-auto max-w-2xl text-sm leading-relaxed text-foreground-300 md:text-center"
      >
        {{ note }}
      </p>

      <div
        v-if="details.length"
        class="grid content-center gap-4"
        :class="isSplitLayout ? '' : 'md:grid-cols-2'"
      >
        <article
          v-for="(detail, index) in details"
          :key="detail.title"
          class="relative flex items-center gap-5 border border-border-100 bg-white p-6 sm:p-8"
        >
          <CornerHandles />

          <span
            aria-hidden="true"
            class="flex size-14 shrink-0 items-center justify-center bg-theme-500 font-heading text-2xl tracking-heading text-black"
          >
            <UIcon
              v-if="detail.icon"
              :name="detail.icon"
              class="size-7"
            />
            <template v-else>0{{ index + 1 }}</template>
          </span>

          <div>
            <Heading
              as="h3"
              class="text-2xl font-sans! font-medium text-black!"
            >
              {{ detail.title }}
            </Heading>
            <p class="mt-1 leading-relaxed text-theme-950">
              {{ detail.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </BaseSection>
</template>
