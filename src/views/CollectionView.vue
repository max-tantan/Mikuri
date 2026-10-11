<script setup lang="ts">
import { PhFire, PhLockSimple, PhMedal, PhStar, PhTrophy } from '@phosphor-icons/vue'
import AppButton from '../components/ui/AppButton.vue'
import PageHeader from '../components/layout/PageHeader.vue'
import SpeechBubble from '../components/brand/SpeechBubble.vue'
import ProgressBar from '../components/ui/ProgressBar.vue'
import { useI18n } from '../i18n'
import { useRewards } from '../composables/useRewards'
import { trackVars } from '../trackTheme'

const { t } = useI18n()
const { badges, unlockedBadges, stars, streak } = useRewards()
</script>

<template>
  <div class="collection shell section">
    <PageHeader
      v-reveal
      :eyebrow="t('collection.eyebrow')"
      :title="t('collection.title')"
      :lead="t('collection.lead')"
      :icon="PhMedal"
      tone="sunny"
    />

    <div class="stats" v-reveal>
      <div class="stat stat--star">
        <span class="stat__icon"><PhStar :size="24" weight="fill" aria-hidden="true" /></span>
        <span class="stat__value">{{ stars }}</span>
        <span class="stat__label">{{ t('collection.stars') }}</span>
      </div>
      <div class="stat stat--streak">
        <span class="stat__icon"><PhFire :size="24" weight="fill" aria-hidden="true" /></span>
        <span class="stat__value">{{ streak.count }}</span>
        <span class="stat__label">{{ t('collection.streak') }}</span>
      </div>
      <div class="stat stat--badge">
        <span class="stat__icon"><PhMedal :size="24" weight="fill" aria-hidden="true" /></span>
        <span class="stat__value">{{ unlockedBadges }}</span>
        <span class="stat__label">{{ t('collection.badges') }}</span>
      </div>
    </div>

    <p class="collection__summary" v-reveal>
      {{ t('collection.ofBadges', { done: unlockedBadges, total: badges.length }) }}
    </p>

    <section aria-labelledby="badges-title" class="badges-wrap">
      <h2 id="badges-title" class="sr-only">{{ t('collection.badges') }}</h2>

      <div v-if="stars === 0" class="collection__empty" v-reveal>
        <SpeechBubble :text="t('collection.empty')" expression="think" />
        <AppButton to="/belajar" variant="primary">{{ t('nav.cta') }}</AppButton>
      </div>

      <ul v-else class="badges">
        <li
          v-for="badge in badges"
          :key="badge.id"
          class="badge"
          :class="{ 'is-locked': !badge.unlocked }"
          :style="trackVars(badge.tone)"
          v-reveal
        >
          <span class="badge__emblem">
            <PhTrophy v-if="badge.unlocked" :size="30" weight="fill" aria-hidden="true" />
            <PhLockSimple v-else :size="26" weight="bold" aria-hidden="true" />
          </span>
          <div class="badge__body">
            <h3 class="badge__label">{{ badge.label }}</h3>
            <p class="badge__desc">{{ badge.desc }}</p>
            <ProgressBar
              v-if="!badge.unlocked"
              :value="Math.round(badge.progress * 100)"
              :color="badge.tone"
              :label="`${Math.round(badge.progress * 100)}%`"
            />
            <span v-else class="badge__done">{{ t('collection.unlocked') }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--s-3);
  margin-bottom: var(--s-5);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: var(--s-4) var(--s-2);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  text-align: center;
}

.stat__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--r-pill);
  margin-bottom: var(--s-1);
}

.stat--star .stat__icon {
  background: var(--sunny-soft);
  color: var(--sunny-strong);
}
.stat--streak .stat__icon {
  background: var(--primary-soft);
  color: var(--primary-strong);
}
.stat--badge .stat__icon {
  background: var(--grape-soft);
  color: var(--grape-strong);
}

.stat__value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--fs-h3);
  line-height: 1;
}

.stat__label {
  font-size: var(--fs-xs);
  font-weight: 800;
  color: var(--ink-faint);
}

.collection__summary {
  text-align: center;
  color: var(--ink-soft);
  font-weight: 700;
  margin-bottom: var(--s-6);
}

.collection__empty {
  display: grid;
  justify-items: center;
  gap: var(--s-5);
  padding: var(--s-6) 0;
}

.badges {
  display: grid;
  gap: var(--s-3);
  grid-template-columns: 1fr;
}

@media (min-width: 560px) {
  .badges {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .badges {
    grid-template-columns: repeat(3, 1fr);
  }
}

.badge {
  display: flex;
  gap: var(--s-3);
  padding: var(--s-4);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 2px solid var(--track-soft);
  box-shadow: var(--shadow-sm);
}

.badge.is-locked {
  opacity: 0.72;
  border-style: dashed;
  border-color: var(--line-strong);
}

.badge__emblem {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  flex: none;
  border-radius: var(--r-md);
  background: var(--track-soft);
  color: var(--track-strong);
}

.badge.is-locked .badge__emblem {
  background: var(--surface-2);
  color: var(--ink-faint);
}

.badge__body {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
  min-width: 0;
}

.badge__label {
  font-size: var(--fs-body);
  font-weight: 700;
}

.badge__desc {
  font-size: var(--fs-sm);
  color: var(--ink-soft);
  line-height: 1.4;
}

.badge__done {
  margin-top: var(--s-1);
  align-self: flex-start;
  padding: 0.15rem 0.6rem;
  border-radius: var(--r-pill);
  background: var(--success-soft);
  color: var(--mint-strong);
  font-size: var(--fs-xs);
  font-weight: 800;
}
</style>
