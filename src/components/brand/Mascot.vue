<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
    float?: boolean
    decorative?: boolean
    alt?: string
  }>(),
  {
    size: 160,
    float: false,
    decorative: false,
    alt: 'Kuri',
  },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 240 240"
    :class="['kuri', { 'kuri--float': float }]"
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

    <circle cx="94" cy="104" r="14" fill="#2b2a3d" />
    <circle cx="146" cy="104" r="14" fill="#2b2a3d" />
    <circle cx="99" cy="99" r="5" fill="#ffffff" />
    <circle cx="151" cy="99" r="5" fill="#ffffff" />
    <circle cx="90" cy="110" r="2.4" fill="#ffffff" opacity="0.7" />
    <circle cx="142" cy="110" r="2.4" fill="#ffffff" opacity="0.7" />

    <path d="M120 126 l-8 6 h16 z" fill="#ff7a66" />
    <path
      d="M120 134 v6 M120 140 q-9 8 -16 0 M120 140 q9 8 16 0"
      fill="none"
      stroke="#2b2a3d"
      stroke-width="3"
      stroke-linecap="round"
    />

    <ellipse cx="76" cy="130" rx="12" ry="7" fill="#ff8fa3" opacity="0.5" />
    <ellipse cx="164" cy="130" rx="12" ry="7" fill="#ff8fa3" opacity="0.5" />

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
}

.kuri--float {
  animation: kuri-float 4.5s var(--ease-soft) infinite;
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
</style>
