<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  PhArrowLeft,
  PhArrowRight,
  PhBookOpenText,
  PhConfetti,
  PhShieldCheck,
  PhSparkle,
  PhTrophy,
  PhX,
} from '@phosphor-icons/vue'
import Mascot from '../brand/Mascot.vue'
import { useI18n } from '../../i18n'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()

const panel = ref<HTMLElement | null>(null)
const current = ref(0)

const steps = computed(() => [
  {
    icon: PhSparkle,
    title: t('onboarding.step1.title'),
    body: t('onboarding.step1.body'),
    mascot: 'happy' as const,
  },
  {
    icon: PhBookOpenText,
    title: t('onboarding.step2.title'),
    body: t('onboarding.step2.body'),
    mascot: 'think' as const,
  },
  {
    icon: PhArrowRight,
    title: t('onboarding.step3.title'),
    body: t('onboarding.step3.body'),
    mascot: 'happy' as const,
  },
  {
    icon: PhTrophy,
    title: t('onboarding.step4.title'),
    body: t('onboarding.step4.body'),
    mascot: 'cheer' as const,
  },
  {
    icon: PhShieldCheck,
    title: t('onboarding.step5.title'),
    body: t('onboarding.step5.body'),
    mascot: 'happy' as const,
  },
])

const total = computed(() => steps.value.length)
const active = computed(() => steps.value[current.value])
const isLast = computed(() => current.value === total.value - 1)

watch(
  () => props.open,
  async (open) => {
    if (open) {
      current.value = 0
      await nextTick()
      panel.value?.focus()
    }
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key === 'ArrowRight') {
    next()
    return
  }
  if (event.key === 'ArrowLeft') {
    prev()
    return
  }
}

function next() {
  if (isLast.value) {
    emit('close')
    return
  }
  current.value = Math.min(current.value + 1, total.value - 1)
}

function prev() {
  current.value = Math.max(current.value - 1, 0)
}

function skip() {
  emit('close')
}

// finish function removed - use emit('close') directly

function goTo(index: number) {
  current.value = index
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="open" class="onb" @click.self="emit('close')">
        <div
          ref="panel"
          class="onb__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="t('onboarding.title')"
          tabindex="-1"
        >
          <header class="onb__head">
            <div class="onb__brand">
              <Mascot :size="32" decorative />
              <span>{{ t('app.name') }}</span>
            </div>
            <button type="button" class="onb__close" :aria-label="t('common.close')" @click="emit('close')">
              <PhX :size="18" weight="bold" aria-hidden="true" />
            </button>
          </header>

          <div class="onb__hero">
            <div class="onb__blob">
              <Mascot :size="150" :expression="active.mascot" float decorative />
            </div>
            <div class="onb__pills">
              <span v-for="(_, i) in steps" :key="i" class="pill" :class="{ 'is-on': i === current }" @click="goTo(i)" />
            </div>
          </div>

          <div class="onb__body">
            <span class="eyebrow">{{ t('onboarding.welcome') }}</span>
            <h2 class="onb__title">{{ active.title }}</h2>
            <p class="onb__lead">{{ active.body }}</p>
          </div>

          <footer class="onb__foot">
            <button type="button" class="ghost-btn" @click="skip">
              {{ t('onboarding.skip') }}
            </button>
            <div class="onb__actions">
              <button v-if="current > 0" type="button" class="ghost-btn" @click="prev">
                <PhArrowLeft :size="16" weight="bold" aria-hidden="true" />
                {{ t('onboarding.prev') }}
              </button>
              <button type="button" class="primary-btn" @click="next">
                <template v-if="!isLast">
                  {{ t('onboarding.next') }}
                  <PhArrowRight :size="16" weight="bold" aria-hidden="true" />
                </template>
                <template v-else>
                  {{ t('onboarding.done') }}
                  <PhConfetti :size="16" weight="fill" aria-hidden="true" />
                </template>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.onb {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(43, 42, 61, 0.45);
  padding: var(--s-3);
}

.onb__panel {
  width: 100%;
  max-width: 460px;
  border-radius: var(--r-xl);
  background: var(--surface);
  border: 2px solid var(--line);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  outline: none;
  overflow: hidden;
  animation: rise 0.32s var(--ease-soft) both;
}

.onb__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--s-3) var(--s-5);
  border-bottom: 1px solid var(--line);
}

.onb__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  font-family: var(--font-display);
  font-weight: 700;
}

.onb__close {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  color: var(--ink-soft);
}

.onb__close:hover {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.onb__hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-4);
  padding: var(--s-6) var(--s-5) var(--s-4);
  background: radial-gradient(140% 120% at 50% 0%, var(--primary-tint), transparent 70%);
}

.onb__blob {
  display: grid;
  place-items: center;
  width: 176px;
  height: 176px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, #fff, var(--surface-2));
  box-shadow: var(--shadow-md), inset 0 0 0 8px rgba(255, 255, 255, 0.7);
}

.onb__pills {
  display: flex;
  gap: var(--s-2);
}

.pill {
  width: 9px;
  height: 9px;
  border-radius: var(--r-pill);
  background: var(--line-strong);
  transition: all 0.22s var(--ease-soft);
  cursor: pointer;
}

.pill.is-on {
  width: 28px;
  background: var(--primary);
}

.onb__body {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  padding: var(--s-5) var(--s-6) var(--s-4);
  text-align: center;
}

.onb__title {
  font-size: var(--fs-h3);
}

.onb__lead {
  color: var(--ink-soft);
  max-width: 38ch;
  margin-inline: auto;
}

.onb__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  padding: var(--s-3) var(--s-6) calc(var(--s-4) + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--line);
}

.onb__actions {
  display: flex;
  gap: var(--s-2);
}

.ghost-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 42px;
  padding: 0 1rem;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  color: var(--ink-soft);
  font-weight: 700;
  font-size: var(--fs-sm);
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 44px;
  padding: 0 1.4rem;
  border-radius: var(--r-pill);
  background: var(--primary);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 10px 22px -12px rgba(226, 72, 47, 0.8);
}

.primary-btn:hover {
  background: var(--primary-strong);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.22s var(--ease-soft);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-active .onb__panel,
.sheet-leave-active .onb__panel {
  transition: transform 0.24s var(--ease-soft);
}

.sheet-enter-from .onb__panel,
.sheet-leave-to .onb__panel {
  transform: translateY(18px);
}

@media (min-width: 520px) {
  .onb {
    align-items: center;
  }

  .onb__panel {
    border-radius: var(--r-xl);
  }
}
</style>