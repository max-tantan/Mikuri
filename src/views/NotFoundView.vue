<script setup lang="ts">
import AppButton from '../components/ui/AppButton.vue'
import Mascot from '../components/brand/Mascot.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <section class="missing shell">
    <Mascot :size="180" float :alt="t('home.hero.mascotAlt')" />
    <h1>{{ t('common.notFound') }}</h1>
    <p class="lead">{{ t('about.lead') }}</p>
    <AppButton to="/" variant="primary" size="lg">{{ t('common.backHome') }}</AppButton>
  </section>
</template>

<style scoped>
.missing {
  min-height: 60dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--s-5);
  padding-block: var(--s-16);
}

.missing .lead {
  max-width: 40ch;
}
</style>
