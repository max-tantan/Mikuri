<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../../i18n'
import { navItems } from '../../nav'

const { t } = useI18n()
const route = useRoute()
const activeKey = computed(() => route.meta.nav as string | undefined)
</script>

<template>
  <nav class="bottomnav" :aria-label="t('app.name')">
    <RouterLink
      v-for="item in navItems"
      :key="item.key"
      :to="item.to"
      class="bottomnav__item"
      :class="{ 'is-active': activeKey === item.key }"
    >
      <span class="bottomnav__icon">
        <component :is="item.icon" :size="24" :weight="activeKey === item.key ? 'fill' : 'bold'" />
      </span>
      <span class="bottomnav__label">{{ t(item.label) }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.bottomnav {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--s-1);
  padding: var(--s-2) var(--s-3) calc(var(--s-2) + env(safe-area-inset-bottom, 0px));
  background: rgba(255, 255, 255, 0.94);
  background: color-mix(in srgb, var(--surface) 92%, transparent);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--line);
}

.bottomnav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 52px;
  padding: var(--s-1);
  border-radius: var(--r-md);
  color: var(--ink-faint);
  font-weight: 700;
  transition:
    color 0.2s var(--ease-soft),
    background-color 0.2s var(--ease-soft);
}

.bottomnav__item:active {
  background: var(--surface-2);
}

.bottomnav__item.is-active {
  color: var(--primary-strong);
  background: var(--primary-tint);
}

.bottomnav__icon {
  display: grid;
  place-items: center;
}

.bottomnav__label {
  font-size: 0.7rem;
  letter-spacing: 0.01em;
}

@media (min-width: 900px) {
  .bottomnav {
    display: none;
  }
}
</style>
