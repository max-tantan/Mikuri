<script setup lang="ts">
export type MascotExpression = 'idle' | 'happy' | 'cheer' | 'think' | 'oops'

withDefaults(
  defineProps<{
    size?: number
    float?: boolean
    decorative?: boolean
    alt?: string
    expression?: MascotExpression
  }>(),
  {
    size: 160,
    float: false,
    decorative: false,
    alt: 'Kuri',
    expression: 'idle',
  },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 240 240"
    :class="['kuri', `kuri--${expression}`, { 'kuri--float': float }]"
    :role="decorative ? undefined : 'img'"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : alt"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M186 198 q44 -8 36 -48 q-4 -26 -28 -25"
      fill="none"
      stroke="#f6ae7c"
      stroke-width="20"
      stroke-linecap="round"
    />
    <ellipse cx="120" cy="196" rx="72" ry="46" fill="#ffc79e" />
    <ellipse cx="120" cy="206" rx="42" ry="30" fill="#fff1e2" />
    <ellipse cx="88" cy="228" rx="22" ry="14" fill="#fff1e2" />
    <ellipse cx="152" cy="228" rx="22" ry="14" fill="#fff1e2" />

    <path d="M62 68 L46 6 L112 40 Z" fill="#ffc79e" />
    <path d="M178 68 L194 6 L128 40 Z" fill="#ffc79e" />
    <path d="M69 60 L59 22 L100 41 Z" fill="#ff9e86" />
    <path d="M171 60 L181 22 L140 41 Z" fill="#ff9e86" />

    <circle cx="120" cy="108" r="78" fill="#ffc79e" />
    <ellipse cx="120" cy="138" rx="35" ry="24" fill="#fff1e2" />

    <!-- Eyes -->
    <g v-if="expression === 'happy' || expression === 'cheer'" fill="none" stroke="#2b2a3d" stroke-width="6" stroke-linecap="round">
      <path d="M82 110 q12 -16 24 0" />
      <path d="M134 110 q12 -16 24 0" />
    </g>
    <g v-else-if="expression === 'oops'">
      <circle cx="94" cy="104" r="16" fill="#2b2a3d" />
      <circle cx="146" cy="104" r="16" fill="#2b2a3d" />
      <circle cx="99" cy="99" r="5" fill="#ffffff" />
      <circle cx="151" cy="99" r="5" fill="#ffffff" />
    </g>
    <g v-else>
      <circle cx="94" cy="104" r="14" fill="#2b2a3d" />
      <circle cx="146" cy="104" r="14" fill="#2b2a3d" />
      <circle cx="99" cy="99" r="5" fill="#ffffff" />
      <circle cx="151" cy="99" r="5" fill="#ffffff" />
      <circle cx="90" cy="110" r="2.4" fill="#ffffff" opacity="0.7" />
      <circle cx="142" cy="110" r="2.4" fill="#ffffff" opacity="0.7" />
    </g>

    <!-- Nose -->
    <path d="M120 126 l-8 6 h16 z" fill="#ff7a66" />

    <!-- Mouth -->
    <path
      v-if="expression === 'idle'"
      d="M120 134 v6 M120 140 q-9 8 -16 0 M120 140 q9 8 16 0"
      fill="none"
      stroke="#2b2a3d"
      stroke-width="3"
      stroke-linecap="round"
    />
    <ellipse v-else-if="expression === 'cheer'" cx="120" cy="142" rx="12" ry="10" fill="#8a3a44" />
    <circle v-else-if="expression === 'think'" cx="120" cy="140" r="6" fill="#8a3a44" />
    <path
      v-else-if="expression === 'oops'"
      d="M104 144 q16 -14 32 0"
      fill="none"
      stroke="#2b2a3d"
      stroke-width="3.5"
      stroke-linecap="round"
    />
    <path
      v-else
      d="M104 134 q16 16 32 0"
      fill="none"
      stroke="#2b2a3d"
      stroke-width="3.5"
      stroke-linecap="round"
    />

    <!-- Blush -->
    <ellipse
      cx="76"
      cy="130"
      rx="12"
      ry="7"
      fill="#ff8fa3"
      :opacity="expression === 'happy' || expression === 'cheer' ? 0.7 : 0.5"
    />
    <ellipse
      cx="164"
      cy="130"
      rx="12"
      ry="7"
      fill="#ff8fa3"
      :opacity="expression === 'happy' || expression === 'cheer' ? 0.7 : 0.5"
    />

    <path
      d="M70 128 h-22 M72 138 l-22 6 M170 128 h22 M168 138 l22 6"
      stroke="#e7a87c"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M108 62 q6 -10 12 0 M120 57 q6 -10 12 0"
      stroke="#f6ae7c"
      stroke-width="5"
      stroke-linecap="round"
      fill="none"
    />
  </svg>
</template>

<style scoped>
.kuri {
  display: block;
  height: auto;
  transform-origin: 50% 82%;
}

.kuri--float {
  animation: kuri-float 4.5s var(--ease-soft) infinite;
}

.kuri--cheer {
  animation: kuri-cheer 1.1s var(--ease-pop) infinite;
}

.kuri--happy {
  animation: kuri-pop 0.5s var(--ease-pop) 1;
}

.kuri--think {
  animation: kuri-tilt 3.2s var(--ease-soft) infinite;
}

.kuri--oops {
  animation: kuri-shake 0.5s var(--ease-soft) 1;
}

@keyframes kuri-float {
  0%,
  100% {
    transform: translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateY(-10px) rotate(1deg);
  }
}

@keyframes kuri-cheer {
  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-14px) rotate(2deg);
  }
}

@keyframes kuri-pop {
  0% {
    transform: scale(0.92);
  }
  60% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes kuri-tilt {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-4deg);
  }
}

@keyframes kuri-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
</style>
