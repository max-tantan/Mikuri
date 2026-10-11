<script setup lang="ts">
import { PhTranslate } from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'

const { lang, t, toggleLang } = useI18n()
</script>

<template>
  <button
    type="button"
    class="lang"
    :aria-label="t('lang.switch')"
    :title="t('lang.switch')"
    @click="toggleLang"
  >
    <PhTranslate :size="18" weight="bold" aria-hidden="true" />
    <span class="lang__value">{{ lang === 'id' ? 'ID' : 'EN' }}</span>
  </button>
</template>

<style scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  min-height: 40px;
  padding: 0.35rem 0.7rem;
  border-radius: var(--r-pill);
  border: 2px solid var(--line-strong);
  background: var(--surface);
  color: var(--ink);
  font-weight: 800;
  font-size: var(--fs-sm);
  transition:
    border-color 0.2s var(--ease-soft),
    transform 0.16s var(--ease-pop);
}

.lang:hover {
  border-color: var(--grape);
  color: var(--grape-strong);
}

.lang:active {
  transform: scale(0.96);
}

.lang__value {
  font-family: var(--font-display);
  letter-spacing: 0.04em;
}
</style>
