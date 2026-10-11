<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { PhArrowRight, PhBookOpenText, PhConfetti, PhCursorClick, PhPlayCircle, PhShieldCheck, PhTranslate, PhTrophy } from '@phosphor-icons/vue'
import AppButton from '../components/ui/AppButton.vue'
import Mascot from '../components/brand/Mascot.vue'
import ProgressBar from '../components/ui/ProgressBar.vue'
import OnboardingModal from '../components/onboarding/OnboardingModal.vue'
import { tracks } from '../data/tracks'
import { trackIcons } from '../icons'
import { trackVars } from '../trackTheme'
import { useI18n } from '../i18n'
import { useProgress } from '../composables/useProgress'
import { useOnboarding } from '../composables/useOnboarding'

const { t, pick } = useI18n()
const { trackPercent, isDone, totalDone, allLessons } = useProgress()
const { isOpen, markSeen } = useOnboarding()

onMounted(() => {
  if (!isOpen.value) {
    isOpen.value = false
  }
})

const nextLesson = computed(() => {
  for (const track of tracks) {
    for (const lesson of track.lessons) {
      if (!isDone(track.slug, lesson.slug)) return { track, lesson }
    }
  }
  return null
})

const steps = [
  { icon: PhBookOpenText, title: 'home.how.1.title', body: 'home.how.1.body' },
  { icon: PhCursorClick, title: 'home.how.2.title', body: 'home.how.2.body' },
  { icon: PhTrophy, title: 'home.how.3.title', body: 'home.how.3.body' },
] as const

const reasons = [
  { icon: PhShieldCheck, title: 'home.why.1.title', body: 'home.why.1.body' },
  { icon: PhConfetti, title: 'home.why.2.title', body: 'home.why.2.body' },
  { icon: PhTranslate, title: 'home.why.3.title', body: 'home.why.3.body' },
] as const

const quotes = [
  {
    key: '1',
    seed: 'mikuri-parent-ratna',
    text: 'home.quotes.1.text',
    name: 'home.quotes.1.name',
    role: 'home.quotes.1.role',
  },
  {
    key: '2',
    seed: 'mikuri-parent-andi',
    text: 'home.quotes.2.text',
    name: 'home.quotes.2.name',
    role: 'home.quotes.2.role',
  },
  {
    key: '3',
    seed: 'mikuri-teacher-dewi',
    text: 'home.quotes.3.text',
    name: 'home.quotes.3.name',
    role: 'home.quotes.3.role',
  },
] as const

function avatar(seed: string) {
  return `https://picsum.photos/seed/${seed}/96/96`
}
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero">
      <div class="hero__inner shell">
        <div class="hero__art">
          <div class="hero__blob">
            <Mascot :size="260" float :alt="t('home.hero.mascotAlt')" />
          </div>
          <p class="hero__bubble">{{ t('home.hero.bubble') }}</p>
        </div>

        <div class="hero__copy">
          <span class="eyebrow">{{ t('home.hero.eyebrow') }}</span>
          <h1 class="hero__title">{{ t('home.hero.title') }}</h1>
          <p class="lead">{{ t('home.hero.lead') }}</p>
          <div class="hero__cta">
            <AppButton to="/belajar" variant="primary" size="lg">
              {{ t('home.hero.cta') }}
              <template #icon-right>
                <PhArrowRight :size="20" weight="bold" aria-hidden="true" />
              </template>
            </AppButton>
            <AppButton href="#cara" variant="outline" size="lg">
              {{ t('home.hero.secondary') }}
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- RESUME -->
    <section class="resume shell" aria-labelledby="resume-title">
      <div class="resume__card" :class="{ 'is-done': !nextLesson }" v-reveal>
        <div class="resume__art">
          <Mascot :size="120" :expression="nextLesson ? 'happy' : 'cheer'" decorative />
        </div>
        <div class="resume__body">
          <span class="eyebrow">{{ t('home.resume.eyebrow') }}</span>
          <template v-if="nextLesson">
            <h2 id="resume-title" class="resume__title">{{ t('home.resume.button') }}</h2>
            <p class="resume__lead">
              {{
                totalDone > 0
                  ? t('home.resume.progress', { done: totalDone, total: allLessons })
                  : t('home.resume.start')
              }}
            </p>
            <p class="resume__next">
              <span class="resume__track" :style="trackVars(nextLesson.track.color)">
                {{ pick(nextLesson.track.title) }}
              </span>
              {{ pick(nextLesson.lesson.title) }}
            </p>
            <AppButton
              :to="`/belajar/${nextLesson.track.slug}/${nextLesson.lesson.slug}`"
              variant="primary"
              size="lg"
            >
              <template #icon-left>
                <PhPlayCircle :size="20" weight="fill" aria-hidden="true" />
              </template>
              {{ t('home.resume.button') }}
            </AppButton>
          </template>
          <template v-else>
            <h2 id="resume-title" class="resume__title">{{ t('home.resume.done.title') }}</h2>
            <p class="resume__lead">{{ t('home.resume.done.lead') }}</p>
            <AppButton to="/koleksi" variant="primary" size="lg">
              <template #icon-left>
                <PhTrophy :size="20" weight="fill" aria-hidden="true" />
              </template>
              {{ t('home.resume.done.button') }}
            </AppButton>
          </template>
        </div>
      </div>
    </section>

    <!-- TRACKS (bento, 1 featured + 2) -->
    <section class="section shell" aria-labelledby="tracks-title">
      <header class="section-head" v-reveal>
        <span class="eyebrow">{{ t('home.tracks.eyebrow') }}</span>
        <h2 id="tracks-title">{{ t('home.tracks.title') }}</h2>
        <p class="lead">{{ t('home.tracks.lead') }}</p>
      </header>

      <div class="bento">
        <RouterLink
          v-for="(track, i) in tracks"
          :key="track.slug"
          :to="`/belajar/${track.slug}`"
          class="track-card"
          :class="`track-card--${i === 0 ? 'feature' : 'small'}`"
          :style="trackVars(track.color)"
          v-reveal="i * 70"
        >
          <span class="track-card__icon">
            <component :is="trackIcons[track.icon]" :size="i === 0 ? 34 : 26" weight="fill" aria-hidden="true" />
          </span>
          <h3 class="track-card__title">{{ pick(track.title) }}</h3>
          <p class="track-card__tagline">{{ pick(track.tagline) }}</p>

          <div class="track-card__meta">
            <span class="tag" :style="{ background: 'var(--track-soft)', color: 'var(--track-strong)', borderColor: 'transparent' }">
              {{ track.lessons.length }} {{ t('common.lessons') }}
            </span>
            <span class="track-card__link">
              {{ t('home.tracks.open') }}
              <PhArrowRight :size="16" weight="bold" aria-hidden="true" />
            </span>
          </div>

          <div class="track-card__progress">
            <ProgressBar :value="trackPercent(track)" :color="track.color" :label="`${trackPercent(track)}%`" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="cara" class="section shell" aria-labelledby="how-title">
      <h2 id="how-title" class="center-title" v-reveal>{{ t('home.how.title') }}</h2>
      <ol class="steps">
        <li v-for="(step, i) in steps" :key="step.title" class="step" v-reveal="i * 90">
          <span class="step__num">{{ i + 1 }}</span>
          <span class="step__icon">
            <component :is="step.icon" :size="24" weight="fill" aria-hidden="true" />
          </span>
          <h3 class="step__title">{{ t(step.title) }}</h3>
          <p class="step__body">{{ t(step.body) }}</p>
        </li>
      </ol>
    </section>

    <!-- WHY KIDS SAFE -->
    <section class="why">
      <div class="why__inner shell">
        <div class="why__intro" v-reveal>
          <Mascot :size="150" :alt="t('home.hero.mascotAlt')" />
          <h2>{{ t('home.why.title') }}</h2>
        </div>
        <ul class="why__list">
          <li v-for="(reason, i) in reasons" :key="reason.title" class="why__item" v-reveal="i * 80">
            <span class="why__icon">
              <component :is="reason.icon" :size="22" weight="fill" aria-hidden="true" />
            </span>
            <div>
              <h3>{{ t(reason.title) }}</h3>
              <p>{{ t(reason.body) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section shell" aria-labelledby="quotes-title">
      <header class="section-head" v-reveal>
        <h2 id="quotes-title">{{ t('home.quotes.title') }}</h2>
        <p class="lead">{{ t('home.quotes.lead') }}</p>
      </header>

      <ul class="quotes">
        <li v-for="(quote, i) in quotes" :key="quote.key" class="quote" v-reveal="i * 70">
          <p class="quote__text">&ldquo;{{ t(quote.text) }}&rdquo;</p>
          <div class="quote__author">
            <img class="quote__avatar" :src="avatar(quote.seed)" :alt="t(quote.name)" loading="lazy" />
            <div>
              <p class="quote__name">{{ t(quote.name) }}</p>
              <p class="quote__role">{{ t(quote.role) }}</p>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- FINAL CTA -->
    <section class="cta shell">
      <div class="cta__card" v-reveal>
        <div class="cta__copy">
          <h2>{{ t('home.cta.title') }}</h2>
          <p class="lead">{{ t('home.cta.lead') }}</p>
          <AppButton to="/belajar" variant="primary" size="lg">
            {{ t('home.cta.button') }}
            <template #icon-right>
              <PhArrowRight :size="20" weight="bold" aria-hidden="true" />
            </template>
          </AppButton>
        </div>
        <Mascot :size="180" float class="cta__mascot" :alt="t('home.hero.mascotAlt')" />
      </div>
    </section>
    <OnboardingModal :open="isOpen" @close="markSeen" />
  </div>
</template>

<style scoped>
/* ---------------- HERO ---------------- */
.hero {
  padding-block: var(--s-8) var(--s-12);
  overflow: hidden;
}

.hero__inner {
  display: grid;
  gap: var(--s-8);
}

.hero__art {
  position: relative;
  display: grid;
  place-items: center;
  order: -1;
}

.hero__blob {
  position: relative;
  display: grid;
  place-items: center;
  padding: var(--s-6);
  border-radius: 46% 54% 58% 42% / 52% 46% 54% 48%;
  background: radial-gradient(circle at 35% 30%, var(--primary-tint), var(--sunny-soft));
}

.hero__bubble {
  position: absolute;
  top: 6%;
  right: 2%;
  max-width: 14rem;
  background: var(--surface);
  border: 2px solid var(--line-strong);
  border-radius: var(--r-lg) var(--r-lg) var(--r-lg) 6px;
  padding: var(--s-3) var(--s-4);
  font-weight: 700;
  font-size: var(--fs-sm);
  color: var(--ink);
  box-shadow: var(--shadow-md);
  transform: rotate(2deg);
}

.hero__copy {
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  text-align: center;
  align-items: center;
}

.hero__title {
  max-width: 15ch;
}

.hero__copy .lead {
  max-width: 42ch;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
  justify-content: center;
  width: 100%;
}

.hero__cta > * {
  flex: 1 1 auto;
}

@media (min-width: 900px) {
  .hero {
    padding-block: var(--s-10) var(--s-16);
  }

  .hero__inner {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: var(--s-12);
  }

  .hero__art {
    order: 0;
  }

  .hero__copy {
    text-align: left;
    align-items: flex-start;
  }

  .hero__cta {
    justify-content: flex-start;
    width: auto;
  }

  .hero__cta > * {
    flex: 0 0 auto;
  }
}

/* ---------------- Section head ---------------- */
.section-head {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  margin-bottom: var(--s-8);
  align-items: flex-start;
}

.center-title {
  text-align: center;
  margin-bottom: var(--s-8);
}

/* ---------------- Bento tracks ---------------- */
.bento {
  display: grid;
  gap: var(--s-4);
}

.track-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  padding: var(--s-6);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.24s var(--ease-soft),
    box-shadow 0.24s var(--ease-soft);
  overflow: hidden;
}

.track-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--track-soft), transparent 62%);
  opacity: 0.7;
  pointer-events: none;
}

.track-card > * {
  position: relative;
}

.track-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.track-card__icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: var(--r-md);
  background: var(--track);
  color: #fff;
  box-shadow: 0 8px 18px -8px var(--track);
}

.track-card__title {
  font-size: 1.35rem;
}

.track-card__tagline {
  color: var(--ink-soft);
}

.track-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  margin-top: auto;
  padding-top: var(--s-2);
}

.track-card__link {
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
  font-weight: 800;
  color: var(--track-strong);
  font-size: var(--fs-sm);
}

.track-card__progress {
  margin-top: var(--s-2);
}

@media (min-width: 780px) {
  .bento {
    grid-template-columns: 1.25fr 1fr;
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }

  .track-card--feature {
    grid-row: span 2;
    padding: var(--s-8);
  }

  .track-card--feature .track-card__title {
    font-size: 1.9rem;
  }

  .track-card--feature .track-card__tagline {
    font-size: var(--fs-lead);
    max-width: 34ch;
  }
}

/* ---------------- Steps ---------------- */
.steps {
  display: grid;
  gap: var(--s-6);
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  padding-left: var(--s-12);
}

.step__num {
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: var(--r-pill);
  background: var(--primary);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
}

.step__icon {
  display: none;
}

.step__body {
  color: var(--ink-soft);
}

@media (min-width: 780px) {
  .steps {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--s-8);
  }

  .step {
    padding-left: 0;
    padding-top: var(--s-12);
    text-align: center;
    align-items: center;
  }

  .step__num {
    left: 50%;
    transform: translateX(-50%);
  }

  .step__icon {
    display: grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: var(--r-md);
    background: var(--primary-tint);
    color: var(--primary-strong);
  }

  .step__body {
    max-width: 34ch;
  }
}

/* ---------------- Why ---------------- */
.why {
  background: var(--surface-2);
  border-block: 1px solid var(--line);
  padding-block: var(--s-12);
  margin-block: var(--s-8);
}

.why__inner {
  display: grid;
  gap: var(--s-8);
}

.why__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-4);
  text-align: center;
}

.why__list {
  display: grid;
  gap: var(--s-5);
}

.why__item {
  display: flex;
  gap: var(--s-4);
  align-items: flex-start;
}

.why__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--r-md);
  background: var(--mint-soft);
  color: var(--mint-strong);
}

.why__item p {
  color: var(--ink-soft);
}

@media (min-width: 900px) {
  .why__inner {
    grid-template-columns: 0.9fr 1.1fr;
    align-items: center;
    gap: var(--s-12);
  }

  .why__intro {
    text-align: left;
    align-items: flex-start;
  }
}

/* ---------------- Quotes ---------------- */
.quotes {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 85%;
  gap: var(--s-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: var(--s-3);
  margin-inline: calc(var(--s-5) * -1);
  padding-inline: var(--s-5);
}

.quote {
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  gap: var(--s-5);
  padding: var(--s-6);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-sm);
}

.quote__text {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.5;
}

.quote__author {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  margin-top: auto;
}

.quote__avatar {
  width: 44px;
  height: 44px;
  border-radius: var(--r-pill);
  object-fit: cover;
  background: var(--surface-2);
}

.quote__name {
  font-weight: 800;
  color: var(--ink);
}

.quote__role {
  font-size: var(--fs-sm);
  color: var(--ink-faint);
}

.quotes::-webkit-scrollbar {
  height: 6px;
}
.quotes::-webkit-scrollbar-thumb {
  background: var(--line-strong);
  border-radius: var(--r-pill);
}

@media (min-width: 860px) {
  .quotes {
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
    overflow: visible;
    margin-inline: 0;
    padding-inline: 0;
  }
}

/* ---------------- RESUME ---------------- */
.resume {
  margin-top: calc(-1 * var(--s-6));
  padding-bottom: var(--s-4);
}

.resume__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-4);
  padding: var(--s-6);
  border-radius: var(--r-xl);
  background: var(--surface);
  border: 2px solid var(--primary-soft);
  box-shadow: var(--shadow-md);
  text-align: center;
}

.resume__card.is-done {
  border-color: var(--success-soft);
  background: linear-gradient(140deg, var(--success-soft), var(--surface));
}

.resume__art {
  flex: none;
}

.resume__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-3);
}

.resume__title {
  font-size: var(--fs-h3);
}

.resume__lead {
  color: var(--ink-soft);
  max-width: 46ch;
}

.resume__next {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  font-weight: 700;
  color: var(--ink);
}

.resume__track {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: var(--r-pill);
  background: var(--track-soft);
  color: var(--track-strong);
  font-size: var(--fs-xs);
  font-weight: 800;
}

@media (min-width: 720px) {
  .resume__card {
    flex-direction: row;
    text-align: left;
    padding: var(--s-8);
    gap: var(--s-8);
  }

  .resume__body {
    align-items: flex-start;
  }
}

/* ---------------- CTA ---------------- */
.cta {
  margin-top: var(--s-12);
}

.cta__card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--s-5);
  padding: var(--s-10) var(--s-6);
  border-radius: var(--r-xl);
  background: linear-gradient(140deg, var(--primary-soft), var(--sunny-soft));
  overflow: hidden;
}

.cta__copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-4);
}

.cta__copy .lead {
  max-width: 40ch;
}

.cta__mascot {
  order: -1;
}

@media (min-width: 780px) {
  .cta__card {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: var(--s-12);
  }

  .cta__copy {
    align-items: flex-start;
  }

  .cta__mascot {
    order: 0;
  }
}
</style>
