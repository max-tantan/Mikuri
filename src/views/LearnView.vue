<script setup lang="ts">
import { PhArrowRight, PhStar } from '@phosphor-icons/vue'
import AppButton from '../components/ui/AppButton.vue'
import ProgressBar from '../components/ui/ProgressBar.vue'
import { tracks } from '../data/tracks'
import { trackIcons } from '../icons'
import { trackVars } from '../trackTheme'
import { useI18n } from '../i18n'
import { useProgress } from '../composables/useProgress'

const { t, pick } = useI18n()
const { trackDoneCount, trackPercent, totalDone, overallPercent, allLessons } = useProgress()
</script>

<template>
  <div class="learn shell section">
    <header class="learn__head" v-reveal>
      <span class="eyebrow">{{ t('learn.eyebrow') }}</span>
      <h1>{{ t('learn.title') }}</h1>
      <p class="lead">{{ t('learn.lead') }}</p>
    </header>

    <div class="overview" v-reveal>
      <div class="overview__stat">
        <PhStar :size="26" weight="fill" aria-hidden="true" />
        <div>
          <p class="overview__label">{{ t('learn.progressLabel') }}</p>
          <p class="overview__value">{{ totalDone }} / {{ allLessons }} {{ t('common.lessons') }}</p>
        </div>
      </div>
      <ProgressBar :value="overallPercent" :label="`${overallPercent}%`" />
      <p v-if="totalDone === 0" class="overview__empty">{{ t('learn.progressEmpty') }}</p>
    </div>

    <ul class="track-list">
      <li
        v-for="(track, i) in tracks"
        :key="track.slug"
        class="track-row"
        :style="trackVars(track.color)"
        v-reveal="i * 70"
      >
        <span class="track-row__icon">
          <component :is="trackIcons[track.icon]" :size="28" weight="fill" aria-hidden="true" />
        </span>

        <div class="track-row__body">
          <div class="track-row__top">
            <h2 class="track-row__title">{{ pick(track.title) }}</h2>
            <span class="track-row__count">
              {{ trackDoneCount(track) }}/{{ track.lessons.length }}
            </span>
          </div>
          <p class="track-row__tagline">{{ pick(track.tagline) }}</p>
          <ProgressBar :value="trackPercent(track)" :color="track.color" />
        </div>

        <AppButton :to="`/belajar/${track.slug}`" variant="soft" size="md" class="track-row__cta">
          {{ t('home.tracks.open') }}
          <template #icon-right>
            <PhArrowRight :size="16" weight="bold" aria-hidden="true" />
          </template>
        </AppButton>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.learn__head {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  margin-bottom: var(--s-8);
}

.overview {
  display: grid;
  gap: var(--s-4);
  padding: var(--s-6);
  border-radius: var(--r-lg);
  background: linear-gradient(140deg, var(--primary-soft), var(--sunny-soft));
  margin-bottom: var(--s-8);
}

.overview__stat {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  color: var(--primary-strong);
}

.overview__label {
  font-size: var(--fs-xs);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.overview__value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--ink);
}

.overview__empty {
  color: var(--ink-soft);
  font-size: var(--fs-sm);
}

.track-list {
  display: grid;
  gap: var(--s-4);
}

.track-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--s-4);
  align-items: center;
  padding: var(--s-5);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
}

.track-row__icon {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: var(--r-md);
  background: var(--track);
  color: #fff;
  box-shadow: 0 8px 18px -8px var(--track);
}

.track-row__body {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  min-width: 0;
}

.track-row__top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--s-3);
}

.track-row__title {
  font-size: 1.3rem;
}

.track-row__count {
  flex: none;
  font-weight: 800;
  font-size: var(--fs-sm);
  color: var(--track-strong);
}

.track-row__tagline {
  color: var(--ink-soft);
  font-size: var(--fs-sm);
  margin-bottom: var(--s-1);
}

.track-row__cta {
  grid-column: 1 / -1;
  justify-self: start;
}

@media (min-width: 760px) {
  .track-row {
    grid-template-columns: auto 1fr auto;
  }

  .track-row__cta {
    grid-column: auto;
    justify-self: end;
  }

  .track-row__icon {
    grid-row: auto;
  }
}
</style>
