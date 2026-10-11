<script setup lang="ts">
withDefaults(
  defineProps<{
    lines?: number
    height?: string
  }>(),
  {
    lines: 3,
    height: '',
  },
)
</script>

<template>
  <div class="skeleton" role="status" aria-busy="true" aria-live="polite">
    <span class="sr-only">Memuat…</span>
    <template v-if="height">
      <span class="skeleton__block" :style="{ height }"></span>
    </template>
    <template v-else>
      <span v-for="n in lines" :key="n" class="skeleton__line" :style="{ width: n === lines ? '62%' : '100%' }"></span>
    </template>
  </div>
</template>

<style scoped>
.skeleton {
  display: grid;
  gap: var(--s-3);
  width: 100%;
}

.skeleton__line,
.skeleton__block {
  display: block;
  border-radius: var(--r-sm);
  background: linear-gradient(90deg, var(--surface-2) 25%, var(--line) 37%, var(--surface-2) 63%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}

.skeleton__line {
  height: 14px;
}

.skeleton__block {
  border-radius: var(--r-lg);
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
