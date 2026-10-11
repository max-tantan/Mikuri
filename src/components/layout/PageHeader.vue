<script setup lang="ts">
import { computed, type Component } from 'vue'
import { PhArrowLeft } from '@phosphor-icons/vue'
import type { TrackColor } from '../../data/tracks'
import { trackVars } from '../../trackTheme'

interface Crumb {
  label: string
  to: string
}

const props = withDefaults(
  defineProps<{
    title: string
    eyebrow?: string
    lead?: string
    icon?: Component
    tone?: TrackColor
    crumbs?: Crumb[]
  }>(),
  {
    eyebrow: undefined,
    lead: undefined,
    icon: undefined,
    tone: 'coral',
    crumbs: undefined,
  },
)

const toneVars = computed(() => trackVars(props.tone))
</script>

<template>
  <header class="page-head" :style="toneVars">
    <nav v-if="crumbs && crumbs.length" class="page-head__crumbs">
      <RouterLink v-for="crumb in crumbs" :key="crumb.to" :to="crumb.to" class="page-head__crumb">
        <PhArrowLeft :size="15" weight="bold" aria-hidden="true" />
        {{ crumb.label }}
      </RouterLink>
    </nav>

    <div class="page-head__main">
      <span v-if="icon" class="page-head__icon" aria-hidden="true">
        <component :is="icon" :size="30" weight="fill" />
      </span>

      <div class="page-head__copy">
        <span v-if="eyebrow" class="page-head__eyebrow">{{ eyebrow }}</span>
        <h1 class="page-head__title">{{ title }}</h1>
        <p v-if="lead" class="page-head__lead">{{ lead }}</p>
        <div v-if="$slots.default" class="page-head__extra"><slot /></div>
      </div>

      <div v-if="$slots.aside" class="page-head__aside"><slot name="aside" /></div>
    </div>
  </header>
</template>

<style scoped>
.page-head {
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: linear-gradient(140deg, var(--track-soft), var(--surface) 68%);
  padding: var(--s-6);
  margin-bottom: var(--s-8);
}

.page-head__crumbs {
  margin-bottom: var(--s-4);
}

.page-head__crumb {
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  min-height: 36px;
  font-weight: 800;
  font-size: var(--fs-sm);
  color: var(--ink-soft);
  transition: color 0.18s var(--ease-soft), transform 0.18s var(--ease-soft);
}

.page-head__crumb:hover {
  color: var(--track-strong);
  transform: translateX(-2px);
}

.page-head__main {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
}

.page-head__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: var(--r-md);
  background: var(--track);
  color: #fff;
  box-shadow: 0 10px 22px -10px var(--track);
}

.page-head__copy {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  min-width: 0;
}

.page-head__eyebrow {
  align-self: flex-start;
  padding: 0.3rem 0.78rem;
  border-radius: var(--r-pill);
  background: var(--track-soft);
  color: var(--track-strong);
  font-size: var(--fs-xs);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.page-head__title {
  font-size: var(--fs-h2);
}

.page-head__lead {
  font-size: var(--fs-lead);
  color: var(--ink-soft);
  max-width: 62ch;
}

.page-head__extra {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

@media (min-width: 760px) {
  .page-head {
    padding: var(--s-8);
  }

  .page-head__main {
    flex-direction: row;
    align-items: center;
    gap: var(--s-5);
  }

  .page-head__copy {
    flex: 1;
  }

  .page-head__aside {
    flex: none;
    min-width: 220px;
  }
}
</style>
