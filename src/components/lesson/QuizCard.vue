<script setup lang="ts">
import { computed, ref } from 'vue'
import { PhCheckCircle, PhXCircle } from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import type { Quiz } from '../../data/tracks'

const props = defineProps<{ quiz: Quiz }>()
const emit = defineEmits<{ correct: [] }>()

const { t, pick } = useI18n()

const selected = ref<string | null>(null)
const checked = ref(false)

const isCorrect = computed(() => checked.value && selected.value === props.quiz.answer)

function choose(id: string) {
  if (checked.value && isCorrect.value) return
  selected.value = id
  checked.value = false
}

function check() {
  if (!selected.value) return
  checked.value = true
  if (selected.value === props.quiz.answer) emit('correct')
}

function retry() {
  checked.value = false
  selected.value = null
}
</script>

<template>
  <div class="quiz">
    <p class="quiz__question">{{ pick(quiz.question) }}</p>

    <ul class="quiz__options">
      <li v-for="option in quiz.options" :key="option.id">
        <button
          type="button"
          class="quiz__option"
          :class="{
            'is-selected': selected === option.id,
            'is-correct': checked && option.id === quiz.answer,
            'is-wrong': checked && selected === option.id && option.id !== quiz.answer,
          }"
          :aria-pressed="selected === option.id"
          @click="choose(option.id)"
        >
          <span class="quiz__mark" aria-hidden="true"></span>
          <span>{{ pick(option.label) }}</span>
        </button>
      </li>
    </ul>

    <div class="quiz__actions">
      <button
        v-if="!checked"
        type="button"
        class="quiz__check"
        :disabled="!selected"
        @click="check"
      >
        {{ t('common.check') }}
      </button>
      <button v-else-if="!isCorrect" type="button" class="quiz__check" @click="retry">
        {{ t('common.tryAgain') }}
      </button>
    </div>

    <p v-if="checked" class="quiz__feedback" :class="isCorrect ? 'is-ok' : 'is-no'" role="status">
      <component :is="isCorrect ? PhCheckCircle : PhXCircle" :size="20" weight="fill" aria-hidden="true" />
      <span>{{ isCorrect ? t('common.correct') : t('common.tryAgain') }} {{ pick(quiz.explain) }}</span>
    </p>
  </div>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: var(--s-4);
}

.quiz__question {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--fs-h3);
  color: var(--ink);
}

.quiz__options {
  display: grid;
  gap: var(--s-2);
}

.quiz__option {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  width: 100%;
  min-height: 52px;
  padding: var(--s-3) var(--s-4);
  border-radius: var(--r-md);
  border: 2px solid var(--line-strong);
  background: var(--surface);
  color: var(--ink);
  font-weight: 700;
  text-align: left;
  transition:
    border-color 0.2s var(--ease-soft),
    background-color 0.2s var(--ease-soft),
    transform 0.16s var(--ease-pop);
}

.quiz__option:hover {
  border-color: var(--grape);
}

.quiz__option:active {
  transform: scale(0.99);
}

.quiz__mark {
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: var(--r-pill);
  border: 3px solid var(--line-strong);
  transition: border-color 0.2s var(--ease-soft), background 0.2s var(--ease-soft);
}

.quiz__option.is-selected {
  border-color: var(--grape);
}
.quiz__option.is-selected .quiz__mark {
  border-color: var(--grape);
  background: var(--grape);
}

.quiz__option.is-correct {
  border-color: var(--success);
  background: var(--success-soft);
}
.quiz__option.is-correct .quiz__mark {
  border-color: var(--success);
  background: var(--success);
}

.quiz__option.is-wrong {
  border-color: var(--primary);
  background: var(--primary-soft);
}
.quiz__option.is-wrong .quiz__mark {
  border-color: var(--primary);
  background: var(--primary);
}

.quiz__actions {
  display: flex;
  gap: var(--s-3);
}

.quiz__check {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 48px;
  padding: 0.6rem 1.5rem;
  border-radius: var(--r-pill);
  background: var(--primary);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 600;
  transition: background 0.2s var(--ease-soft), transform 0.16s var(--ease-pop);
}

.quiz__check:hover:not(:disabled) {
  background: var(--primary-strong);
}

.quiz__check:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quiz__feedback {
  display: flex;
  align-items: flex-start;
  gap: var(--s-2);
  padding: var(--s-3) var(--s-4);
  border-radius: var(--r-md);
  font-weight: 600;
  line-height: 1.45;
}

.quiz__feedback.is-ok {
  background: var(--success-soft);
  color: var(--mint-strong);
}
.quiz__feedback.is-no {
  background: var(--warn-soft);
  color: var(--sunny-strong);
}

.quiz__feedback :deep(svg) {
  flex: none;
  margin-top: 2px;
}
</style>
