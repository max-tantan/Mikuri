<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PhArrowRight, PhGear, PhStar } from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import { navItems } from '../../nav'
import { useRewards } from '../../composables/useRewards'
import { useAuth } from '../../composables/useAuth'
import Mascot from '../brand/Mascot.vue'
import AppButton from '../ui/AppButton.vue'
import LanguageToggle from '../ui/LanguageToggle.vue'
import SettingsSheet from './SettingsSheet.vue'

const { t } = useI18n()
const route = useRoute()
const { stars } = useRewards()
const { user } = useAuth()
const activeKey = computed(() => route.meta.nav as string | undefined)
const brandTag = computed(() =>
  user.value ? t('auth.greeting', { name: user.value.name }) : t('app.tagline'),
)
const settingsOpen = ref(false)
</script>

<template>
  <header class="topnav">
    <div class="topnav__inner shell">
      <RouterLink to="/" class="brand" :aria-label="t('app.name')">
        <Mascot :size="40" decorative />
        <span class="brand__text">
          <span class="brand__name">{{ t('app.name') }}</span>
          <span class="brand__tag">{{ brandTag }}</span>
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
        <RouterLink to="/koleksi" class="stars" :aria-label="t('nav.collection')">
          <PhStar :size="15" weight="fill" aria-hidden="true" />
          <span>{{ stars }}</span>
        </RouterLink>
        <LanguageToggle />
        <button
          type="button"
          class="gear"
          :aria-label="t('nav.settings')"
          :aria-expanded="settingsOpen"
          @click="settingsOpen = true"
        >
          <PhGear :size="20" weight="bold" aria-hidden="true" />
        </button>
        <AppButton to="/belajar" variant="primary" size="sm" class="topnav__cta">
          {{ t('nav.cta') }}
          <template #icon-right>
            <PhArrowRight :size="16" weight="bold" aria-hidden="true" />
          </template>
        </AppButton>
      </div>
    </div>

    <SettingsSheet :open="settingsOpen" @close="settingsOpen = false" />
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

.stars {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  min-height: 40px;
  padding: 0 0.7rem;
  border-radius: var(--r-pill);
  background: var(--sunny-soft);
  color: var(--sunny-strong);
  font-weight: 800;
  font-size: var(--fs-sm);
  transition: transform 0.16s var(--ease-pop);
}

.stars:hover {
  transform: translateY(-1px);
}

.gear {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  color: var(--ink-soft);
  transition:
    background-color 0.2s var(--ease-soft),
    color 0.2s var(--ease-soft);
}

.gear:hover {
  background: var(--primary-soft);
  color: var(--primary-strong);
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
