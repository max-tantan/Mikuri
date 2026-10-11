<script setup lang="ts">
withDefaults(
  defineProps<{
    accent?: 'none' | 'mint' | 'sky' | 'sunny' | 'grape' | 'coral'
    interactive?: boolean
  }>(),
  {
    accent: 'none',
    interactive: false,
  },
)
</script>

<template>
  <div class="card" :class="[`card--${accent}`, { 'card--interactive': interactive }]">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  padding: var(--s-6);
  box-shadow: var(--shadow-sm);
}

.card--interactive {
  transition:
    transform 0.22s var(--ease-soft),
    box-shadow 0.22s var(--ease-soft),
    border-color 0.22s var(--ease-soft);
}

.card--interactive:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card--mint {
  border-color: transparent;
  box-shadow: 0 0 0 2px var(--mint-soft), var(--shadow-sm);
}
.card--sky {
  border-color: transparent;
  box-shadow: 0 0 0 2px var(--sky-soft), var(--shadow-sm);
}
.card--sunny {
  border-color: transparent;
  box-shadow: 0 0 0 2px var(--sunny-soft), var(--shadow-sm);
}
.card--grape {
  border-color: transparent;
  box-shadow: 0 0 0 2px var(--grape-soft), var(--shadow-sm);
}
.card--coral {
  border-color: transparent;
  box-shadow: 0 0 0 2px var(--primary-soft), var(--shadow-sm);
}
</style>
