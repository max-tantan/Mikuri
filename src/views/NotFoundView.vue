<script setup lang="ts">
import AppButton from '../components/ui/AppButton.vue'
import Mascot from '../components/brand/Mascot.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <section class="missing shell">
    <div class="missing__art">
      <div class="missing__blob">
        <Mascot :size="160" expression="oops" float :alt="t('home.hero.mascotAlt')" />
      </div>
    </div>
    <span class="eyebrow">404</span>
    <h1>{{ t('common.notFound') }}</h1>
    <p class="lead">Waduh, halaman yang kamu cari nggak ada. Yuk balik ke beranda bareng Kuri!</p>
    <AppButton to="/" variant="primary" size="lg">{{ t('common.backHome') }}</AppButton>
  </section>
</template>

<style scoped>
.missing {
  min-height: 70dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--s-4);
  padding-block: var(--s-14);
}

.missing__art {
  margin-bottom: var(--s-2);
}

.missing__blob {
  display: grid;
  place-items: center;
  width: 188px;
  height: 188px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, #fff, var(--surface-2));
  box-shadow: var(--shadow-lg), inset 0 0 0 8px rgba(255, 255, 255, 0.6);
  animation: float 4s ease-in-out infinite;
}

.missing .lead {
  max-width: 38ch;
  color: var(--ink-soft);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
