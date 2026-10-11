<script setup lang="ts">
withDefaults(
  defineProps<{
    value: number
    color?: 'primary' | 'coral' | 'mint' | 'sky' | 'sunny' | 'grape'
    label?: string
  }>(),
  {
    color: 'primary',
    label: undefined,
  },
)
</script>

<template>
  <div class="pbar" role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100">
    <div class="pbar__track">
      <div
        class="pbar__fill"
        :class="`pbar__fill--${color}`"
        :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
      ></div>
    </div>
    <span v-if="label" class="pbar__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.pbar {
  display: flex;
  align-items: center;
  gap: var(--s-3);
}

.pbar__track {
  flex: 1;
  height: 12px;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  border: 1px solid var(--line);
  overflow: hidden;
}

.pbar__fill {
  height: 100%;
  border-radius: var(--r-pill);
  transition: width 0.5s var(--ease-soft);
}

.pbar__fill--primary {
  background: linear-gradient(90deg, #ff9a80, var(--primary));
}
.pbar__fill--coral {
  background: linear-gradient(90deg, #ff9a80, var(--primary));
}
.pbar__fill--mint {
  background: linear-gradient(90deg, #59e0bd, var(--mint));
}
.pbar__fill--sky {
  background: linear-gradient(90deg, #7bb6f6, var(--sky));
}
.pbar__fill--sunny {
  background: linear-gradient(90deg, #fbc766, var(--sunny));
}
.pbar__fill--grape {
  background: linear-gradient(90deg, #b6a1f7, var(--grape));
}

.pbar__label {
  font-size: var(--fs-sm);
  font-weight: 800;
  color: var(--ink-soft);
  min-width: 2.5ch;
  text-align: right;
}
</style>
