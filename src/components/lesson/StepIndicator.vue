<script setup lang="ts">
import { PhCheck } from '@phosphor-icons/vue'

defineProps<{
  steps: { label: string; done: boolean }[]
  active: number
}>()

const emit = defineEmits<{ select: [index: number] }>()
</script>

<template>
  <ol class="steps" :aria-label="'Langkah'">
    <li v-for="(step, i) in steps" :key="i" class="steps__item">
      <button
        type="button"
        class="steps__pill"
        :class="{ 'is-active': i === active, 'is-done': step.done }"
        :aria-current="i === active ? 'step' : undefined"
        @click="emit('select', i)"
      >
        <span class="steps__dot" aria-hidden="true">
          <PhCheck v-if="step.done && i !== active" :size="13" weight="bold" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="steps__label">{{ step.label }}</span>
      </button>
      <span v-if="i < steps.length - 1" class="steps__line" aria-hidden="true"></span>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  padding: var(--s-2) 0;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.steps::-webkit-scrollbar {
  display: none;
}

.steps__item {
  display: flex;
  align-items: center;
  flex: none;
}

.steps__pill {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: 0.3rem 0.7rem 0.3rem 0.4rem;
  border-radius: var(--r-pill);
  border: 2px solid var(--line-strong);
  background: var(--surface);
  color: var(--ink-faint);
  font-weight: 800;
  font-size: var(--fs-sm);
  white-space: nowrap;
  transition:
    border-color 0.2s var(--ease-soft),
    background-color 0.2s var(--ease-soft),
    color 0.2s var(--ease-soft);
}

.steps__dot {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  font-size: var(--fs-xs);
  font-weight: 800;
  color: inherit;
}

.steps__pill.is-active {
  border-color: var(--primary);
  color: var(--primary-strong);
  background: var(--primary-tint);
}
.steps__pill.is-active .steps__dot {
  background: var(--primary);
  color: #fff;
}

.steps__pill.is-done:not(.is-active) {
  border-color: transparent;
  background: var(--success-soft);
  color: var(--mint-strong);
}
.steps__pill.is-done:not(.is-active) .steps__dot {
  background: var(--success);
  color: #fff;
}

.steps__line {
  width: 18px;
  height: 2px;
  margin-inline: 0.15rem;
  background: var(--line-strong);
}

@media (min-width: 640px) {
  .steps__line {
    width: 34px;
  }
}
</style>
