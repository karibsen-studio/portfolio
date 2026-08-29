<script setup lang="ts">
import Heading from '~/components/ui/Heading.vue'

withDefaults(defineProps<{
  title?: string
  paragraphs: string[]
  image: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
}>(), {
  title: 'Pourquoi choisir Karibsen ?',
  imagePosition: 'right'
})

const headingId = useId()
</script>

<template>
  <section
    :aria-labelledby="headingId"
    class="relative z-10 px-4 py-20 md:py-28 xl:px-0"
  >
    <div class="mx-auto grid max-w-300 gap-10 md:grid-cols-2 md:items-stretch lg:gap-20">
      <article
        class="flex flex-col gap-8 pl-4"
        :class="imagePosition === 'left' ? 'md:order-2' : 'md:order-1'"
      >
        <Heading
          :id="headingId"
          as="h2"
          class="max-w-4xl text-2xl sm:text-3xl lg:text-4xl"
        >
          {{ title }}
        </Heading>

        <div class="flex max-w-2xl flex-col gap-5 md:text-lg leading-relaxed text-theme-950">
          <p
            v-for="paragraph in paragraphs"
            :key="paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </article>

      <div
        class="relative min-h-100 overflow-hidden rounded-3xl bg-theme-950 md:min-h-175"
        :class="imagePosition === 'left' ? 'md:order-1' : 'md:order-2'"
      >
        <NuxtImg
          :src="image"
          format="webp"
          :alt="imageAlt"
          width="960"
          height="1200"
          sizes="100vw md:50vw"
          loading="lazy"
          class="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  </section>
</template>
