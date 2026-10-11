<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  PhArrowLeft,
  PhArrowRight,
  PhCheck,
  PhCheckCircle,
  PhClock,
  PhLightbulb,
  PhStar,
} from '@phosphor-icons/vue'
import AppButton from '../components/ui/AppButton.vue'
import BlockSorter from '../components/lesson/BlockSorter.vue'
import QuizCard from '../components/lesson/QuizCard.vue'
import { findLesson } from '../data/tracks'
import { trackIcons } from '../icons'
import { trackVars } from '../trackTheme'
import { useI18n } from '../i18n'
import { useProgress } from '../composables/useProgress'

const route = useRoute()
const { t, pick } = useI18n()
const { isDone, markDone, toggleDone } = useProgress()

const result = computed(() =>
  findLesson(route.params.track as string, route.params.lesson as string),
)
const track = computed(() => result.value.track)
const lesson = computed(() => result.value.lesson)
const index = computed(() => result.value.index)

const vars = computed(() => (track.value ? trackVars(track.value.color) : {}))
const done = computed(
  () => !!track.value && !!lesson.value && isDone(track.value.slug, lesson.value.slug),
)
const prev = computed(() =>
  track.value && index.value > 0 ? track.value.lessons[index.value - 1] : undefined,
)
const next = computed(() =>
  track.value && index.value < track.value.lessons.length - 1
    ? track.value.lessons[index.value + 1]
    : undefined,
)

const exerciseDone = ref(false)
const quizDone = ref(false)

watch(
  () => route.fullPath,
  () => {
    exerciseDone.value = false
    quizDone.value = false
  },
)

function finish() {
  if (!track.value || !lesson.value) return
  toggleDone(track.value.slug, lesson.value.slug)
}

function markAndNext() {
  if (track.value && lesson.value) markDone(track.value.slug, lesson.value.slug)
}
</script>

<template>
  <div v-if="track && lesson" class="lesson shell section" :style="vars">
    <RouterLink :to="`/belajar/${track.slug}`" class="crumb">
      <PhArrowLeft :size="16" weight="bold" aria-hidden="true" />
      {{ pick(track.title) }}
    </RouterLink>

    <header class="lesson__head" v-reveal>
      <span class="lesson__badge" :style="{ background: 'var(--track-soft)', color: 'var(--track-strong)' }">
        <component :is="trackIcons[track.icon]" :size="15" weight="fill" aria-hidden="true" />
        {{ pick(track.title) }}
      </span>
      <h1>{{ pick(lesson.title) }}</h1>
      <p class="lead">{{ pick(lesson.summary) }}</p>
      <p class="lesson__meta">
        <PhClock :size="15" weight="bold" aria-hidden="true" />
        {{ lesson.minutes }} {{ t('common.minutes') }}
      </p>
    </header>

    <!-- TEACH -->
    <section class="block" aria-labelledby="teach-title" v-reveal>
      <h2 id="teach-title" class="block__title">
        <PhLightbulb :size="22" weight="fill" aria-hidden="true" />
        {{ t('lesson.teachTitle') }}
      </h2>
      <ul class="teach">
        <li v-for="(point, i) in lesson.teach" :key="i" class="teach__item">
          <span class="teach__dot" aria-hidden="true"></span>
          <span>{{ pick(point) }}</span>
        </li>
      </ul>
    </section>

    <!-- CODE -->
    <section v-if="lesson.code" class="block" aria-labelledby="code-title" v-reveal>
      <h2 id="code-title" class="block__title">{{ t('lesson.codeTitle') }}</h2>
      <div class="code">
        <div class="code__bar">
          <span class="code__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="code__lang">{{ lesson.code.lang }}</span>
        </div>
        <pre class="code__body"><code>{{ lesson.code.text }}</code></pre>
      </div>
    </section>

    <!-- EXERCISE -->
    <section v-if="lesson.exercise" class="block" aria-labelledby="ex-title" v-reveal>
      <h2 id="ex-title" class="block__title">{{ t('lesson.exerciseTitle') }}</h2>
      <p class="block__hint">{{ pick(lesson.exercise.prompt) }}</p>
      <BlockSorter :blocks="lesson.exercise.blocks" :solution="lesson.exercise.solution" @complete="exerciseDone = true" />
    </section>

    <!-- QUIZ -->
    <section class="block" aria-labelledby="quiz-title" v-reveal>
      <h2 id="quiz-title" class="block__title">
        <PhStar :size="22" weight="fill" aria-hidden="true" />
        {{ t('lesson.quizTitle') }}
      </h2>
      <QuizCard :quiz="lesson.quiz" @correct="quizDone = true" />
    </section>

    <!-- DONE -->
    <div class="lesson__done" :class="{ 'is-done': done }">
      <PhCheckCircle :size="24" :weight="done ? 'fill' : 'regular'" aria-hidden="true" />
      <span>{{ done ? t('lesson.finished') : t('lesson.finish') }}</span>
      <button type="button" class="lesson__done-btn" @click="finish">
        <PhCheck :size="18" weight="bold" aria-hidden="true" />
        {{ done ? t('common.review') : t('common.done') }}
      </button>
    </div>

    <!-- NAV -->
    <nav class="lesson__nav" aria-label="navigation">
      <RouterLink
        v-if="prev"
        :to="`/belajar/${track.slug}/${prev.slug}`"
        class="lesson__nav-link"
      >
        <PhArrowLeft :size="18" weight="bold" aria-hidden="true" />
        <span>
          <em>{{ t('common.prev') }}</em>
          {{ pick(prev.title) }}
        </span>
      </RouterLink>
      <span v-else class="lesson__nav-spacer"></span>

      <RouterLink
        v-if="next"
        :to="`/belajar/${track.slug}/${next.slug}`"
        class="lesson__nav-link lesson__nav-link--right"
        @click="markAndNext"
      >
        <span>
          <em>{{ t('lesson.nextLesson') }}</em>
          {{ pick(next.title) }}
        </span>
        <PhArrowRight :size="18" weight="bold" aria-hidden="true" />
      </RouterLink>
      <span v-else class="lesson__nav-end">{{ t('lesson.lastLesson') }}</span>
    </nav>
  </div>

  <section v-else class="shell section not-found">
    <h1>{{ t('common.notFound') }}</h1>
    <AppButton to="/belajar" variant="primary">{{ t('common.back') }}</AppButton>
  </section>
</template>

<style scoped>
.crumb {
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  font-weight: 800;
  font-size: var(--fs-sm);
  color: var(--ink-soft);
  margin-bottom: var(--s-5);
}

.crumb:hover {
  color: var(--track-strong);
}

.lesson__head {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  margin-bottom: var(--s-8);
}

.lesson__badge {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: var(--s-1);
  padding: 0.3rem 0.7rem;
  border-radius: var(--r-pill);
  font-weight: 800;
  font-size: var(--fs-xs);
}

.lesson__meta {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--ink-faint);
  font-weight: 700;
  font-size: var(--fs-sm);
}

.block {
  margin-bottom: var(--s-8);
}

.block__title {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  font-size: var(--fs-h3);
  margin-bottom: var(--s-4);
  color: var(--ink);
}

.block__title :deep(svg) {
  color: var(--primary-strong);
}

.block__hint {
  color: var(--ink-soft);
  margin-bottom: var(--s-4);
}

.teach {
  display: grid;
  gap: var(--s-3);
}

.teach__item {
  display: flex;
  gap: var(--s-3);
  align-items: flex-start;
  padding: var(--s-4);
  border-radius: var(--r-md);
  background: var(--surface);
  border: 1px solid var(--line);
  font-weight: 600;
}

.teach__dot {
  flex: none;
  width: 12px;
  height: 12px;
  margin-top: 0.4rem;
  border-radius: var(--r-pill);
  background: var(--track);
}

.code {
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--line);
  background: var(--surface-2);
}

.code__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--s-2) var(--s-4);
  background: var(--surface);
  border-bottom: 1px solid var(--line);
}

.code__dots {
  display: inline-flex;
  gap: 6px;
}

.code__dots i {
  width: 10px;
  height: 10px;
  border-radius: var(--r-pill);
  background: var(--line-strong);
}
.code__dots i:nth-child(1) {
  background: #ff9a80;
}
.code__dots i:nth-child(2) {
  background: var(--sunny);
}
.code__dots i:nth-child(3) {
  background: var(--mint);
}

.code__lang {
  font-size: var(--fs-xs);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.code__body {
  margin: 0;
  padding: var(--s-5);
  overflow-x: auto;
}

.code__body code {
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--ink);
  white-space: pre;
}

.lesson__done {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-4) var(--s-5);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 2px dashed var(--line-strong);
  color: var(--ink-soft);
  font-weight: 700;
}

.lesson__done.is-done {
  border-style: solid;
  border-color: transparent;
  background: var(--success-soft);
  color: var(--mint-strong);
}

.lesson__done-btn {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  min-height: 44px;
  padding: 0.5rem 1.1rem;
  border-radius: var(--r-pill);
  background: var(--primary);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 600;
}

.lesson__done.is-done .lesson__done-btn {
  background: var(--mint-strong);
}

.lesson__nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-3);
  margin-top: var(--s-8);
  align-items: stretch;
}

.lesson__nav-link {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-4);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--ink);
  font-weight: 700;
  transition:
    border-color 0.2s var(--ease-soft),
    transform 0.2s var(--ease-soft);
}

.lesson__nav-link:hover {
  border-color: var(--track);
  transform: translateY(-2px);
}

.lesson__nav-link--right {
  justify-content: flex-end;
  text-align: right;
}

.lesson__nav-link em {
  display: block;
  font-style: normal;
  font-size: var(--fs-xs);
  color: var(--ink-faint);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.lesson__nav-spacer {
  display: block;
}

.lesson__nav-end {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--s-4);
  border-radius: var(--r-lg);
  background: var(--success-soft);
  color: var(--mint-strong);
  font-weight: 800;
}
</style>
