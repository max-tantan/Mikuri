<script setup lang="ts">
import { useI18n } from '../../i18n'
import { navItems } from '../../nav'
import Mascot from '../brand/Mascot.vue'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner shell">
      <div class="footer__brand">
        <Mascot :size="56" float :alt="t('footer.mascotAlt')" />
        <div>
          <p class="footer__name">{{ t('app.name') }}</p>
          <p class="footer__tagline">{{ t('footer.tagline') }}</p>
        </div>
      </div>

      <nav class="footer__nav" :aria-label="t('footer.explore')">
        <p class="footer__heading">{{ t('footer.explore') }}</p>
        <RouterLink v-for="item in navItems" :key="item.key" :to="item.to" class="footer__link">
          {{ t(item.label) }}
        </RouterLink>
      </nav>

      <div class="footer__note">
        <p>{{ t('footer.rights') }}</p>
        <p class="footer__copy">&copy; {{ year }} {{ t('app.name') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: var(--s-16);
  background: var(--surface-2);
  border-top: 1px solid var(--line);
  padding-bottom: calc(var(--bottomnav-h) + env(safe-area-inset-bottom, 0px));
}

@media (min-width: 900px) {
  .footer {
    padding-bottom: 0;
  }
}

.footer__inner {
  display: grid;
  gap: var(--s-8);
  padding-block: var(--s-12);
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: var(--s-4);
}

.footer__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--ink);
}

.footer__tagline {
  color: var(--ink-soft);
  font-size: var(--fs-sm);
  max-width: 34ch;
}

.footer__heading {
  font-weight: 800;
  font-size: var(--fs-xs);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: var(--s-3);
}

.footer__nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s-2);
}

.footer__link {
  color: var(--ink-soft);
  font-weight: 700;
  padding: 0.2rem 0;
  transition: color 0.2s var(--ease-soft);
}

.footer__link:hover {
  color: var(--primary-strong);
}

.footer__note {
  color: var(--ink-faint);
  font-size: var(--fs-sm);
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.footer__copy {
  font-weight: 700;
}

@media (min-width: 720px) {
  .footer__inner {
    grid-template-columns: 2fr 1fr 1fr;
    align-items: start;
  }
}
</style>
