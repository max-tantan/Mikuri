<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PhArrowRight } from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import { navItems } from '../../nav'
import Mascot from '../brand/Mascot.vue'
import AppButton from '../ui/AppButton.vue'
import LanguageToggle from '../ui/LanguageToggle.vue'

const { t } = useI18n()
const route = useRoute()
const activeKey = computed(() => route.meta.nav as string | undefined)
</script>

<template>
  <header class="topnav">
    <div class="topnav__inner shell">
      <RouterLink to="/" class="brand" :aria-label="t('app.name')">
        <Mascot :size="40" decorative />
        <span class="brand__text">
          <span class="brand__name">{{ t('app.name') }}</span>
          <span class="brand__tag">{{ t('app.tagline') }}</span>
        </span>
      </RouterLink>

      <nav class="topnav__links" :aria-label="t('app.name')">
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="topnav__link"
          :class="{ 'is-active': activeKey === item.key }"
        >
          {{ t(item.label) }}
        </RouterLink>
      </nav>

      <div class="topnav__actions">
        <LanguageToggle />
        <AppButton to="/belajar" variant="primary" size="sm" class="topnav__cta">
          {{ t('nav.cta') }}
          <template #icon-right>
            <PhArrowRight :size="16" weight="bold" aria-hidden="true" />
          </template>
        </AppButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topnav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 251, 245, 0.9);
  background: color-mix(in srgb, var(--cloud) 88%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.topnav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  min-height: 68px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-width: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brand__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--ink);
}

.brand__tag {
  font-size: 0.72rem;
  color: var(--ink-faint);
  font-weight: 600;
  display: none;
}

.topnav__links {
  display: none;
  align-items: center;
  gap: var(--s-1);
}

.topnav__link {
  padding: 0.5rem 0.9rem;
  border-radius: var(--r-pill);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ink-soft);
  transition:
    background-color 0.2s var(--ease-soft),
    color 0.2s var(--ease-soft);
}

.topnav__link:hover {
  background: var(--surface-2);
  color: var(--ink);
}

.topnav__link.is-active {
  background: var(--primary-tint);
  color: var(--primary-strong);
}

.topnav__actions {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.topnav__cta {
  display: none;
}

@media (min-width: 900px) {
  .brand__tag {
    display: block;
  }
  .topnav__links {
    display: flex;
  }
  .topnav__cta {
    display: inline-flex;
  }
}

@media (max-width: 380px) {
  .brand__text {
    display: none;
  }
}
</style>
