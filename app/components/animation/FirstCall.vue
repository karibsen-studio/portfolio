<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, useInView, useReducedMotion } from 'motion-v'

const root = ref<HTMLElement>()
const shouldReduceMotion = useReducedMotion()

// Rien ne tourne tant que la carte n'est pas à l'écran : les boucles démarrent
// à l'entrée dans le viewport et repartent de zéro à chaque retour.
const inView = useInView(root, { amount: 0.3 })
const playing = computed(() => inView.value && !shouldReduceMotion.value)

// La scène repart de zéro toutes les 30 secondes, comme au chargement de la page :
// tout entre, vit sa vie, s'efface, puis recommence.
const CYCLE = 30
const FADE_OUT = 28.95 / CYCLE
const CLEARED = 29.4 / CYCLE

// Les boucles internes durent 10 et 15 s — des diviseurs de 30, pour que la dérive
// des curseurs et les clics retombent exactement sur le début du cycle suivant.
const DRIFT_BLUE = 10
const DRIFT_RED = 15
const BEAT = 10

// Ressort approché en courbe de Bézier : les keyframes ne prennent pas de spring.
const enterEase = ['linear', [0.22, 1.2, 0.36, 1], 'linear', 'easeIn', 'linear'] as const

function stage(start: number, span = 0.6) {
  return {
    duration: CYCLE,
    times: [0, start / CYCLE, (start + span) / CYCLE, FADE_OUT, CLEARED, 1],
    ease: enterEase,
    repeat: Infinity
  } as const
}

const cardCue = stage(0.15)
const blueCue = stage(0.4, 0.7)
const redCue = stage(0.6, 0.7)

const cardCompose = {
  opacity: [0, 0, 1, 1, 0, 0],
  scale: [0.94, 0.94, 1, 1, 1, 0.94],
  y: [14, 14, 0, 0, 0, 14]
}
const blueCompose = { opacity: [0, 0, 1, 1, 0, 0], x: [-70, -70, 0, 0, 0, -70], y: [-50, -50, 0, 0, 0, -50] }
const redCompose = { opacity: [0, 0, 1, 1, 0, 0], x: [70, 70, 0, 0, 0, 70], y: [56, 56, 0, 0, 0, 56] }

const settled = { opacity: 1, scale: 1, x: 0, y: 0 }
const instant = { duration: 0.3 } as const

// Hors écran, chaque piste revient sur sa première keyframe : le cycle
// recommence donc au début au prochain passage.
const cardRest = { opacity: 0, scale: 0.94, y: 14 }
const blueRest = { opacity: 0, x: -70, y: -50 }
const redRest = { opacity: 0, x: 70, y: 56 }
const driftRest = { x: 0, y: 0 }
const pressRest = { scale: 1 }
const hidden = { opacity: 0 }

// Dérive lente de chaque « joueur » (avatar + curseur), désynchronisée.
const blueDrift = { x: [0, 26, -14, 0], y: [0, -16, 10, 0] }
const redDrift = { x: [0, -22, 16, 0], y: [0, 14, -12, 0] }
const blueDriftTransition = { duration: DRIFT_BLUE, repeat: Infinity, ease: 'easeInOut' } as const
const redDriftTransition = { duration: DRIFT_RED, repeat: Infinity, ease: 'easeInOut' } as const

// Le clic : le curseur s'enfonce, l'anneau de sélection apparaît dans sa couleur.
const press = { scale: [1, 1, 0.86, 1, 1] }
const bluePressTransition = { duration: BEAT, times: [0, 0.2, 0.225, 0.26, 1], repeat: Infinity } as const
const redPressTransition = { duration: BEAT, times: [0, 0.58, 0.605, 0.64, 1], repeat: Infinity } as const

const ring = { opacity: [0, 0, 1, 1, 0, 0] }
const blueRingTransition = { duration: BEAT, times: [0, 0.215, 0.245, 0.4, 0.45, 1], repeat: Infinity } as const
const redRingTransition = { duration: BEAT, times: [0, 0.595, 0.625, 0.78, 0.83, 1], repeat: Infinity } as const
</script>

<template>
  <div
    ref="root"
    class="pointer-events-none size-full select-none"
    aria-hidden="true"
    draggable="false"
  >
    <svg
      class="block size-full"
      fill="none"
      focusable="false"
      viewBox="0 0 1600 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="fc-6"
          width="875"
          height="345"
          x="362.5"
          y="427.5"
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="32.5" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_621_192"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_621_192"
            result="shape"
          />
        </filter>
        <pattern
          id="fc-face-1"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <image
            width="200"
            height="200"
            preserveAspectRatio="none"
            transform="scale(.005)"
            href="/assets/image/services/process/call-avatar-1.png"
          />
        </pattern>
        <pattern
          id="fc-face-2"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <image
            width="1024"
            height="1024"
            preserveAspectRatio="none"
            transform="scale(.00098)"
            href="/assets/image/services/process/call-avatar-2.png"
          />
        </pattern>
        <linearGradient
          id="fc-4"
          x1="800"
          x2="800"
          y1="0"
          y2="1200"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F6F6F6" />
          <stop
            offset="1"
            stop-color="#EEE"
          />
        </linearGradient>
        <clipPath id="fc-5">
          <path
            fill="#fff"
            d="M1067 680h91v91h-91z"
          />
        </clipPath>
      </defs>

      <path
        fill="url(#fc-4)"
        d="M0 0h1600v1200H0z"
      />

      <!-- La carte « Premier appel » -->
      <motion.g
        :initial="{ opacity: 0 }"
        :animate="shouldReduceMotion ? settled : playing ? cardCompose : cardRest"
        :transition="playing ? cardCue : instant"
      >
        <g filter="url(#fc-6)">
          <rect
            width="745"
            height="215"
            x="427.5"
            y="492.5"
            fill="#fff"
            rx="40"
          />
          <rect
            width="744"
            height="214"
            x="428"
            y="493"
            stroke="#222"
            stroke-opacity=".15"
            rx="39.5"
          />
          <path
            fill="#00832D"
            d="m595.6 600 10.52 12 14.16 9.03 2.47-20.96-2.47-20.49-14.43 7.93z"
          />
          <path
            fill="#0066DA"
            d="M534.48 619.09v17.85a7.4 7.4 0 0 0 7.4 7.4h17.91l3.7-13.5-3.7-11.75-12.28-3.7z"
          />
          <path
            fill="#E94235"
            d="m559.79 555.67-25.3 25.24 13.02 3.7 12.28-3.7 3.64-11.59z"
          />
          <path
            fill="#2684FC"
            d="M559.79 580.91h-25.3v38.18h25.3z"
          />
          <path
            fill="#00AC47"
            d="m636.46 566.36-16.18 13.22v41.45l16.25 13.3a3.7 3.7 0 0 0 5.99-2.93v-62.19a3.7 3.7 0 0 0-6.06-2.85M595.59 600v19.09h-35.8v25.24h53.09c4.09 0 7.4-3.3 7.4-7.39v-15.9z"
          />
          <path
            fill="#FFBA00"
            d="M612.88 555.67h-53.09v25.24h35.8V600l24.7-20.4v-16.54a7.4 7.4 0 0 0-7.41-7.4"
          />
          <path
            fill="#000"
            d="M693.61 623.5v-46.54h16.6q5.43 0 9 1.97a13 13 0 0 1 5.33 5.41 16.4 16.4 0 0 1 1.78 7.68q0 4.3-1.8 7.73a13 13 0 0 1-5.36 5.4q-3.57 2-8.98 1.99h-11.4v-5.96h10.76q3.45 0 5.57-1.18a7.4 7.4 0 0 0 3.14-3.27q1-2.07 1-4.7t-1-4.69a7 7 0 0 0-3.16-3.2q-2.13-1.16-5.63-1.16h-8.82v40.52zm40.4 0v-34.9h6.56v5.54h.37a8.4 8.4 0 0 1 3.36-4.43 9.6 9.6 0 0 1 5.5-1.64 28 28 0 0 1 2.89.16v6.5q-.41-.12-1.46-.25-1.05-.15-2.09-.16-2.4 0-4.3 1.02a7.6 7.6 0 0 0-4.04 6.84v21.32zm38.35.7q-5.16 0-8.88-2.2a15 15 0 0 1-5.73-6.25q-2-4.05-2-9.48 0-5.36 2-9.45a15.5 15.5 0 0 1 5.64-6.39 15.6 15.6 0 0 1 8.5-2.3q2.96 0 5.72.98 2.78.98 4.98 3.07a14.4 14.4 0 0 1 3.48 5.43q1.27 3.32 1.27 8.07v2.41H759.6V603h21.1q0-2.68-1.1-4.75a8.3 8.3 0 0 0-7.66-4.5q-2.85 0-5 1.4a9.5 9.5 0 0 0-3.27 3.64 10.5 10.5 0 0 0-1.14 4.85v3.97q0 3.5 1.23 5.96 1.25 2.45 3.48 3.75a10.3 10.3 0 0 0 5.2 1.27q1.93 0 3.53-.55a7.3 7.3 0 0 0 4.52-4.43l6.43 1.16a11.6 11.6 0 0 1-2.77 4.98 13.4 13.4 0 0 1-4.98 3.3 19 19 0 0 1-6.8 1.16m22.52-.7v-34.9h6.52v5.67h.44a9 9 0 0 1 3.56-4.5 10.5 10.5 0 0 1 5.94-1.63q3.5 0 5.86 1.63a9.6 9.6 0 0 1 3.52 4.5h.37a10 10 0 0 1 3.97-4.45 12 12 0 0 1 6.5-1.68q4.75 0 7.75 2.97 3.03 2.98 3.03 8.98v23.41h-6.8v-22.77q0-3.55-1.93-5.14a7 7 0 0 0-4.62-1.59q-3.31 0-5.15 2.04a7.4 7.4 0 0 0-1.85 5.21v22.25h-6.77v-23.2q0-2.85-1.77-4.57a6.3 6.3 0 0 0-4.62-1.73 6.6 6.6 0 0 0-3.56 1.02 7.5 7.5 0 0 0-2.62 2.8 8.6 8.6 0 0 0-.97 4.16v21.52zm56.56 0v-34.9h6.8v34.9zm3.43-40.3q-1.78 0-3.04-1.18a3.8 3.8 0 0 1-1.25-2.86 3.8 3.8 0 0 1 1.25-2.87q1.27-1.2 3.04-1.2 1.79 0 3.03 1.2a3.8 3.8 0 0 1 1.27 2.87q0 1.65-1.27 2.86a4.2 4.2 0 0 1-3.02 1.19m27.56 41q-5.16 0-8.89-2.2a15 15 0 0 1-5.73-6.25q-2-4.05-2-9.48 0-5.36 2-9.45a15.5 15.5 0 0 1 5.64-6.39 15.6 15.6 0 0 1 8.5-2.3q2.96 0 5.73.98t4.97 3.07 3.48 5.43a23 23 0 0 1 1.27 8.07v2.41h-27.75V603h21.1q0-2.68-1.1-4.75a8.3 8.3 0 0 0-7.66-4.5q-2.85 0-5 1.4a9.5 9.5 0 0 0-3.27 3.64 10.5 10.5 0 0 0-1.13 4.85v3.97q0 3.5 1.22 5.96 1.26 2.45 3.48 3.75a10.3 10.3 0 0 0 5.2 1.27q1.95 0 3.53-.55a7.3 7.3 0 0 0 4.52-4.43l6.43 1.16a12 12 0 0 1-2.77 4.98 13.4 13.4 0 0 1-4.98 3.3 19 19 0 0 1-6.8 1.16m22.51-.7v-34.9h6.57v5.54h.37a8.4 8.4 0 0 1 3.36-4.43 9.6 9.6 0 0 1 5.5-1.64 28 28 0 0 1 2.88.16v6.5q-.4-.12-1.45-.25-1.05-.15-2.09-.16-2.4 0-4.3 1.02a7.6 7.6 0 0 0-4.04 6.84v21.32zm51.66.77q-3.31 0-6-1.23a10 10 0 0 1-4.25-3.6 10.4 10.4 0 0 1-1.54-5.8q0-2.96 1.13-4.87a8.4 8.4 0 0 1 3.07-3.02q1.93-1.11 4.32-1.68t4.86-.87l5.1-.59a8 8 0 0 0 2.84-.8q.88-.54.88-1.76v-.16q0-2.98-1.68-4.62-1.65-1.63-4.96-1.63-3.43 0-5.4 1.52-1.95 1.5-2.7 3.34l-6.4-1.46a12 12 0 0 1 3.32-5.13 13.5 13.5 0 0 1 5.07-2.87 20 20 0 0 1 10.46-.4q2.36.47 4.4 1.77a10 10 0 0 1 3.4 3.7q1.3 2.4 1.31 6.2v23.19h-6.64v-4.77h-.27a10 10 0 0 1-1.98 2.59q-1.32 1.27-3.38 2.11-2.07.84-4.96.84m1.48-5.45q2.82 0 4.82-1.12a8 8 0 0 0 3.07-2.9 7.5 7.5 0 0 0 1.06-3.9v-4.5q-.36.37-1.4.7-1.03.29-2.35.51l-4.65.66q-1.98.25-3.62.84-1.61.6-2.59 1.7-.95 1.1-.95 2.92 0 2.52 1.86 3.81a8 8 0 0 0 4.75 1.28m24.8 17.77v-48h6.64v5.66h.57a19 19 0 0 1 1.7-2.52 10 10 0 0 1 3.1-2.5q1.96-1.1 5.22-1.1 4.23 0 7.54 2.14a14.3 14.3 0 0 1 5.21 6.16q1.9 4.02 1.91 9.68 0 5.67-1.89 9.7a14.7 14.7 0 0 1-5.18 6.21 13.4 13.4 0 0 1-7.52 2.16q-3.18 0-5.2-1.07a10 10 0 0 1-3.14-2.5q-1.14-1.43-1.75-2.54h-.41v18.52zm6.66-30.55q0 3.69 1.07 6.46a10 10 0 0 0 3.09 4.34 8 8 0 0 0 4.95 1.55q3.05 0 5.09-1.62a10 10 0 0 0 3.1-4.43 18 18 0 0 0 1.06-6.3q0-3.45-1.04-6.2a9.5 9.5 0 0 0-3.09-4.34 8 8 0 0 0-5.12-1.6q-2.95 0-5 1.53a9.4 9.4 0 0 0-3.06 4.25 18 18 0 0 0-1.05 6.37m32.84 30.55v-48h6.64v5.66h.57q.59-1.1 1.7-2.52a10 10 0 0 1 3.09-2.5q1.98-1.1 5.23-1.1 4.23 0 7.54 2.14a14.3 14.3 0 0 1 5.21 6.16q1.9 4.02 1.91 9.68 0 5.67-1.89 9.7a14.7 14.7 0 0 1-5.18 6.21 13.4 13.4 0 0 1-7.52 2.16q-3.19 0-5.21-1.07a10 10 0 0 1-3.13-2.5 18 18 0 0 1-1.75-2.54h-.41v18.52zm6.66-30.55q0 3.69 1.07 6.46a10 10 0 0 0 3.09 4.34 8 8 0 0 0 4.95 1.55q3.05 0 5.09-1.62a10 10 0 0 0 3.1-4.43 18 18 0 0 0 1.06-6.3q0-3.45-1.04-6.2a9.5 9.5 0 0 0-3.09-4.34 8 8 0 0 0-5.12-1.6q-2.95 0-5 1.53a9.3 9.3 0 0 0-3.06 4.25 18 18 0 0 0-1.05 6.37m47.89 18.17q-5.17 0-8.89-2.21a15 15 0 0 1-5.73-6.25q-2-4.05-2-9.48 0-5.36 2-9.45a15.5 15.5 0 0 1 5.64-6.39 15.6 15.6 0 0 1 8.5-2.3q2.96 0 5.73.98 2.76.98 4.97 3.07 2.2 2.1 3.48 5.43t1.27 8.07v2.41h-27.75V603h21.09a10 10 0 0 0-1.09-4.75 8.2 8.2 0 0 0-7.66-4.5 9 9 0 0 0-5 1.4 9.5 9.5 0 0 0-3.27 3.64 10.5 10.5 0 0 0-1.13 4.85v3.97q0 3.5 1.22 5.96a9 9 0 0 0 3.48 3.75q2.22 1.27 5.2 1.27 1.94 0 3.53-.55a7.4 7.4 0 0 0 4.52-4.43l6.43 1.16a11.6 11.6 0 0 1-2.77 4.98 13.5 13.5 0 0 1-4.98 3.3 19 19 0 0 1-6.79 1.16m29.31-47.25v46.54h-6.8v-46.54z"
          />
        </g>
      </motion.g>

      <!-- Anneaux de sélection, façon multijoueur -->
      <motion.rect
        width="761"
        height="231"
        x="419.5"
        y="484.5"
        fill="none"
        rx="48"
        stroke="#6C67FF"
        stroke-width="3"
        :initial="{ opacity: 0 }"
        :animate="playing ? ring : hidden"
        :transition="playing ? blueRingTransition : instant"
      />
      <motion.rect
        width="761"
        height="231"
        x="419.5"
        y="484.5"
        fill="none"
        rx="48"
        stroke="#FF6767"
        stroke-width="3"
        :initial="{ opacity: 0 }"
        :animate="playing ? ring : hidden"
        :transition="playing ? redRingTransition : instant"
      />

      <!-- Joueur 1 : avatar + curseur bleu -->
      <motion.g
        :initial="{ opacity: 0 }"
        :animate="shouldReduceMotion ? settled : playing ? blueCompose : blueRest"
        :transition="playing ? blueCue : instant"
      >
        <motion.g
          :animate="playing ? blueDrift : driftRest"
          :transition="playing ? blueDriftTransition : instant"
        >
          <circle
            cx="395"
            cy="388"
            r="76"
            fill="url(#fc-face-1)"
          />
          <circle
            cx="395"
            cy="388"
            r="75.5"
            stroke="#222"
            stroke-opacity=".15"
          />
          <motion.g
            :animate="playing ? press : pressRest"
            :transition="playing ? bluePressTransition : instant"
          >
            <path
              fill="#6C67FF"
              fill-rule="evenodd"
              d="M550.29 504.85a9.68 9.68 0 0 0 10.8-13.61v-.02l-.02-.04-.07-.15-.27-.57-1.04-2.17-3.72-7.78-26.48-55.47-1.1-2.31-.3-.65-.1-.19a6.47 6.47 0 0 0-11.58-2.32 6 6 0 0 0-1.05 1.82c-.23.6-.37 1.26-.5 1.88v.03l-4.3 19.27-2.8 12.6-.92 4.11-.01.04-.04.02-3.83 1.86-11.67 5.71q-8.94 4.35-17.82 8.77l-.29.15c-.67.36-1.89 1-2.8 2.13a6.46 6.46 0 0 0 1.05 9.08l.07.06q.6.53 1.3.92 1.2.62 2.54.81l.24.06.73.14 2.56.54 8.7 1.85q25.6 5.46 51.2 10.96l8.37 1.79 2.33.51.63.12.15.05z"
              clip-rule="evenodd"
            />
            <path
              stroke="#222"
              stroke-opacity=".15"
              d="M555.44 504.03c-1.62.58-3.36.7-5.04.33l-.08-.02-.08-.02h-.02l-.03-.01-.62-.12-2.33-.51-8.36-1.79-25.6-5.49-25.6-5.47-8.7-1.85-2.57-.54-.73-.15-.22-.04-.09-.02h-.02a8 8 0 0 1-2.3-.75 8 8 0 0 1-1.22-.86l-.09-.07a6 6 0 0 1-1.14-8.14l.18-.24c.83-1.04 1.95-1.63 2.64-2l.28-.14q8.89-4.43 17.8-8.77l11.68-5.7 3.8-1.87.04-.01.23-.1.06-.23.01-.03v-.03l.93-4.11 2.8-12.6 4.29-19.27v-.05c.15-.63.28-1.24.49-1.8q.34-.9.97-1.68v-.01l.02-.02A5.95 5.95 0 0 1 527.5 422l.01.06.02.05.1.18.3.65 1.1 2.31 26.48 55.48 3.72 7.78 1.03 2.17.28.57.07.14.01.04.01.02.14.3a9.2 9.2 0 0 1-5.34 12.28Z"
            />
          </motion.g>
        </motion.g>
      </motion.g>

      <!-- Joueur 2 : avatar + curseur rouge -->
      <motion.g
        :initial="{ opacity: 0 }"
        :animate="shouldReduceMotion ? settled : playing ? redCompose : redRest"
        :transition="playing ? redCue : instant"
      >
        <motion.g
          :animate="playing ? redDrift : driftRest"
          :transition="playing ? redDriftTransition : instant"
        >
          <circle
            cx="1234"
            cy="821"
            r="76"
            fill="#fff"
          />
          <circle
            cx="1234"
            cy="821"
            r="76"
            fill="url(#fc-face-2)"
          />
          <circle
            cx="1234"
            cy="821"
            r="75.5"
            stroke="#222"
            stroke-opacity=".15"
          />
          <motion.g
            :animate="playing ? press : pressRest"
            :transition="playing ? redPressTransition : instant"
          >
            <g clip-path="url(#fc-5)">
              <path
                fill="#FF6767"
                fill-rule="evenodd"
                d="M1079.82 680.52a9.7 9.7 0 0 0-12.55 6.97 9.7 9.7 0 0 0 .26 5.31l.01.02.01.04.05.16.21.6.78 2.27 2.81 8.16 19.95 58.14.83 2.42.23.68.07.2a6.44 6.44 0 0 0 8.11 5.56c1.21-.33 2.3-1 3.13-1.93q.76-.74 1.26-1.69c.29-.57.5-1.21.71-1.81l.01-.03 6.47-18.65 4.22-12.2 1.39-3.98.01-.03.04-.02 4.01-1.41 12.26-4.34q9.37-3.3 18.7-6.68l.3-.11c.72-.28 2-.77 3.03-1.8a6.6 6.6 0 0 0 1.89-4.57 6.6 6.6 0 0 0-1.89-4.56l-.07-.07q-.54-.6-1.18-1.07a8 8 0 0 0-2.43-1.1h-.01l-.23-.07-.7-.23-2.48-.83-8.44-2.83q-24.81-8.35-49.61-16.75l-8.1-2.73-2.27-.78-.6-.19-.15-.06z"
                clip-rule="evenodd"
              />
              <path
                stroke="#222"
                stroke-opacity=".15"
                d="M1074.61 680.75a9 9 0 0 1 5.03.24l.08.03h.01l.07.03.03.01h.02l.6.2 2.25.77h.01l8.1 2.73 24.8 8.39 24.81 8.36 8.44 2.84 2.48.82h.01l.7.23.22.08.08.02h.02q1.19.33 2.2 1 .6.45 1.11 1l.01.01.07.08a6 6 0 0 1 1.75 4.21 6 6 0 0 1-1.55 4l-.2.22c-.94.94-2.13 1.4-2.85 1.68l-.3.12a2107 2107 0 0 1-18.69 6.67l-12.25 4.34-3.99 1.4-.04.01-.23.07-.1.23-.01.03-.01.02-1.38 3.99-4.23 12.2-6.46 18.65-.01.02-.01.02q-.3.93-.68 1.73-.45.87-1.15 1.56l-.02.01-.01.02a5.95 5.95 0 0 1-9.08-.23 6 6 0 0 1-1.3-3.13v-.05l-.02-.06-.06-.2-.23-.67-.83-2.43-19.96-58.13-2.81-8.16-.78-2.27-.21-.6-.05-.15-.01-.04-.01-.02-.09-.31a9.1 9.1 0 0 1 6.71-11.6Z"
              />
            </g>
          </motion.g>
        </motion.g>
      </motion.g>
    </svg>
  </div>
</template>
