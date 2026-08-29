<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion, useInView, useReducedMotion } from 'motion-v'

const root = ref<HTMLElement>()
const shouldReduceMotion = useReducedMotion()

// Rien ne tourne tant que la carte n'est pas à l'écran : les boucles démarrent
// à l'entrée dans le viewport et repartent de zéro à chaque retour.
const inView = useInView(root, { amount: 0.3 })
const playing = computed(() => inView.value && !shouldReduceMotion.value)

const blockRest = { opacity: 0, y: 14 }
const blockShown = { opacity: 1, y: 0 }
const instant = { duration: 0.3 } as const

const blockEnter = { type: 'spring', bounce: 0, visualDuration: 0.5 } as const

// Le balayage du skeleton : une bande claire traverse les blocs en boucle.
const shimmer = { x: [0, 2800] }
const shimmerTransition = {
  duration: 1.9,
  repeat: Infinity,
  repeatDelay: 0.5,
  ease: 'linear',
  delay: 0.7
} as const
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
          id="sk-2"
          width="1610"
          height="1270"
          x="-5"
          y="-5"
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
            result="effect1_dropShadow_613_239"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_613_239"
            result="shape"
          />
        </filter>
        <linearGradient
          id="sk-0"
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
        <clipPath id="sk-1">
          <path
            fill="#fff"
            d="M0 0h1600v1200H0z"
          />
        </clipPath>
        <linearGradient
          id="sk-shimmer"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
        >
          <stop
            stop-color="#fff"
            stop-opacity="0"
          />
          <stop
            offset=".5"
            stop-color="#fff"
            stop-opacity=".85"
          />
          <stop
            offset="1"
            stop-color="#fff"
            stop-opacity="0"
          />
        </linearGradient>
        <mask id="sk-mask">
          <path
            fill="#fff"
            d="M479 164h642v98H479z"
          />
          <path
            fill="#fff"
            d="M323 288h955v98H323z"
          />
          <rect
            width="351"
            height="77"
            x="625"
            y="487"
            fill="#fff"
            rx="38.5"
          />
          <path
            fill="#fff"
            d="M160 748.8c0-21.27 0-31.9 3.94-40.12a40 40 0 0 1 18.75-18.74c8.2-3.94 18.84-3.94 40.11-3.94h1154.4c21.27 0 31.91 0 40.11 3.94a40 40 0 0 1 18.75 18.74c3.94 8.21 3.94 18.85 3.94 40.12V1277H160z"
          />
        </mask>
      </defs>

      <g clip-path="url(#sk-1)">
        <path
          fill="url(#sk-0)"
          d="M0 0h1600v1200H0z"
        />

        <g filter="url(#sk-2)">
          <path
            fill="#fff"
            d="M60 146.4c0-30.24 0-45.36 5.89-56.92a54 54 0 0 1 23.6-23.6C101.03 60 116.15 60 146.4 60h1307.2c30.24 0 45.36 0 56.92 5.89a54 54 0 0 1 23.59 23.6c5.89 11.55 5.89 26.67 5.89 56.91V1200H60z"
          />
          <path
            stroke="#222"
            stroke-opacity=".15"
            d="M146.4 60.5h1307.2c15.13 0 26.45 0 35.43.73 8.97.74 15.56 2.2 21.26 5.1a53.5 53.5 0 0 1 23.38 23.38c2.9 5.7 4.36 12.29 5.1 21.26s.73 20.3.73 35.43v1053.1H60.5V146.4c0-15.13 0-26.45.73-35.43.74-8.97 2.2-15.56 5.1-21.26a53.5 53.5 0 0 1 23.38-23.38c5.7-2.9 12.29-4.36 21.26-5.1 7.86-.64 17.5-.72 29.93-.73z"
          />
        </g>

        <motion.g
          :initial="blockRest"
          :animate="shouldReduceMotion || playing ? blockShown : blockRest"
          :transition="playing ? { ...blockEnter, delay: 0.12 } : instant"
        >
          <path
            fill="#F3F3F3"
            d="M479 164h642v98H479z"
          />
        </motion.g>
        <motion.g
          :initial="blockRest"
          :animate="shouldReduceMotion || playing ? blockShown : blockRest"
          :transition="playing ? { ...blockEnter, delay: 0.24 } : instant"
        >
          <path
            fill="#F3F3F3"
            d="M323 288h955v98H323z"
          />
        </motion.g>
        <motion.g
          :initial="blockRest"
          :animate="shouldReduceMotion || playing ? blockShown : blockRest"
          :transition="playing ? { ...blockEnter, delay: 0.36 } : instant"
        >
          <rect
            width="351"
            height="77"
            x="625"
            y="487"
            fill="#D9D9D9"
            rx="38.5"
          />
        </motion.g>
        <motion.g
          :initial="blockRest"
          :animate="shouldReduceMotion || playing ? blockShown : blockRest"
          :transition="playing ? { ...blockEnter, delay: 0.48 } : instant"
        >
          <path
            fill="#EAEAEA"
            d="M160 748.8c0-21.27 0-31.9 3.94-40.12a40 40 0 0 1 18.75-18.74c8.2-3.94 18.84-3.94 40.11-3.94h1154.4c21.27 0 31.91 0 40.11 3.94a40 40 0 0 1 18.75 18.74c3.94 8.21 3.94 18.85 3.94 40.12V1277H160z"
          />
        </motion.g>

        <!-- Balayage -->
        <g
          v-if="playing"
          mask="url(#sk-mask)"
        >
          <g transform="skewX(-14)">
            <motion.rect
              width="420"
              height="1600"
              x="-900"
              y="-200"
              fill="url(#sk-shimmer)"
              :animate="shimmer"
              :transition="shimmerTransition"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
