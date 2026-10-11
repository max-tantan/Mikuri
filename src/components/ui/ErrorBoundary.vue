<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import { PhArrowClockwise } from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import Mascot from '../brand/Mascot.vue'
import AppButton from './AppButton.vue'

const { t } = useI18n()
const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err as Error
  return false
})

function retry() {
  error.value = null
  if (typeof window !== 'undefined') window.location.reload()
}
</script>

<template>
  <div v-if="error" class="errbox section shell" role="alert">
    <Mascot :size="132" expression="oops" decorative />
    <h1>{{ t('error.title') }}</h1>
    <p class="lead">{{ t('error.body') }}</p>
    <AppButton variant="primary" @click="retry">
      <template #icon-left>
        <PhArrowClockwise :size="18" weight="bold" aria-hidden="true" />
      </template>
      {{ t('error.retry') }}
    </AppButton>
  </div>
  <slot v-else />
</template>

<style scoped>
.errbox {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: var(--s-4);
  max-width: 44ch;
}

.errbox h1 {
  font-size: var(--fs-h2);
}
</style>
