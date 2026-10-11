<script setup lang="ts">
import { PhSpeakerHigh, PhStopCircle } from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import { useSpeech } from '../../composables/useSpeech'

const props = defineProps<{ text: string; label?: string }>()

const { t } = useI18n()
const { supported, speaking, current, toggle } = useSpeech()

function onClick() {
  toggle(props.text)
}
</script>

<template>
  <button
    v-if="supported"
    type="button"
    class="tts"
    :class="{ 'is-speaking': speaking && current === text }"
    :aria-label="label ?? (speaking && current === text ? t('tts.stop') : t('tts.listen'))"
    :title="speaking && current === text ? t('tts.stop') : t('tts.listen')"
    @click="onClick"
  >
    <component :is="speaking && current === text ? PhStopCircle : PhSpeakerHigh" :size="16" weight="fill" aria-hidden="true" />
    <span class="tts__text">{{ speaking && current === text ? t('tts.stop') : t('tts.listen') }}</span>
  </button>
</template>

<style scoped>
.tts {
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  min-height: 36px;
  padding: 0.25rem 0.7rem;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  border: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: var(--fs-xs);
  font-weight: 800;
  transition:
    background-color 0.2s var(--ease-soft),
    color 0.2s var(--ease-soft);
}

.tts:hover {
  background: var(--grape-soft);
  color: var(--grape-strong);
}

.tts.is-speaking {
  background: var(--primary-soft);
  color: var(--primary-strong);
  border-color: transparent;
}

.tts__text {
  white-space: nowrap;
}
</style>
