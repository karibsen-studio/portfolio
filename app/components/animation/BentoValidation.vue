<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'

type ValidationStatus = 'pending' | 'approved' | 'rejected'

interface ValidationItem {
  label: string
  approved: boolean
}

interface ValidationNotification extends ValidationItem {
  id: number
  status: ValidationStatus
}

const items: ValidationItem[] = [
  { label: 'Maquette de la page d\'accueil', approved: true },
  { label: 'Identité visuelle', approved: false },
  { label: 'Arborescence du site', approved: true },
  { label: 'Palette de couleurs', approved: true },
  { label: 'Choix typographique', approved: false },
  { label: 'Maquette de la page contact', approved: true },
  { label: 'Wireframes mobile', approved: true },
  { label: 'Grille tarifaire', approved: false },
  { label: 'Design system', approved: true },
  { label: 'Iconographie', approved: false },
  { label: 'Animation du header', approved: true },
  { label: 'Formulaire de devis', approved: true },
  { label: 'Page à propos', approved: true },
  { label: 'Photos de l\'équipe', approved: false },
  { label: 'Version responsive', approved: true },
  { label: 'Fiche réalisation', approved: true }
]

const MAX_VISIBLE = 3
const PENDING_MS = 1300
const INTERVAL_MS = 2600

const shouldReduceMotion = useReducedMotion()
const notifications = ref<ValidationNotification[]>([])

let nextId = 0
let cursor = 0
let interval: ReturnType<typeof setInterval> | undefined
const timeouts = new Set<ReturnType<typeof setTimeout>>()

function nextItem(): ValidationItem {
  const item = items[cursor % items.length]!
  cursor++
  return item
}

function resolveStatus(item: ValidationItem): ValidationStatus {
  return item.approved ? 'approved' : 'rejected'
}

function pushNotification() {
  const item = nextItem()
  const id = nextId++

  notifications.value = [
    { ...item, id, status: 'pending' as const },
    ...notifications.value
  ].slice(0, MAX_VISIBLE)

  const timeout = setTimeout(() => {
    timeouts.delete(timeout)
    const target = notifications.value.find(notification => notification.id === id)
    if (target) target.status = resolveStatus(item)
  }, PENDING_MS)

  timeouts.add(timeout)
}

function startCycle() {
  if (!interval) interval = setInterval(pushNotification, INTERVAL_MS)
}

function stopCycle() {
  if (interval) clearInterval(interval)
  interval = undefined
}

function handleVisibilityChange() {
  if (document.hidden) stopCycle()
  else startCycle()
}

onMounted(() => {
  const seed: ValidationNotification[] = []
  for (let i = 0; i < MAX_VISIBLE - 1; i++) {
    const item = nextItem()
    seed.unshift({ ...item, id: nextId++, status: resolveStatus(item) })
  }
  notifications.value = seed

  pushNotification()
  startCycle()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  stopCycle()
  for (const timeout of timeouts) clearTimeout(timeout)
  timeouts.clear()
})

const stackTransition = { type: 'spring', bounce: 0.24, visualDuration: 0.45 } as const
const swapTransition = { type: 'spring', bounce: 0, visualDuration: 0.4 } as const
const iconTransition = { type: 'spring', bounce: 0.2, visualDuration: 0.4 } as const
const badgeTransition = { type: 'spring', bounce: 0, visualDuration: 0.45 } as const

const statusStyles: Record<ValidationStatus, string> = {
  pending: 'bg-border-100 text-foreground-300',
  approved: 'bg-emerald-50 text-emerald-600',
  rejected: 'bg-theme-50 text-theme-600'
}

const statusIcons: Record<ValidationStatus, string> = {
  pending: 'lucide:loader-circle',
  approved: 'lucide:check',
  rejected: 'lucide:rotate-ccw'
}

const statusLabels: Record<ValidationStatus, string> = {
  pending: 'En cours',
  approved: 'Validé',
  rejected: 'Retours'
}

const statusDetails: Record<ValidationStatus, string> = {
  pending: 'En attente de validation',
  approved: 'Validé par le client',
  rejected: 'Retours à intégrer'
}
</script>

<template>
  <div
    class="relative w-full select-none overflow-hidden mask-[linear-gradient(to_bottom,black_65%,transparent_100%)]"
    aria-hidden="true"
  >
    <div class="flex flex-col gap-2 pt-3">
      <AnimatePresence
        :initial="false"
        mode="popLayout"
      >
        <motion.div
          v-for="(notification, index) in notifications"
          :key="notification.id"
          :layout="!shouldReduceMotion"
          :initial="shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.96 }"
          :animate="shouldReduceMotion
            ? { opacity: index === 0 ? 1 : 0.6 }
            : { opacity: 1 - index * 0.22, y: 0, scale: 1 - index * 0.025 }"
          :exit="shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.94 }"
          :transition="stackTransition"
          :style="{ willChange: 'transform, opacity', transformOrigin: 'center top' }"
          class="relative overflow-hidden rounded-md border border-border-100 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500"
              :class="statusStyles[notification.status]"
            >
              <AnimatePresence
                :initial="false"
                mode="popLayout"
              >
                <motion.span
                  :key="notification.status"
                  :initial="{ opacity: 0, scale: 0.6 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :exit="{ opacity: 0, scale: 0.8 }"
                  :transition="iconTransition"
                  class="flex items-center justify-center"
                >
                  <UIcon
                    class="size-4"
                    :class="notification.status === 'pending' && !shouldReduceMotion ? 'animate-spin' : ''"
                    :name="statusIcons[notification.status]"
                  />
                </motion.span>
              </AnimatePresence>
            </span>

            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold text-black">
                {{ notification.label }}
              </p>
              <AnimatePresence
                :initial="false"
                mode="popLayout"
              >
                <motion.p
                  :key="notification.status"
                  :initial="{ opacity: 0, y: 6 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :exit="{ opacity: 0, y: -6 }"
                  :transition="swapTransition"
                  class="truncate text-xs text-foreground-300"
                >
                  {{ statusDetails[notification.status] }}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.span
              :layout="!shouldReduceMotion"
              :transition="badgeTransition"
              :style="{ willChange: 'transform' }"
              class="shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors duration-500"
              :class="statusStyles[notification.status]"
            >
              <AnimatePresence
                :initial="false"
                mode="popLayout"
              >
                <motion.span
                  :key="notification.status"
                  :layout="!shouldReduceMotion"
                  :initial="{ opacity: 0, y: 6 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :exit="{ opacity: 0, y: -6 }"
                  :transition="swapTransition"
                  class="block whitespace-nowrap"
                >
                  {{ statusLabels[notification.status] }}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
</template>
