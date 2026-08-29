<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, useId, watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
import { motion, useReducedMotion } from 'motion-v'

withDefaults(defineProps<{
  position?: 'fixed' | 'static'
}>(), {
  position: 'fixed'
})

interface Corner {
  x: number
  y: number
}

const MAX_X = 48
const MAX_Y = 72

const shouldReduceMotion = useReducedMotion()
const route = useRoute()

const menuLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Blog', to: '/blog' },
  { label: 'Parlons ensemble', to: '/demarrer-un-projet' }
]

const menuDialog = ref<HTMLDialogElement | null>(null)
const menuButton = ref<HTMLButtonElement | null>(null)
const isMenuOpen = ref(false)
const isPanelShown = ref(false)
const menuPanelId = useId()
const scrollLockTarget = computed(() => import.meta.client ? document.body : null)
const isScrollLocked = useScrollLock(scrollLockTarget)

let closeMenuTimer: ReturnType<typeof setTimeout> | undefined

function finishClosingMenu(restoreFocus: boolean) {
  menuDialog.value?.close()
  isScrollLocked.value = false
  closeMenuTimer = undefined

  if (restoreFocus) menuButton.value?.focus()
}

async function openMenu() {
  if (closeMenuTimer) {
    clearTimeout(closeMenuTimer)
    closeMenuTimer = undefined
  }

  if (!menuDialog.value?.open) menuDialog.value?.showModal()

  isMenuOpen.value = true
  isScrollLocked.value = true

  if (shouldReduceMotion.value) {
    isPanelShown.value = true
    return
  }

  await nextTick()

  // Le dialog vient de passer de display:none à display:block. Sans lecture
  // forçant le reflow, l'état fermé (translate-x-full) n'est jamais calculé et
  // la transition ne joue pas : le panneau apparaîtrait déjà en place.
  void menuDialog.value?.offsetWidth

  if (isMenuOpen.value) isPanelShown.value = true
}

function closeMenu(restoreFocus = true) {
  if (!isMenuOpen.value) return

  isMenuOpen.value = false
  isPanelShown.value = false

  if (closeMenuTimer) clearTimeout(closeMenuTimer)
  closeMenuTimer = setTimeout(
    () => finishClosingMenu(restoreFocus),
    shouldReduceMotion.value ? 0 : 450
  )
}

function toggleMenu() {
  if (isMenuOpen.value) closeMenu()
  else openMenu()
}

function handleDialogClose() {
  isMenuOpen.value = false
  isPanelShown.value = false
  isScrollLocked.value = false
}

function getLinkTransition(index: number) {
  if (shouldReduceMotion.value) return { duration: 0.12 }

  return {
    type: 'spring',
    bounce: 0,
    visualDuration: 0.4,
    delay: isPanelShown.value ? 0.12 + index * 0.065 : 0
  } as const
}

watch(() => route.fullPath, () => closeMenu(false))

const box = ref<HTMLElement | null>(null)
const width = ref(0)
const height = ref(0)
const ready = computed(() => width.value > 0 && height.value > 0)

const left = reactive<Corner>({ x: 0, y: 0 })
const right = reactive<Corner>({ x: 0, y: 0 })
const dragging = ref<'left' | 'right' | null>(null)

let observer: ResizeObserver | undefined

function measure() {
  if (!box.value) return
  width.value = box.value.offsetWidth
  height.value = box.value.offsetHeight
}

onMounted(() => {
  if (!box.value) return
  measure()
  observer = new ResizeObserver(measure)
  observer.observe(box.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  releaseSprings()
  if (closeMenuTimer) clearTimeout(closeMenuTimer)
  isScrollLocked.value = false
})

function rubber(delta: number, max: number) {
  return Math.sign(delta) * max * (1 - Math.exp(-Math.abs(delta) / max))
}

const springs = new Set<{ stop: () => void }>()

function releaseSprings() {
  for (const spring of springs) spring.stop()
  springs.clear()
}

const STIFFNESS = 220
const DAMPING = 15

function springBack(corner: Corner) {
  let velocityX = 0
  let velocityY = 0
  let last = performance.now()
  let frame = 0
  let stopped = false

  function step(now: number) {
    const delta = Math.min((now - last) / 1000, 1 / 30)
    last = now

    velocityX += (-STIFFNESS * corner.x - DAMPING * velocityX) * delta
    velocityY += (-STIFFNESS * corner.y - DAMPING * velocityY) * delta
    corner.x += velocityX * delta
    corner.y += velocityY * delta

    const settled = Math.abs(corner.x) < 0.05 && Math.abs(velocityX) < 0.05
      && Math.abs(corner.y) < 0.05 && Math.abs(velocityY) < 0.05

    if (settled) {
      corner.x = 0
      corner.y = 0
      return
    }

    if (!stopped) frame = requestAnimationFrame(step)
  }

  frame = requestAnimationFrame(step)
  springs.add({
    stop: () => {
      stopped = true
      cancelAnimationFrame(frame)
    }
  })
}

function startDrag(corner: Corner, side: 'left' | 'right', event: PointerEvent) {
  if (shouldReduceMotion.value) return

  releaseSprings()

  const originX = event.clientX - corner.x
  const originY = event.clientY - corner.y

  dragging.value = side

  function onMove(moveEvent: PointerEvent) {
    corner.x = rubber(moveEvent.clientX - originX, MAX_X)
    corner.y = rubber(moveEvent.clientY - originY, MAX_Y)
  }

  function onEnd() {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerup', onEnd)
    window.removeEventListener('pointercancel', onEnd)
    dragging.value = null
    springBack(corner)
  }

  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onEnd)
  window.addEventListener('pointercancel', onEnd)
}

const path = computed(() => {
  const w = width.value
  const h = height.value
  if (!w || !h) return ''

  const blX = left.x
  const blY = h + left.y
  const brX = w + right.x
  const brY = h + right.y

  const sag = Math.max(left.y, right.y, 0) * 0.3
  const c1X = brX + (blX - brX) * 0.33
  const c1Y = brY + (blY - brY) * 0.33 + sag
  const c2X = brX + (blX - brX) * 0.66
  const c2Y = brY + (blY - brY) * 0.66 + sag

  const rightCtrlX = w + right.x * 0.2
  const leftCtrlX = left.x * 0.2

  return [
    `M0 0`,
    `H${w}`,
    `Q${rightCtrlX} ${h * 0.55} ${brX} ${brY}`,
    `C${c2X} ${c2Y} ${c1X} ${c1Y} ${blX} ${blY}`,
    `Q${leftCtrlX} ${h * 0.55} 0 0`,
    'Z'
  ].join(' ')
})

const tension = computed(() => {
  const pull = Math.max(
    Math.abs(left.x) / MAX_X,
    Math.abs(left.y) / MAX_Y,
    Math.abs(right.x) / MAX_X,
    Math.abs(right.y) / MAX_Y
  )
  return Math.min(1, pull)
})

const strokeStyle = computed(() => ({
  stroke: `color-mix(in oklab, var(--color-theme-500) ${Math.round(tension.value * 100)}%, var(--color-border-100))`,
  strokeWidth: 1 + tension.value * 1.2
}))

const contentShift = computed(() => ({
  transform: `translate(${(left.x + right.x) * 0.06}px, ${(left.y + right.y) * 0.07}px)`
}))

const menuPanelTransition = { type: 'spring', bounce: 0, visualDuration: 0.46 } as const
const menuBackdropTransition = { duration: 0.25, ease: 'easeOut' } as const
</script>

<template>
  <div>
    <nav
      aria-label="Principale"
      :class="position === 'fixed' ? 'fixed lg:top-10 z-1000 left-0 w-full' : 'relative z-1000 w-full'"
    >
      <div
        ref="box"
        class="relative h-17.5 max-w-6xl w-full mx-auto bg-white flex items-center justify-between px-4 md:px-6"
        :class="ready ? '' : 'border border-border-100'"
      >
        <svg
          v-if="ready"
          class="pointer-events-none absolute inset-0 overflow-visible"
          :width="width"
          :height="height"
          :viewBox="`0 0 ${width} ${height}`"
          fill="none"
          aria-hidden="true"
        >
          <path
            :d="path"
            fill="white"
            :stroke="strokeStyle.stroke"
            :stroke-width="strokeStyle.strokeWidth"
            stroke-linejoin="round"
          />
        </svg>

        <div
          class="relative z-10 flex w-full items-center justify-between"
          :style="contentShift"
        >
          <NuxtLink
            to="/"
            aria-label="Karibsen, accueil"
            class="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-theme-600"
          >
            <NuxtImg
              width="36"
              height="42"
              class="h-auto w-9"
              src="/assets/image/logo.svg"
              alt=""
            />
          </NuxtLink>

          <button
            ref="menuButton"
            type="button"
            aria-label="Menu"
            :aria-expanded="isMenuOpen"
            :aria-controls="menuPanelId"
            class="relative flex size-12 cursor-pointer items-center justify-center bg-white text-black outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-theme-500 focus-visible:ring-offset-2"
            @click="toggleMenu"
          >
            <motion.span
              aria-hidden="true"
              class="absolute h-0.5 w-8 rounded-full bg-current [transform:translateY(-4px)]"
              :initial="false"
              :animate="{ y: isMenuOpen ? 0 : -4, rotate: isMenuOpen ? 45 : 0 }"
              :transition="menuPanelTransition"
            />
            <motion.span
              aria-hidden="true"
              class="absolute h-0.5 w-8 rounded-full bg-current [transform:translateY(4px)]"
              :initial="false"
              :animate="{ y: isMenuOpen ? 0 : 4, rotate: isMenuOpen ? -45 : 0 }"
              :transition="menuPanelTransition"
            />
          </button>
        </div>

        <div
          class="pointer-events-none absolute inset-0 z-20 select-none"
          aria-hidden="true"
        >
          <div class="absolute -left-1.75 -top-1.75 size-3.5 rounded-[3px] border border-border-100 bg-white" />
          <div class="absolute -right-1.75 -top-1.75 size-3.5 rounded-[3px] border border-border-100 bg-white" />

          <div
            class="pointer-events-auto absolute -bottom-1.75 -left-1.75 size-3.5 touch-none rounded-[3px] border bg-white transition-colors duration-200"
            :class="dragging === 'left' ? 'cursor-grabbing border-theme-500' : 'cursor-grab border-border-100 hover:border-theme-300'"
            :style="{ transform: `translate(${left.x}px, ${left.y}px)` }"
            @pointerdown="startDrag(left, 'left', $event)"
          />

          <div
            class="pointer-events-auto absolute -bottom-1.75 -right-1.75 size-3.5 touch-none rounded-[3px] border bg-white transition-colors duration-200"
            :class="dragging === 'right' ? 'cursor-grabbing border-theme-500' : 'cursor-grab border-border-100 hover:border-theme-300'"
            :style="{ transform: `translate(${right.x}px, ${right.y}px)` }"
            @pointerdown="startDrag(right, 'right', $event)"
          />
        </div>
      </div>
    </nav>

    <dialog
      :id="menuPanelId"
      ref="menuDialog"
      aria-label="Menu principal"
      class="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-transparent"
      @cancel.prevent="closeMenu()"
      @click.self="closeMenu()"
      @close="handleDialogClose"
    >
      <motion.div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-black/20"
        :initial="false"
        :animate="{ opacity: isPanelShown ? 1 : 0 }"
        :transition="menuBackdropTransition"
      />

      <aside
        :id="`${menuPanelId}-content`"
        class="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-border-100 bg-white px-6 py-6 transition-[transform,opacity] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-[transform,opacity] motion-reduce:translate-x-0 motion-reduce:transition-opacity sm:px-10 sm:py-9"
        :class="isPanelShown ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'"
        @click.stop
      >
        <div class="flex items-center justify-between">
          <p class="font-medium text-foreground-300">
            Navigation
          </p>

          <button
            type="button"
            aria-label="Fermer le menu"
            class="relative flex size-12 cursor-pointer items-center justify-center bg-white text-black outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-theme-500 focus-visible:ring-offset-2"
            @click="closeMenu()"
          >
            <span
              aria-hidden="true"
              class="absolute h-0.5 w-8 rotate-45 rounded-full bg-current"
            />
            <span
              aria-hidden="true"
              class="absolute h-0.5 w-8 -rotate-45 rounded-full bg-current"
            />
          </button>
        </div>

        <nav
          aria-label="Menu"
          class="my-auto"
        >
          <ul class="flex flex-col gap-3">
            <motion.li
              v-for="(link, index) in menuLinks"
              :key="link.to"
              :initial="false"
              :animate="shouldReduceMotion
                ? { opacity: isPanelShown ? 1 : 0 }
                : { opacity: isPanelShown ? 1 : 0, y: isPanelShown ? 0 : 24 }"
              :transition="getLinkTransition(index)"
            >
              <NuxtLink
                :to="link.to"
                class="group flex items-center justify-between gap-4 rounded-sm py-2 font-sans text-4xl leading-none text-black outline-none transition-colors hover:text-theme-600 focus-visible:text-theme-600 focus-visible:ring-4 focus-visible:ring-theme-500 focus-visible:ring-offset-4 sm:text-6xl"
                @click="closeMenu(false)"
              >
                <span>{{ link.label }}</span>
                <UIcon
                  name="lucide:arrow-up-right"
                  aria-hidden="true"
                  class="size-7 shrink-0 transition-transform duration-300 group-hover:rotate-45 sm:size-9"
                />
              </NuxtLink>
            </motion.li>
          </ul>
        </nav>
      </aside>
    </dialog>
  </div>
</template>
