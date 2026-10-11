<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PhArrowCounterClockwise, PhPlay, PhSparkle } from '@phosphor-icons/vue'
import BlockSorter from '../components/lesson/BlockSorter.vue'
import { playExamples } from '../data/playground'
import { trackVars } from '../trackTheme'
import { useI18n } from '../i18n'
import { useSound } from '../composables/useSound'
import { useHaptics } from '../composables/useHaptics'
import { useConfetti } from '../composables/useConfetti'

const { t, pick } = useI18n()
const { play } = useSound()
const { buzz } = useHaptics()
const { burst } = useConfetti()

const selectedId = ref(playExamples[0].id)
const example = computed(() => playExamples.find((e) => e.id === selectedId.value)!)
const order = ref<string[]>([])
const output = ref<string[] | null>(null)
const success = ref(false)

function resetRun() {
  order.value = []
  output.value = null
  success.value = false
}

watch(selectedId, resetRun)

function onChange(placed: string[]) {
  order.value = placed
  output.value = null
  success.value = false
}

function run() {
  const lines = order.value.map((id) => example.value.blocks.find((b) => b.id === id)?.output ?? '')
  output.value = lines
  success.value =
    order.value.length === example.value.solution.length &&
    order.value.every((id, i) => id === example.value.solution[i])
  if (success.value) {
    output.value = lines
    play('correct')
    buzz()
    void burst({ kind: 'small', originY: 0.55 })
  } else {
    play('wrong')
  }
}

const accentColor = computed(() => ['grape', 'sky', 'sunny'][playExamples.indexOf(example.value) % 3])
const accent = computed(() =>
  accentColor.value === 'grape'
    ? trackVars('grape')
    : accentColor.value === 'sky'
      ? trackVars('sky')
      : trackVars('sunny'),
)
</script>

<template>
  <div class="play shell section" :style="accent">
    <header class="play__head" v-reveal>
      <span class="eyebrow">{{ t('play.eyebrow') }}</span>
      <h1>{{ t('play.title') }}</h1>
      <p class="lead">{{ t('play.lead') }}</p>
    </header>

    <section class="play__panel" v-reveal>
      <p class="play__label">{{ t('play.chooseExample') }}</p>
      <ul class="examples">
        <li v-for="ex in playExamples" :key="ex.id">
          <button
            type="button"
            class="example"
            :class="{ 'is-active': ex.id === selectedId }"
            @click="selectedId = ex.id"
          >
            {{ pick(ex.title) }}
          </button>
        </li>
      </ul>

      <p class="play__goal">{{ pick(example.goal) }}</p>

      <BlockSorter
        :key="example.id"
        :blocks="example.blocks"
        :solution="example.solution"
        @change="onChange"
      />

      <div class="play__actions">
        <button type="button" class="play__run" :disabled="!order.length" @click="run">
          <PhPlay :size="18" weight="fill" aria-hidden="true" />
          {{ t('play.run') }}
        </button>
        <button type="button" class="play__clear" @click="resetRun">
          <PhArrowCounterClockwise :size="16" weight="bold" aria-hidden="true" />
          {{ t('play.reset') }}
        </button>
      </div>

      <div class="console" :class="{ 'is-ok': success }">
        <p class="console__bar">{{ t('play.output') }}</p>
        <div v-if="output && output.length" class="console__body">
          <p v-for="(line, i) in output" :key="i" class="console__line">
            <span class="console__prompt" aria-hidden="true">&gt;</span>{{ line }}
          </p>
        </div>
        <p v-else class="console__empty">{{ t('play.outputEmpty') }}</p>
        <p v-if="success" class="console__success" role="status">
          <PhSparkle :size="18" weight="fill" aria-hidden="true" />
          {{ t('lesson.exerciseSuccess') }}
        </p>
      </div>

      <p class="play__hint">{{ t('play.hint') }}</p>
    </section>
  </div>
</template>

<style scoped>
.play__head {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  margin-bottom: var(--s-8);
}

.play__panel {
  display: grid;
  gap: var(--s-5);
}

.play__label {
  font-size: var(--fs-xs);
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.examples {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

.example {
  min-height: 44px;
  padding: 0.5rem 1rem;
  border-radius: var(--r-pill);
  border: 2px solid var(--line-strong);
  background: var(--surface);
  color: var(--ink-soft);
  font-weight: 800;
  font-size: var(--fs-sm);
  transition:
    border-color 0.2s var(--ease-soft),
    color 0.2s var(--ease-soft),
    background-color 0.2s var(--ease-soft);
}

.example.is-active {
  border-color: transparent;
  background: var(--track);
  color: #fff;
  box-shadow: 0 8px 18px -10px var(--track);
}

.play__goal {
  padding: var(--s-4);
  border-radius: var(--r-md);
  background: var(--surface-2);
  border: 1px solid var(--line);
  font-weight: 700;
  color: var(--ink);
}

.play__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-3);
}

.play__run {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 50px;
  padding: 0.65rem 1.6rem;
  border-radius: var(--r-pill);
  background: var(--primary);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
  transition: background 0.2s var(--ease-soft), transform 0.16s var(--ease-pop);
}

.play__run:hover:not(:disabled) {
  background: var(--primary-strong);
}
.play__run:active:not(:disabled) {
  transform: translateY(1px) scale(0.99);
}
.play__run:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.play__clear {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 50px;
  padding: 0.65rem 1.3rem;
  border-radius: var(--r-pill);
  border: 2px solid var(--line-strong);
  background: var(--surface);
  color: var(--ink-soft);
  font-weight: 800;
}

.console {
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--ink);
  color: #f4f1ff;
}

.console.is-ok {
  box-shadow: 0 0 0 3px var(--mint);
}

.console__bar {
  padding: var(--s-2) var(--s-4);
  font-size: var(--fs-xs);
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #b7b3d0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.console__body {
  padding: var(--s-4);
  display: grid;
  gap: var(--s-2);
}

.console__line {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  display: flex;
  gap: var(--s-2);
  color: #d9f5ec;
}

.console__prompt {
  color: var(--mint);
  font-weight: 700;
}

.console__empty {
  padding: var(--s-5) var(--s-4);
  color: #8f8bb0;
  font-size: var(--fs-sm);
}

.console__success {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-3) var(--s-4);
  background: rgba(31, 191, 152, 0.18);
  color: #8ff0d4;
  font-weight: 800;
}

.play__hint {
  color: var(--ink-faint);
  font-size: var(--fs-sm);
}
</style>
