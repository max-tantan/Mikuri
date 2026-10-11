<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PhArrowRight, PhCheckCircle, PhClock, PhBookOpen } from '@phosphor-icons/vue'
import AppButton from '../components/ui/AppButton.vue'
import PageHeader from '../components/layout/PageHeader.vue'
import ProgressBar from '../components/ui/ProgressBar.vue'
import { findTrack } from '../data/tracks'
import { trackIcons } from '../icons'
import { trackVars } from '../trackTheme'
import { useI18n } from '../i18n'
import { useProgress } from '../composables/useProgress'

const route = useRoute()
const { t, pick } = useI18n()
const { isDone, trackPercent } = useProgress()

const track = computed(() => findTrack(route.params.track as string))
const totalMinutes = computed(() =>
  track.value ? track.value.lessons.reduce((sum, l) => sum + l.minutes, 0) : 0,
)
const vars = computed(() => (track.value ? trackVars(track.value.color) : {}))
const statStyle = {
  background: 'var(--track-soft)',
  color: 'var(--track-strong)',
  borderColor: 'transparent',
}
</script>

<template>
  <div v-if="track" class="track shell section" :style="vars">
    <PageHeader
      v-reveal
      :title="pick(track.title)"
      :lead="pick(track.about)"
      :icon="trackIcons[track.icon]"
      :tone="track.color"
      :crumbs="[{ label: t('lesson.breadcrumb'), to: '/belajar' }]"
    >
      <span class="tag" :style="statStyle">
        <PhBookOpen :size="15" weight="fill" aria-hidden="true" />
        {{ track.lessons.length }} {{ t('common.lessons') }}
      </span>
      <span class="tag" :style="statStyle">
        <PhClock :size="15" weight="fill" aria-hidden="true" />
        {{ totalMinutes }} {{ t('common.minutes') }}
      </span>
      <template #aside>
        <ProgressBar
          :value="trackPercent(track)"
          :color="track.color"
          :label="`${trackPercent(track)}%`"
        />
      </template>
    </PageHeader>

    <h2 class="track__subtitle">{{ t('track.lessonsTitle') }}</h2>

    <ol class="lessons">
      <li v-for="(lesson, i) in track.lessons" :key="lesson.slug" v-reveal="i * 60">
        <RouterLink :to="`/belajar/${track.slug}/${lesson.slug}`" class="lesson-row">
          <span class="lesson-row__num" :class="{ 'is-done': isDone(track.slug, lesson.slug) }">
            <PhCheckCircle v-if="isDone(track.slug, lesson.slug)" :size="24" weight="fill" aria-hidden="true" />
            <template v-else>{{ i + 1 }}</template>
          </span>
          <span class="lesson-row__body">
            <span class="lesson-row__title">{{ pick(lesson.title) }}</span>
            <span class="lesson-row__summary">{{ pick(lesson.summary) }}</span>
            <span class="lesson-row__meta">
              <PhClock :size="14" weight="bold" aria-hidden="true" />
              {{ lesson.minutes }} {{ t('common.minutes') }}
              <em v-if="isDone(track.slug, lesson.slug)" class="lesson-row__done">
                {{ t('track.lessonDone') }}
              </em>
              <em v-else class="lesson-row__new">{{ t('track.lessonNew') }}</em>
            </span>
          </span>
          <span class="lesson-row__arrow">
            <PhArrowRight :size="18" weight="bold" aria-hidden="true" />
          </span>
        </RouterLink>
      </li>
    </ol>

    <div class="track__cta">
      <AppButton :to="`/belajar/${track.slug}/${track.lessons[0]?.slug}`" variant="primary" size="lg">
        {{ t('common.startTrack') }}
        <template #icon-right>
          <PhArrowRight :size="20" weight="bold" aria-hidden="true" />
        </template>
      </AppButton>
    </div>
  </div>

  <section v-else class="shell section not-found">
    <h1>{{ t('common.notFound') }}</h1>
    <AppButton to="/belajar" variant="primary">{{ t('common.back') }}</AppButton>
  </section>
</template>

<style scoped>
.track__subtitle {
  font-size: var(--fs-h3);
  margin-bottom: var(--s-4);
}

.lessons {
  display: grid;
  gap: var(--s-3);
}

.lesson-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--s-4);
  align-items: center;
  padding: var(--s-4) var(--s-5);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s var(--ease-soft),
    border-color 0.2s var(--ease-soft),
    box-shadow 0.2s var(--ease-soft);
}

.lesson-row:hover {
  transform: translateY(-3px);
  border-color: var(--track);
  box-shadow: var(--shadow-md);
}

.lesson-row__num {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: var(--r-pill);
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--track-strong);
  background: var(--track-soft);
}

.lesson-row__num.is-done {
  color: #fff;
  background: var(--success);
}

.lesson-row__body {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
  min-width: 0;
}

.lesson-row__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--ink);
}

.lesson-row__summary {
  color: var(--ink-soft);
  font-size: var(--fs-sm);
}

.lesson-row__meta {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  font-size: var(--fs-xs);
  color: var(--ink-faint);
  font-weight: 700;
}

.lesson-row__done {
  color: var(--mint-strong);
  font-style: normal;
}
.lesson-row__new {
  color: var(--sunny-strong);
  font-style: normal;
}

.lesson-row__arrow {
  color: var(--ink-faint);
}

.track__cta {
  margin-top: var(--s-8);
}
</style>
