<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  PhArrowCounterClockwise,
  PhChatCircleText,
  PhPauseCircle,
  PhSignOut,
  PhSpeakerHigh,
  PhTextT,
  PhTranslate,
  PhUserCircle,
  PhVibrate,
  PhX,
} from '@phosphor-icons/vue'
import { useI18n } from '../../i18n'
import { useSettings, type MotionPref, type TextScale } from '../../composables/useSettings'
import { useProgress } from '../../composables/useProgress'
import { useRewards } from '../../composables/useRewards'
import { useAuth } from '../../composables/useAuth'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { t, lang, setLang } = useI18n()
const { settings, toggle, set } = useSettings()
const { clear: clearProgress } = useProgress()
const { clear: clearRewards } = useRewards()
const { user, signOut } = useAuth()
const router = useRouter()

const panel = ref<HTMLElement | null>(null)
const confirming = ref(false)

watch(
  () => props.open,
  async (open) => {
    if (open) {
      confirming.value = false
      await nextTick()
      panel.value?.focus()
    }
  },
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

function doReset() {
  clearProgress()
  clearRewards()
  confirming.value = false
}

function logout() {
  signOut()
  emit('close')
  router.replace('/masuk')
}

function setTextScale(value: TextScale) {
  set('textScale', value)
}
function setMotion(value: MotionPref) {
  set('motion', value)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="open" class="sheet" @click.self="emit('close')" @keydown="onKeydown">
        <div
          ref="panel"
          class="sheet__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="t('settings.title')"
          tabindex="-1"
        >
          <header class="sheet__head">
            <div>
              <h2 class="sheet__title">{{ t('settings.title') }}</h2>
              <p class="sheet__sub">{{ t('settings.subtitle') }}</p>
            </div>
            <button type="button" class="sheet__close" :aria-label="t('common.close')" @click="emit('close')">
              <PhX :size="20" weight="bold" aria-hidden="true" />
            </button>
          </header>

          <div class="sheet__body">
            <!-- Account -->
            <section v-if="user" class="set set--account">
              <div class="set__info">
                <span class="set__icon"><PhUserCircle :size="20" weight="fill" aria-hidden="true" /></span>
                <span class="set__texts">
                  <span class="set__name">{{ t('auth.greeting', { name: user.name }) }}</span>
                  <span class="set__desc">{{ t('auth.demoNote') }}</span>
                </span>
              </div>
              <button type="button" class="danger-btn" @click="logout">
                <PhSignOut :size="16" weight="bold" aria-hidden="true" />
                {{ t('auth.logout') }}
              </button>
            </section>

            <!-- Language -->
            <section class="set">
              <div class="set__info">
                <span class="set__icon"><PhTranslate :size="18" weight="fill" aria-hidden="true" /></span>
                <span class="set__name">{{ t('settings.language') }}</span>
              </div>
              <div class="seg" role="group" :aria-label="t('settings.language')">
                <button type="button" class="seg__btn" :class="{ 'is-on': lang === 'id' }" @click="setLang('id')">
                  {{ t('lang.id') }}
                </button>
                <button type="button" class="seg__btn" :class="{ 'is-on': lang === 'en' }" @click="setLang('en')">
                  {{ t('lang.en') }}
                </button>
              </div>
            </section>

            <!-- Sound -->
            <section class="set">
              <div class="set__info">
                <span class="set__icon"><PhSpeakerHigh :size="18" weight="fill" aria-hidden="true" /></span>
                <span class="set__texts">
                  <span class="set__name">{{ t('settings.sound') }}</span>
                  <span class="set__desc">{{ t('settings.sound.desc') }}</span>
                </span>
              </div>
              <button
                type="button"
                class="switch"
                :class="{ 'is-on': settings.sound }"
                role="switch"
                :aria-checked="settings.sound"
                :aria-label="t('settings.sound')"
                @click="toggle('sound')"
              >
                <span class="switch__knob"></span>
              </button>
            </section>

            <!-- Haptics -->
            <section class="set">
              <div class="set__info">
                <span class="set__icon"><PhVibrate :size="18" weight="fill" aria-hidden="true" /></span>
                <span class="set__texts">
                  <span class="set__name">{{ t('settings.haptics') }}</span>
                  <span class="set__desc">{{ t('settings.haptics.desc') }}</span>
                </span>
              </div>
              <button
                type="button"
                class="switch"
                :class="{ 'is-on': settings.haptics }"
                role="switch"
                :aria-checked="settings.haptics"
                :aria-label="t('settings.haptics')"
                @click="toggle('haptics')"
              >
                <span class="switch__knob"></span>
              </button>
            </section>

            <!-- Read aloud -->
            <section class="set">
              <div class="set__info">
                <span class="set__icon"><PhChatCircleText :size="18" weight="fill" aria-hidden="true" /></span>
                <span class="set__texts">
                  <span class="set__name">{{ t('settings.readAloud') }}</span>
                  <span class="set__desc">{{ t('settings.readAloud.desc') }}</span>
                </span>
              </div>
              <button
                type="button"
                class="switch"
                :class="{ 'is-on': settings.readAloud }"
                role="switch"
                :aria-checked="settings.readAloud"
                :aria-label="t('settings.readAloud')"
                @click="toggle('readAloud')"
              >
                <span class="switch__knob"></span>
              </button>
            </section>

            <!-- Text scale -->
            <section class="set">
              <div class="set__info">
                <span class="set__icon"><PhTextT :size="18" weight="fill" aria-hidden="true" /></span>
                <span class="set__name">{{ t('settings.textScale') }}</span>
              </div>
              <div class="seg" role="group" :aria-label="t('settings.textScale')">
                <button
                  type="button"
                  class="seg__btn"
                  :class="{ 'is-on': settings.textScale === 'normal' }"
                  @click="setTextScale('normal')"
                >
                  {{ t('settings.textScale.normal') }}
                </button>
                <button
                  type="button"
                  class="seg__btn"
                  :class="{ 'is-on': settings.textScale === 'large' }"
                  @click="setTextScale('large')"
                >
                  {{ t('settings.textScale.large') }}
                </button>
              </div>
            </section>

            <!-- Motion -->
            <section class="set">
              <div class="set__info">
                <span class="set__icon"><PhPauseCircle :size="18" weight="fill" aria-hidden="true" /></span>
                <span class="set__name">{{ t('settings.motion') }}</span>
              </div>
              <div class="seg" role="group" :aria-label="t('settings.motion')">
                <button
                  type="button"
                  class="seg__btn"
                  :class="{ 'is-on': settings.motion === 'auto' }"
                  @click="setMotion('auto')"
                >
                  {{ t('settings.motion.auto') }}
                </button>
                <button
                  type="button"
                  class="seg__btn"
                  :class="{ 'is-on': settings.motion === 'reduced' }"
                  @click="setMotion('reduced')"
                >
                  {{ t('settings.motion.reduced') }}
                </button>
              </div>
            </section>

            <!-- Reset -->
            <section class="set set--danger">
              <div class="set__info">
                <span class="set__icon"><PhArrowCounterClockwise :size="18" weight="fill" aria-hidden="true" /></span>
                <span class="set__texts">
                  <span class="set__name">{{ t('settings.reset') }}</span>
                  <span class="set__desc">{{ t('settings.reset.desc') }}</span>
                </span>
              </div>
              <button v-if="!confirming" type="button" class="danger-btn" @click="confirming = true">
                {{ t('settings.reset') }}
              </button>
            </section>

            <div v-if="confirming" class="confirm">
              <p>{{ t('settings.reset.confirm') }}</p>
              <div class="confirm__actions">
                <button type="button" class="danger-btn" @click="doReset">{{ t('settings.reset.yes') }}</button>
                <button type="button" class="ghost-btn" @click="confirming = false">{{ t('common.cancel') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(43, 42, 61, 0.4);
}

.sheet__panel {
  width: 100%;
  max-width: 520px;
  max-height: 88dvh;
  overflow-y: auto;
  background: var(--cloud);
  border-radius: var(--r-xl) var(--r-xl) 0 0;
  box-shadow: var(--shadow-lg);
  padding: var(--s-5) var(--s-5) calc(var(--s-6) + env(safe-area-inset-bottom, 0px));
  outline: none;
}

.sheet__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

.sheet__title {
  font-size: var(--fs-h3);
}

.sheet__sub {
  color: var(--ink-soft);
  font-size: var(--fs-sm);
  margin-top: 0.15rem;
}

.sheet__close {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  color: var(--ink-soft);
}
.sheet__close:hover {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.sheet__body {
  display: grid;
  gap: var(--s-3);
}

.set {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  padding: var(--s-3);
  border-radius: var(--r-md);
  background: var(--surface);
  border: 1px solid var(--line);
}

.set__info {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  min-width: 0;
}

.set__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: var(--r-sm);
  background: var(--surface-2);
  color: var(--ink-soft);
}

.set__texts {
  display: grid;
  min-width: 0;
}

.set__name {
  font-weight: 800;
  font-size: var(--fs-sm);
}

.set__desc {
  font-size: var(--fs-xs);
  color: var(--ink-faint);
  line-height: 1.35;
}

.set--danger .set__icon {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.set--account {
  background: linear-gradient(140deg, var(--primary-tint), var(--surface));
  border-color: var(--primary-soft);
}

.set--account .set__icon {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

/* Switch */
.switch {
  position: relative;
  flex: none;
  width: 52px;
  height: 30px;
  border-radius: var(--r-pill);
  background: var(--line-strong);
  transition: background-color 0.2s var(--ease-soft);
}

.switch.is-on {
  background: var(--success);
}

.switch__knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: var(--r-pill);
  background: #fff;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s var(--ease-pop);
}

.switch.is-on .switch__knob {
  transform: translateX(22px);
}

/* Segmented */
.seg {
  display: inline-flex;
  flex: none;
  padding: 3px;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  border: 1px solid var(--line);
}

.seg__btn {
  padding: 0.35rem 0.8rem;
  border-radius: var(--r-pill);
  font-size: var(--fs-sm);
  font-weight: 800;
  color: var(--ink-soft);
  transition: background-color 0.2s var(--ease-soft), color 0.2s var(--ease-soft);
}

.seg__btn.is-on {
  background: var(--surface);
  color: var(--primary-strong);
  box-shadow: var(--shadow-sm);
}

.danger-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-1);
  flex: none;
  min-height: 40px;
  padding: 0.4rem 1rem;
  border-radius: var(--r-pill);
  background: var(--primary-soft);
  color: var(--primary-strong);
  font-weight: 800;
  font-size: var(--fs-sm);
}
.danger-btn:hover {
  background: #ffd5cb;
}

.ghost-btn {
  min-height: 40px;
  padding: 0.4rem 1rem;
  border-radius: var(--r-pill);
  background: var(--surface-2);
  color: var(--ink-soft);
  font-weight: 800;
  font-size: var(--fs-sm);
}

.confirm {
  display: grid;
  gap: var(--s-3);
  padding: var(--s-3);
  border-radius: var(--r-md);
  background: var(--surface);
  border: 1px solid var(--primary-soft);
  font-weight: 700;
}

.confirm__actions {
  display: flex;
  gap: var(--s-2);
}

/* Transition */
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.24s var(--ease-soft);
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-active .sheet__panel,
.sheet-leave-active .sheet__panel {
  transition: transform 0.28s var(--ease-soft);
}
.sheet-enter-from .sheet__panel,
.sheet-leave-to .sheet__panel {
  transform: translateY(24px);
}

@media (min-width: 560px) {
  .sheet {
    align-items: center;
  }
  .sheet__panel {
    border-radius: var(--r-xl);
    max-height: 84dvh;
  }
}
</style>
