<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PhCheckCircle, PhArrowLineDown, PhArrowLineUp } from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import type { ExerciseBlock } from '../../data/tracks'

const props = defineProps<{
  blocks: ExerciseBlock[]
  solution: string[]
}>()

const emit = defineEmits<{ complete: []; change: [placed: string[]] }>()

const { t, pick } = useI18n()

const placed = ref<string[]>([])
const solved = ref(false)

const available = computed(() => props.blocks.filter((b) => !placed.value.includes(b.id)))

function place(id: string) {
  if (solved.value) return
  placed.value.push(id)
  emit('change', [...placed.value])
  check()
}

function unplace(id: string) {
  if (solved.value) return
  placed.value = placed.value.filter((x) => x !== id)
  emit('change', [...placed.value])
}

function check() {
  const ok =
    placed.value.length === props.solution.length &&
    placed.value.every((id, i) => id === props.solution[i])
  if (ok) {
    solved.value = true
    emit('complete')
  }
}

function reset() {
  placed.value = []
  solved.value = false
  emit('change', [])
}

function labelOf(id: string) {
  const block = props.blocks.find((b) => b.id === id)
  return block ? pick(block.label) : id
}

watch(
  () => props.solution,
  () => reset(),
)
</script>

<template>
  <div class="sorter" :class="{ 'is-solved': solved }">
    <div class="sorter__workspace">
      <p class="sorter__label">{{ t('play.workspace') }}</p>
      <TransitionGroup v-if="placed.length" name="chip" tag="ul" class="sorter__placed">
        <li v-for="id in placed" :key="id">
          <button type="button" class="chip chip--placed" @click="unplace(id)">
            <span class="chip__code">{{ labelOf(id) }}</span>
            <PhArrowLineUp :size="15" weight="bold" aria-hidden="true" />
          </button>
        </li>
      </TransitionGroup>
      <p v-else class="sorter__empty">{{ t('play.workspaceEmpty') }}</p>
    </div>

    <div v-if="available.length" class="sorter__available">
      <p class="sorter__label">{{ t('play.blocks') }}</p>
      <ul class="sorter__pool">
        <li v-for="block in available" :key="block.id">
          <button type="button" class="chip" @click="place(block.id)">
            <PhArrowLineDown :size="15" weight="bold" aria-hidden="true" />
            <span class="chip__code">{{ pick(block.label) }}</span>
          </button>
        </li>
      </ul>
    </div>

    <p v-if="solved" class="sorter__success" role="status">
      <PhCheckCircle :size="20" weight="fill" aria-hidden="true" />
      {{ t('lesson.exerciseSuccess') }}
    </p>

    <button v-if="placed.length" type="button" class="sorter__reset" @click="reset">
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

.sorter__empty {
  color: var(--ink-faint);
  font-size: var(--fs-sm);
  padding: var(--s-3) 0;
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

.chip--placed {
  background: var(--surface);
  border-color: var(--grape);
  color: var(--grape-strong);
}

.chip__code {
  white-space: pre;
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
