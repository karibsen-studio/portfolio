<script setup lang="ts">
/** Tag courant, chaîne vide pour « tout ». Filtrage local : rien ne part en URL. */
const active = defineModel<string>({ default: '' })

const props = withDefaults(defineProps<{
  /** Déjà dédoublonnés et triés par la page — voir `sortTags()`. */
  tags: string[]
  /** Nomme le groupe de boutons pour les lecteurs d’écran. */
  label: string
  allLabel?: string
}>(), {
  allLabel: 'Tous'
})

/**
 * Les tags viennent du contenu : dépublier une entrée peut faire disparaître celui qui
 * est sélectionné, et la liste filtrée se viderait sans que rien ne l’explique.
 */
watch(() => props.tags, (list) => {
  if (active.value && !list.includes(active.value)) active.value = ''
})

const chipClasses = 'inline-flex cursor-pointer border px-4 py-2 font-sans text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600'
const activeClasses = 'border-black bg-black text-white'
const idleClasses = 'border-border-100 bg-white text-black hover:border-black/30'
</script>

<template>
  <div
    v-if="tags.length"
    class="flex flex-wrap justify-center gap-2"
    role="group"
    :aria-label="label"
  >
    <button
      type="button"
      :aria-pressed="!active"
      :class="[chipClasses, active ? idleClasses : activeClasses]"
      @click="active = ''"
    >
      {{ allLabel }}
    </button>

    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      :aria-pressed="active === tag"
      :class="[chipClasses, active === tag ? activeClasses : idleClasses]"
      @click="active = tag"
    >
      {{ tag }}
    </button>
  </div>
</template>
