<script setup lang="ts">
import { PhChalkboard, PhCaretDown, PhLockSimple, PhShieldCheck, PhUsers, PhGraduationCap } from '@phosphor-icons/vue'
import Mascot from '../components/brand/Mascot.vue'
import PageHeader from '../components/layout/PageHeader.vue'
import { useI18n } from '../i18n'

const { t } = useI18n()

const safetyPoints = ['about.safety.1', 'about.safety.2', 'about.safety.3'] as const
const faqs = [
  { q: 'about.faq.1.q', a: 'about.faq.1.a' },
  { q: 'about.faq.2.q', a: 'about.faq.2.a' },
  { q: 'about.faq.3.q', a: 'about.faq.3.a' },
] as const
</script>

<template>
  <div class="about shell section">
    <PageHeader
      v-reveal
      :eyebrow="t('about.eyebrow')"
      :title="t('about.title')"
      :lead="t('about.lead')"
      :icon="PhUsers"
      tone="mint"
    />

    <div class="panel panel--method" v-reveal>
      <span class="panel__icon panel__icon--grape">
        <PhChalkboard :size="26" weight="fill" aria-hidden="true" />
      </span>
      <div>
        <h2>{{ t('about.method.title') }}</h2>
        <p>{{ t('about.method.body') }}</p>
      </div>
      <Mascot :size="120" decorative class="panel__mascot" />
    </div>

    <div class="grid-2">
      <section class="panel" v-reveal>
        <span class="panel__icon panel__icon--mint">
          <PhShieldCheck :size="26" weight="fill" aria-hidden="true" />
        </span>
        <div>
          <h2>{{ t('about.safety.title') }}</h2>
          <ul class="check-list">
            <li v-for="point in safetyPoints" :key="point">
              <PhLockSimple :size="16" weight="fill" aria-hidden="true" />
              <span>{{ t(point) }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="panel" v-reveal="80">
        <span class="panel__icon panel__icon--sunny">
          <PhGraduationCap :size="26" weight="fill" aria-hidden="true" />
        </span>
        <div>
          <h2>{{ t('about.age.title') }}</h2>
          <p>{{ t('about.age.body') }}</p>
          <p class="age-note">
            <PhUsers :size="16" weight="fill" aria-hidden="true" />
            7-12
          </p>
        </div>
      </section>
    </div>

    <section class="faq" aria-labelledby="faq-title" v-reveal>
      <h2 id="faq-title">{{ t('about.faq.title') }}</h2>
      <details v-for="faq in faqs" :key="faq.q" class="faq__item">
        <summary class="faq__q">
          {{ t(faq.q) }}
          <PhCaretDown :size="18" weight="bold" aria-hidden="true" />
        </summary>
        <p class="faq__a">{{ t(faq.a) }}</p>
      </details>
    </section>
  </div>
</template>

<style scoped>
.panel {
  position: relative;
  display: flex;
  gap: var(--s-4);
  padding: var(--s-6);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
}

.panel h2 {
  margin-bottom: var(--s-2);
}

.panel p {
  color: var(--ink-soft);
}

.panel--method {
  background: linear-gradient(140deg, var(--grape-soft), var(--sky-soft));
  margin-bottom: var(--s-4);
  overflow: hidden;
}

.panel--method p {
  max-width: 52ch;
}

.panel__mascot {
  position: absolute;
  right: var(--s-4);
  bottom: -10px;
  opacity: 0.9;
  display: none;
}

.panel__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: var(--r-md);
}

.panel__icon--grape {
  background: var(--grape);
  color: #fff;
}
.panel__icon--mint {
  background: var(--mint);
  color: #fff;
}
.panel__icon--sunny {
  background: var(--sunny);
  color: #fff;
}

.grid-2 {
  display: grid;
  gap: var(--s-4);
  margin-bottom: var(--s-8);
}

.check-list {
  display: grid;
  gap: var(--s-2);
  margin-top: var(--s-2);
}

.check-list li {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--ink-soft);
  font-weight: 600;
}

.check-list svg {
  color: var(--mint-strong);
}

.age-note {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  margin-top: var(--s-3);
  padding: 0.3rem 0.8rem;
  border-radius: var(--r-pill);
  background: var(--sunny-soft);
  color: var(--sunny-strong);
  font-weight: 800;
}

.faq h2 {
  margin-bottom: var(--s-4);
}

.faq__item {
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--surface);
  margin-bottom: var(--s-3);
  overflow: hidden;
}

.faq__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  padding: var(--s-4) var(--s-5);
  font-weight: 800;
  color: var(--ink);
  cursor: pointer;
  list-style: none;
}

.faq__q::-webkit-details-marker {
  display: none;
}

.faq__q svg {
  flex: none;
  transition: transform 0.2s var(--ease-soft);
}

.faq__item[open] .faq__q svg {
  transform: rotate(180deg);
}

.faq__a {
  padding: 0 var(--s-5) var(--s-5);
  color: var(--ink-soft);
}

@media (min-width: 820px) {
  .grid-2 {
    grid-template-columns: 1fr 1fr;
  }

  .panel__mascot {
    display: block;
  }
}
</style>
