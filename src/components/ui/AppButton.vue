<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'soft' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    to?: RouteLocationRaw
    href?: string
    type?: 'button' | 'submit'
    block?: boolean
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    to: undefined,
    href: undefined,
    type: 'button',
    block: false,
    disabled: false,
  },
)

const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  { 'btn--block': props.block, 'btn--disabled': props.disabled },
])

const component = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const bindings = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href, target: '_blank', rel: 'noopener' }
  return { type: props.type, disabled: props.disabled }
})
</script>

<template>
  <component :is="component" :class="classes" v-bind="bindings">
    <slot name="icon-left" />
    <span class="btn__label"><slot /></span>
    <slot name="icon-right" />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  border-radius: var(--r-pill);
  border: 2px solid transparent;
  text-align: center;
  transition:
    transform 0.16s var(--ease-pop),
    background-color 0.2s var(--ease-soft),
    box-shadow 0.2s var(--ease-soft),
    border-color 0.2s var(--ease-soft);
}

.btn :deep(svg) {
  flex: none;
}

.btn--sm {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  min-height: 40px;
}
.btn--md {
  font-size: 1rem;
  padding: 0.68rem 1.4rem;
  min-height: 48px;
}
.btn--lg {
  font-size: 1.1rem;
  padding: 0.85rem 1.8rem;
  min-height: 56px;
}

.btn--block {
  width: 100%;
}

/* --- Variants --- */
.btn--primary {
  background: var(--primary);
  color: #ffffff;
  box-shadow: 0 8px 18px -8px rgba(226, 72, 47, 0.6);
}
.btn--primary:hover {
  background: var(--primary-strong);
}
.btn--primary:active {
  transform: translateY(1px) scale(0.99);
}

.btn--soft {
  background: var(--primary-soft);
  color: var(--primary-strong);
}
.btn--soft:hover {
  background: #ffd5cb;
}
.btn--soft:active {
  transform: translateY(1px) scale(0.99);
}

.btn--outline {
  background: var(--surface);
  color: var(--ink);
  border-color: var(--line-strong);
}
.btn--outline:hover {
  border-color: var(--primary);
  color: var(--primary-strong);
}
.btn--outline:active {
  transform: translateY(1px) scale(0.99);
}

.btn--ghost {
  background: transparent;
  color: var(--ink-soft);
}
.btn--ghost:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.btn--disabled {
  opacity: 0.55;
  pointer-events: none;
}
</style>
