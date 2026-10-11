<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  PhArrowDown,
  PhArrowUp,
  PhCheckCircle,
  PhDotsSixVertical,
  PhPlus,
  PhX,
} from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import SpeechBubble from '../brand/SpeechBubble.vue'
import type { ExerciseBlock } from '../../data/tracks'

const props = defineProps<{
  blocks: ExerciseBlock[]
  solution: string[]
}>()

const emit = defineEmits<{ complete: []; change: [placed: string[]] }>()

const { t, pick } = useI18n()

const placed = ref<string[]>([])
const solved = ref(false)
const showHint = ref(false)
const dragIndex = ref<number | null>(null)

let hintTimer: number | undefined

const available = computed(() => props.blocks.filter((b) => !placed.value.includes(b.id)))

function armHint() {
  window.clearTimeout(hintTimer)
  showHint.value = false
  if (solved.value) return
  hintTimer = window.setTimeout(() => {
    if (!solved.value) showHint.value = true
  }, 12000)
}

function sync() {
  emit('change', [...placed.value])
  armHint()
}

function place(id: string) {
  if (solved.value) return
  placed.value.push(id)
  sync()
  check()
}

function unplace(index: number) {
  if (solved.value) return
  placed.value.splice(index, 1)
  sync()
}

function move(index: number, dir: -1 | 1) {
  if (solved.value) return
  const target = index + dir
  if (target < 0 || target >= placed.value.length) return
  const next = placed.value.slice()
  ;[next[index], next[target]] = [next[target], next[index]]
  placed.value = next
  sync()
}

function check() {
  const ok =
    placed.value.length === props.solution.length &&
    placed.value.every((id, i) => id === props.solution[i])
  if (ok) {
    solved.value = true
    showHint.value = false
    window.clearTimeout(hintTimer)
    emit('complete')
  }
}

function onDragStart(index: number, event: DragEvent) {
  dragIndex.value = index
  event.dataTransfer?.setData('text/plain', String(index))
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
}

function onDrop(index: number) {
  const from = dragIndex.value
  dragIndex.value = null
  if (from === null || from === index) return
  const next = placed.value.slice()
  const [item] = next.splice(from, 1)
  next.splice(index, 0, item)
  placed.value = next
  sync()
}

function reset() {
  placed.value = []
  solved.value = false
  showHint.value = false
  window.clearTimeout(hintTimer)
  emit('change', [])
}

function labelOf(id: string) {
  const block = props.blocks.find((b) => b.id === id)
  return block ? pick(block.label) : id
}

watch(() => props.solution, reset)
onMounted(armHint)
onBeforeUnmount(() => window.clearTimeout(hintTimer))
</script>

<template>
  <div class="sorter" :class="{ 'is-solved': solved }">
    <div class="sorter__workspace">
      <p class="sorter__label">{{ t('play.workspace') }}</p>
      <TransitionGroup v-if="placed.length" name="chip" tag="ol" class="sorter__placed">
        <li
          v-for="(id, i) in placed"
          :key="id"
          class="placed"
          draggable="true"
          @dragstart="onDragStart(i, $event)"
          @dragover="onDragOver"
          @drop="onDrop(i)"
        >
          <span class="placed__handle" aria-hidden="true">
            <PhDotsSixVertical :size="18" weight="bold" />
          </span>
          <span class="placed__index" aria-hidden="true">{{ i + 1 }}</span>
          <span class="placed__code chip__code">{{ labelOf(id) }}</span>
          <span class="placed__controls">
            <button
              type="button"
              class="placed__btn"
              :disabled="i === 0 || solved"
              :aria-label="t('lesson.moveUp')"
              @click="move(i, -1)"
            >
              <PhArrowUp :size="15" weight="bold" />
            </button>
            <button
              type="button"
              class="placed__btn"
              :disabled="i === placed.length - 1 || solved"
              :aria-label="t('lesson.moveDown')"
              @click="move(i, 1)"
            >
              <PhArrowDown :size="15" weight="bold" />
            </button>
            <button
              type="button"
              class="placed__btn placed__btn--remove"
              :disabled="solved"
              :aria-label="t('lesson.removeBlock')"
              @click="unplace(i)"
            >
              <PhX :size="15" weight="bold" />
            </button>
          </span>
        </li>
      </TransitionGroup>
      <p v-else class="sorter__empty">{{ t('play.workspaceEmpty') }}</p>
    </div>

    <div v-if="available.length" class="sorter__available">
      <p class="sorter__label">{{ t('play.blocks') }}</p>
      <ul class="sorter__pool">
        <li v-for="block in available" :key="block.id">
          <button type="button" class="chip" @click="place(block.id)">
            <PhPlus :size="15" weight="bold" aria-hidden="true" />
            <span class="chip__code">{{ pick(block.label) }}</span>
          </button>
        </li>
      </ul>
    </div>

    <SpeechBubble v-if="showHint && !solved" :text="t('kuri.hint')" expression="think" />

    <p v-if="solved" class="sorter__success" role="status">
      <PhCheckCircle :size="20" weight="fill" aria-hidden="true" />
      {{ t('lesson.exerciseSuccess') }}
    </p>

    <button v-if="placed.length && !solved" type="button" class="sorter__reset" @click="reset">
      {{ t('common.reset') }}
    </button>
  </div>
</template>

<style scoped>
.sorter {
  display: grid;
  gap: var(--s-4);
  padding: var(--s-5);
  border-radius: var(--r-lg);
  background: var(--surface-2);
  border: 1px dashed var(--line-strong);
  transition: background-color 0.3s var(--ease-soft), border-color 0.3s var(--ease-soft);
}

.sorter.is-solved {
  border-color: var(--success);
  background: var(--success-soft);
}

.sorter__label {
  font-size: var(--fs-xs);
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: var(--s-2);
}

.sorter__placed,
.sorter__pool {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

.sorter__placed {
  flex-direction: column;
  flex-wrap: nowrap;
}

.sorter__empty {
  color: var(--ink-faint);
  font-size: var(--fs-sm);
  padding: var(--s-3) 0;
}

.placed {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 52px;
  padding: 0.4rem 0.5rem 0.4rem 0.25rem;
  border-radius: var(--r-md);
  background: var(--surface);
  border: 2px solid var(--grape);
  cursor: grab;
}

.placed:active {
  cursor: grabbing;
}

.placed__handle {
  display: grid;
  place-items: center;
  color: var(--ink-faint);
  padding-inline: 0.15rem;
}

.placed__index {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex: none;
  border-radius: var(--r-pill);
  background: var(--grape-soft);
  color: var(--grape-strong);
  font-size: var(--fs-xs);
  font-weight: 800;
}

.placed__code {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
}

.placed__controls {
  display: inline-flex;
  gap: 0.15rem;
  flex: none;
}

.placed__btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--r-sm);
  color: var(--ink-soft);
  background: var(--surface-2);
  transition: background-color 0.15s var(--ease-soft), color 0.15s var(--ease-soft);
}

.placed__btn:hover:not(:disabled) {
  background: var(--grape-soft);
  color: var(--grape-strong);
}

.placed__btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.placed__btn--remove:hover:not(:disabled) {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 44px;
  padding: 0.5rem 0.85rem;
  border-radius: var(--r-md);
  background: var(--surface);
  border: 2px solid var(--line-strong);
  color: var(--ink);
  font-weight: 700;
  font-size: var(--fs-sm);
  font-family: var(--font-mono);
  text-align: left;
  transition:
    transform 0.16s var(--ease-pop),
    border-color 0.2s var(--ease-soft),
    background-color 0.2s var(--ease-soft);
}

.chip:hover {
  border-color: var(--primary);
}

.chip:active {
  transform: scale(0.97);
}

.chip__code {
  white-space: pre;
  font-family: var(--font-mono);
  font-weight: 700;
}

.sorter__success {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--mint-strong);
  font-weight: 800;
}

.sorter__reset {
  justify-self: start;
  color: var(--ink-faint);
  font-weight: 700;
  font-size: var(--fs-sm);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.chip-move,
.chip-enter-active,
.chip-leave-active {
  transition:
    opacity 0.2s var(--ease-soft),
    transform 0.2s var(--ease-soft);
}

.chip-enter-from,
.chip-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.chip-leave-active {
  position: absolute;
}
</style>
