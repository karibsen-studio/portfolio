<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { motion, useReducedMotion } from 'motion-v'

interface Token {
  text: string
  class?: string
}

const lines: Token[][] = [
  [{ text: '<script setup lang="ts">', class: 'text-foreground-300' }],
  [
    { text: 'const', class: 'text-theme-600' },
    { text: ' { data: projets } = ' },
    { text: 'await', class: 'text-theme-600' },
    { text: ' useFetch(' },
    { text: '\'/api/realisations\'', class: 'text-emerald-600' },
    { text: ')' }
  ],
  [],
  [
    { text: 'const', class: 'text-theme-600' },
    { text: ' categories = computed(() => [' }
  ],
  [
    { text: '  ...' },
    { text: 'new', class: 'text-theme-600' },
    { text: ' Set(projets.value.map(p => p.categorie)),' }
  ],
  [
    { text: '])' }
  ],
  [],
  [
    { text: 'useSeoMeta({' }
  ],
  [
    { text: '  title: ' },
    { text: '\'Nos réalisations : Karibsen\'', class: 'text-emerald-600' },
    { text: ',' }
  ],
  [
    { text: '  description: ' },
    { text: '\'Sites sur mesure, rapides et durables.\'', class: 'text-emerald-600' },
    { text: ',' }
  ],
  [
    { text: '})' }
  ],
  [{ text: '</' + 'script>', class: 'text-foreground-300' }],
  [],
  [{ text: '<template>', class: 'text-foreground-300' }],
  [
    { text: '  <PageHeader ' },
    { text: ':total', class: 'text-theme-600' },
    { text: '=' },
    { text: '"projets.length"', class: 'text-emerald-600' },
    { text: ' />' }
  ],
  [],
  [
    { text: '  <ProjectGrid' }
  ],
  [
    { text: '    :items', class: 'text-theme-600' },
    { text: '=' },
    { text: '"projets"', class: 'text-emerald-600' }
  ],
  [
    { text: '    :filters', class: 'text-theme-600' },
    { text: '=' },
    { text: '"categories"', class: 'text-emerald-600' }
  ],
  [
    { text: '  />' }
  ],
  [{ text: '</template>', class: 'text-foreground-300' }]
]

const VISIBLE_LINES = 7
const LINE_HEIGHT = 24
const CHAR_MS = 26
const LINE_PAUSE_MS = 220
const LOOP_PAUSE_MS = 2200

const shouldReduceMotion = useReducedMotion()

const lineIndex = ref(0)
const charIndex = ref(0)

const timeouts = new Set<ReturnType<typeof setTimeout>>()
let running = false

function wait(ms: number, fn: () => void) {
  const timeout = setTimeout(() => {
    timeouts.delete(timeout)
    fn()
  }, ms)
  timeouts.add(timeout)
}

function lineLength(index: number) {
  return (lines[index] ?? []).reduce((total, token) => total + token.text.length, 0)
}

function step() {
  if (!running) return

  const total = lineLength(lineIndex.value)

  if (charIndex.value < total) {
    charIndex.value++
    wait(CHAR_MS, step)
    return
  }

  if (lineIndex.value < lines.length - 1) {
    wait(LINE_PAUSE_MS, () => {
      lineIndex.value++
      charIndex.value = 0
      step()
    })
    return
  }

  wait(LOOP_PAUSE_MS, () => {
    lineIndex.value = 0
    charIndex.value = 0
    step()
  })
}

function clearAll() {
  for (const timeout of timeouts) clearTimeout(timeout)
  timeouts.clear()
}

onMounted(() => {
  if (shouldReduceMotion.value) {
    lineIndex.value = lines.length - 1
    charIndex.value = lineLength(lines.length - 1)
    return
  }
  running = true
  step()
})

onBeforeUnmount(() => {
  running = false
  clearAll()
})

function typedTokens(index: number): Token[] {
  const line = lines[index] ?? []
  if (index < lineIndex.value) return line

  let remaining = charIndex.value
  const output: Token[] = []

  for (const token of line) {
    if (remaining <= 0) break
    output.push({ ...token, text: token.text.slice(0, remaining) })
    remaining -= token.text.length
  }

  return output
}

const scrollY = computed(() => -Math.max(0, lineIndex.value - (VISIBLE_LINES - 1)) * LINE_HEIGHT)
</script>

<template>
  <div
    class="flex h-52 lg:h-full lg:min-h-52 w-full select-none flex-col overflow-hidden rounded-md border border-border-100 bg-white"
    aria-hidden="true"
  >
    <div class="flex items-center gap-2 border-b border-border-100 px-3 py-2">
      <span class="size-2 rounded-full bg-border-100" />
      <span class="size-2 rounded-full bg-border-100" />
      <span class="size-2 rounded-full bg-theme-200" />
    </div>

    <div
      class="relative min-h-0 flex-1 overflow-hidden px-4 py-3 mask-b-from-80% mask-r-from-88%"
    >
      <motion.div
        :animate="{ y: scrollY }"
        :transition="{ type: 'spring', bounce: 0, visualDuration: 0.35 }"
        :style="{ willChange: 'transform' }"
        class="font-mono text-[13px] leading-6"
      >
        <p
          v-for="(_, index) in lines.slice(0, lineIndex + 1)"
          :key="index"
          class="flex h-6 items-center whitespace-pre text-black"
        >
          <span class="mr-3 w-4 shrink-0 text-right text-[11px] text-foreground-300/60">{{ index + 1 }}</span>
          <span
            v-for="(token, tokenIndex) in typedTokens(index)"
            :key="tokenIndex"
            :class="token.class"
          >{{ token.text }}</span>
          <span
            v-if="index === lineIndex && !shouldReduceMotion"
            class="ml-px inline-block h-4 w-[2px] animate-pulse bg-theme-500"
          />
        </p>
      </motion.div>
    </div>
  </div>
</template>
