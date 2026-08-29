<script setup lang="ts">
import type { ComparisonAction, ComparisonColumn, ComparisonRow } from '~/types/comparison'
import CornerHandles from '~/components/ui/CornerHandles.vue'
import PressButton from '~/components/ui/PressButton.vue'

withDefaults(defineProps<{
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  /** Titre de la première colonne. */
  featureLabel?: string
  /** Légende lue par les lecteurs d'écran. */
  caption?: string
  /** Bouton affiché sous le tableau. */
  action?: ComparisonAction
  /** Libellé du sélecteur de colonne affiché sur mobile. */
  switchLabel?: string
}>(), {
  featureLabel: 'Critère',
  caption: undefined,
  action: undefined,
  switchLabel: 'Choisir la colonne à afficher'
})

/** Sur mobile une seule colonne est visible à la fois, sur desktop elles le sont toutes. */
const activeColumn = ref(0)

const columnVisibility = (index: number) =>
  index === activeColumn.value ? 'table-cell' : 'hidden md:table-cell'
</script>

<template>
  <div class="flex w-full flex-col items-center gap-8">
    <div
      class="flex w-full gap-px border border-border-100 bg-border-100 md:hidden"
      role="group"
      :aria-label="switchLabel"
    >
      <button
        v-for="(column, index) in columns"
        :key="column.label"
        type="button"
        class="flex-1 cursor-pointer bg-white px-4 py-3 font-sans text-sm font-medium transition-colors"
        :class="index === activeColumn ? 'text-theme-500' : 'text-foreground-300'"
        :aria-pressed="index === activeColumn"
        @click="activeColumn = index"
      >
        {{ column.label }}
      </button>
    </div>

    <div class="relative z-10 w-full">
      <div class="w-full overflow-x-auto border border-border-100">
        <table class="w-full border-collapse text-left">
          <caption
            v-if="caption"
            class="sr-only"
          >
            {{ caption }}
          </caption>

          <thead>
            <tr>
              <th
                scope="col"
                class="min-w-40 bg-white p-6 align-bottom font-sans text-sm font-medium text-foreground-300"
              >
                {{ featureLabel }}
              </th>
              <th
                v-for="(column, index) in columns"
                :key="column.label"
                scope="col"
                class="min-w-44 border-l border-border-100 bg-white p-6 align-bottom"
                :class="columnVisibility(index)"
              >
                <NuxtImg
                  v-if="column.image"
                  :src="column.image"
                  format="webp"
                  :alt="column.imageAlt ?? ''"
                  width="36"
                  height="42"
                  class="mb-2 h-auto w-8"
                  loading="lazy"
                  draggable="false"
                />
                <UIcon
                  v-else-if="column.icon"
                  :name="column.icon"
                  class="mb-2 size-6 text-foreground-300"
                />
                <span class="block font-sans text-lg font-medium text-foreground-200">
                  {{ column.label }}
                </span>
                <span
                  v-if="column.note"
                  class="mt-1 block text-sm font-medium text-foreground-300"
                >
                  {{ column.note }}
                </span>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="row in rows"
              :key="row.label"
              class="border-t border-border-100"
            >
              <th
                scope="row"
                class="min-w-40 bg-white p-6 align-top font-sans font-medium text-foreground-200"
              >
                {{ row.label }}
                <span
                  v-if="row.description"
                  class="mt-1 block text-sm font-normal text-foreground-300"
                >
                  {{ row.description }}
                </span>
              </th>
              <td
                v-for="(column, index) in columns"
                :key="column.label"
                class="min-w-44 border-l border-border-100 bg-white p-6 align-top text-foreground-100/80"
                :class="columnVisibility(index)"
              >
                <template v-if="typeof row.values[index] === 'boolean'">
                  <UIcon
                    :name="row.values[index] ? 'lucide:check' : 'lucide:x'"
                    class="size-5"
                    :class="row.values[index] ? 'text-theme-500' : 'text-foreground-300/60'"
                  />
                  <span class="sr-only">{{ row.values[index] ? 'Oui' : 'Non' }}</span>
                </template>
                <template v-else>
                  {{ row.values[index] ?? '—' }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <CornerHandles />
    </div>

    <PressButton
      v-if="action"
      :to="action.to"
      :label="action.label"
      :color="action.color ?? 'primary'"
    />
  </div>
</template>
