<script setup lang="ts">
interface Project {
  image: string
  imageAlt: string
  to?: string
}

const props = withDefaults(defineProps<{
  items?: Project[]
}>(), {
  items: () => [
    {
      image: '/assets/image/homepage/services/vitrine.png',
      imageAlt: 'Aperçu du site vitrine de l’auto-école RevyFormation',
      to: '/realisation'
    },
    {
      image: '/assets/image/homepage/services/application.png',
      imageAlt: 'Aperçu de l’application web de gestion de réservations TableKit',
      to: '/realisation'
    },
    {
      image: '/assets/image/homepage/services/vitrine.png',
      imageAlt: 'Aperçu du site vitrine de l’auto-école RevyFormation',
      to: '/realisation'
    },
    {
      image: '/assets/image/homepage/services/application.png',
      imageAlt: 'Aperçu de l’application web de gestion de réservations TableKit',
      to: '/realisation'
    }
  ]
})

const NuxtLink = resolveComponent('NuxtLink')

const activeIndex = ref(0)

function onSelect(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <section
    aria-label="Nos réalisations"
    class="relative z-10 flex flex-col items-center overflow-hidden"
  >
    <UCarousel
      v-slot="{ item, index }"
      :items="props.items"
      loop
      align="center"
      :duration="30"
      dots
      class="w-full"
      :ui="{
        viewport: 'py-10',
        item: 'basis-4/5 md:basis-3/5 lg:basis-1/2 px-2 md:px-4',
        controls: 'mt-6 px-4'
      }"
      @select="onSelect"
    >
      <component
        :is="item.to ? NuxtLink : 'div'"
        :to="item.to"
        class="block origin-center transform-gpu transition duration-500 ease-out will-change-transform motion-reduce:transition-none"
        :class="index === activeIndex
          ? 'scale-110 opacity-100 z-10'
          : 'scale-90 translate-y-10 opacity-70'"
      >
        <div class="rounded-3xl border border-black/10 bg-black/5 p-2 backdrop-blur-sm">
          <div class="aspect-video overflow-hidden rounded-2xl bg-black">
            <NuxtImg
              :src="item.image"
              :alt="item.imageAlt"
              width="1280"
              height="720"
              sizes="80vw md:55vw"
              loading="lazy"
              class="size-full object-cover"
            />
          </div>
        </div>
      </component>
    </UCarousel>
  </section>
</template>
