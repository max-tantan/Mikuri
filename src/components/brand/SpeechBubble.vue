<script setup lang="ts">
import Mascot, { type MascotExpression } from './Mascot.vue'

withDefaults(
  defineProps<{
    text: string
    expression?: MascotExpression
    tone?: 'info' | 'praise' | 'oops'
    size?: number
  }>(),
  {
    expression: 'idle',
    tone: 'info',
    size: 76,
  },
)
</script>

<template>
  <div class="bubble-row" :class="`is-${tone}`" role="status" aria-live="polite">
    <div class="bubble-row__kuri">
      <Mascot :size="size" decorative :expression="expression" />
    </div>
    <p class="bubble-row__text">{{ text }}</p>
  </div>
</template>

<style scoped>
.bubble-row {
  display: flex;
  align-items: center;
  gap: var(--s-3);
}

.bubble-row__kuri {
  flex: none;
  width: 76px;
  display: grid;
  place-items: center;
}

.bubble-row__text {
  position: relative;
  flex: 1;
  padding: var(--s-3) var(--s-4);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 2px solid var(--line-strong);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.4;
}

.bubble-row__text::before {
  content: '';
  position: absolute;
  left: -9px;
  top: 50%;
  width: 16px;
  height: 16px;
  background: inherit;
  border-left: 2px solid var(--line-strong);
  border-bottom: 2px solid var(--line-strong);
  transform: translateY(-50%) rotate(45deg);
}

.bubble-row.is-praise .bubble-row__text {
  background: var(--success-soft);
  border-color: transparent;
  color: var(--mint-strong);
}
.bubble-row.is-praise .bubble-row__text::before {
  border-color: transparent;
}

.bubble-row.is-oops .bubble-row__text {
  background: var(--warn-soft);
  border-color: transparent;
  color: var(--sunny-strong);
}
.bubble-row.is-oops .bubble-row__text::before {
  border-color: transparent;
}
</style>
