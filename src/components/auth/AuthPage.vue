<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PhArrowRight, PhCheckCircle, PhEye, PhEyeSlash, PhLockSimple } from '@phosphor-icons/vue'
import Mascot from '../brand/Mascot.vue'
import LanguageToggle from '../ui/LanguageToggle.vue'
import { useI18n } from '../../i18n'
import { useAuth } from '../../composables/useAuth'
import { useSound } from '../../composables/useSound'
import { useConfetti } from '../../composables/useConfetti'

const props = defineProps<{ mode: 'login' | 'register' }>()

const { t } = useI18n()
const { signIn } = useAuth()
const { play } = useSound()
const { burst } = useConfetti()
const route = useRoute()
const router = useRouter()

const name = ref('')
const pin = ref('')
const showPin = ref(false)
const touched = ref({ name: false, pin: false })
const submitting = ref(false)
const shake = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)
const pinInput = ref<HTMLInputElement | null>(null)

const isRegister = computed(() => props.mode === 'register')
const eyebrow = computed(() =>
  isRegister.value ? t('auth.register.eyebrow') : t('auth.login.eyebrow'),
)
const title = computed(() => (isRegister.value ? t('auth.register.title') : t('auth.login.title')))
const lead = computed(() => (isRegister.value ? t('auth.register.lead') : t('auth.login.lead')))
const submitLabel = computed(() =>
  isRegister.value ? t('auth.register.submit') : t('auth.login.submit'),
)

const nameError = computed(() =>
  touched.value.name && name.value.trim().length < 1 ? t('auth.needName') : '',
)
const pinError = computed(() =>
  touched.value.pin && !/^\d{4}$/.test(pin.value) ? t('auth.needPin') : '',
)
const firstError = computed(() => nameError.value || pinError.value)
const canSubmit = computed(() => name.value.trim().length > 0 && /^\d{4}$/.test(pin.value))

onMounted(() => nameInput.value?.focus())

function onPinInput(event: Event) {
  const target = event.target as HTMLInputElement
  pin.value = target.value.replace(/\D/g, '').slice(0, 4)
}

function triggerShake() {
  shake.value = true
  window.setTimeout(() => (shake.value = false), 460)
}

function submit() {
  if (submitting.value) return
  touched.value = { name: true, pin: true }
  if (firstError.value || !canSubmit.value) {
    triggerShake()
    if (nameError.value) nameInput.value?.focus()
    else pinInput.value?.focus()
    return
  }
  submitting.value = true
  window.setTimeout(() => {
    signIn(name.value)
    play('correct')
    void burst({ kind: 'small', originY: 0.5 })
    const redirect = route.query.redirect
    router.replace(typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/')
  }, 420)
}
</script>

<template>
  <div class="auth">
    <aside class="auth__art" aria-hidden="true">
      <div class="auth__art-inner">
        <div class="auth__blob">
          <Mascot :size="164" float expression="happy" decorative />
        </div>
        <p class="auth__bubble">{{ t('home.hero.bubble') }}</p>
        <ul class="auth__benefits">
          <li>
            <PhCheckCircle :size="20" weight="fill" />
            {{ t('auth.benefit.1') }}
          </li>
          <li>
            <PhCheckCircle :size="20" weight="fill" />
            {{ t('auth.benefit.2') }}
          </li>
          <li>
            <PhCheckCircle :size="20" weight="fill" />
            {{ t('auth.benefit.3') }}
          </li>
        </ul>
      </div>
    </aside>

    <div class="auth__panel">
      <header class="auth__topbar">
        <RouterLink to="/" class="auth__brand">
          <Mascot :size="30" decorative />
          <span>{{ t('app.name') }}</span>
        </RouterLink>
        <LanguageToggle />
      </header>

      <div class="auth__form-wrap">
        <nav class="auth__tabs" :aria-label="t('auth.account')">
          <RouterLink
            to="/masuk"
            class="auth__tab"
            :class="{ 'is-active': !isRegister }"
            :aria-current="!isRegister ? 'page' : undefined"
          >
            {{ t('auth.tab.login') }}
          </RouterLink>
          <RouterLink
            to="/daftar"
            class="auth__tab"
            :class="{ 'is-active': isRegister }"
            :aria-current="isRegister ? 'page' : undefined"
          >
            {{ t('auth.tab.register') }}
          </RouterLink>
        </nav>

        <span class="eyebrow">{{ eyebrow }}</span>
        <h1 class="auth__title">{{ title }}</h1>
        <p class="lead auth__lead">{{ lead }}</p>

        <form class="auth__form" :class="{ 'is-shaking': shake }" novalidate @submit.prevent="submit">
          <div class="field">
            <label class="field__label" for="auth-name">{{ t('auth.name') }}</label>
            <div class="field__control" :class="{ 'has-error': nameError }">
              <input
                id="auth-name"
                ref="nameInput"
                v-model="name"
                type="text"
                :placeholder="t('auth.name.placeholder')"
                autocomplete="given-name"
                maxlength="24"
                :aria-invalid="!!nameError"
                :aria-describedby="nameError ? 'auth-name-err' : undefined"
                @blur="touched.name = true"
              />
            </div>
            <p v-if="nameError" id="auth-name-err" class="field__error">{{ nameError }}</p>
          </div>

          <div class="field">
            <label class="field__label" for="auth-pin">{{ t('auth.pin') }}</label>
            <div class="field__control" :class="{ 'has-error': pinError, 'has-peek': true }">
              <input
                id="auth-pin"
                ref="pinInput"
                :value="pin"
                :type="showPin ? 'text' : 'password'"
                inputmode="numeric"
                pattern="[0-9]*"
                class="field__pin"
                :placeholder="t('auth.pin.placeholder')"
                autocomplete="off"
                maxlength="4"
                :aria-invalid="!!pinError"
                :aria-describedby="pinError ? 'auth-pin-err' : 'auth-pin-hint'"
                @input="onPinInput"
                @blur="touched.pin = true"
              />
              <button
                type="button"
                class="field__peek"
                :aria-label="showPin ? t('auth.pin.hide') : t('auth.pin.show')"
                :aria-pressed="showPin"
                @click="showPin = !showPin"
              >
                <PhEyeSlash v-if="showPin" :size="20" weight="bold" />
                <PhEye v-else :size="20" weight="bold" />
              </button>
            </div>
            <div class="field__meta">
              <span v-if="pinError" id="auth-pin-err" class="field__error">{{ pinError }}</span>
              <span v-else id="auth-pin-hint" class="field__hint">{{ t('auth.pin.hint') }}</span>
              <span class="field__count" :class="{ 'is-full': pin.length === 4 }">
                {{ t('auth.pin.count', { n: pin.length }) }}
              </span>
            </div>
          </div>

          <button type="submit" class="auth__submit" :class="{ 'is-ready': canSubmit }">
            <span v-if="!submitting" class="auth__submit-label">
              {{ submitLabel }}
              <PhArrowRight :size="18" weight="bold" aria-hidden="true" />
            </span>
            <span v-else class="auth__submit-label">
              <span class="auth__spinner" aria-hidden="true"></span>
              {{ t('auth.submitting') }}
            </span>
          </button>
        </form>

        <p class="auth__note">
          <PhLockSimple :size="15" weight="bold" aria-hidden="true" />
          {{ t('auth.demoNote') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100dvh;
  background: var(--cloud);
}

/* ------------------------------ Art panel ------------------------------ */
.auth__art {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--s-6) var(--s-5) var(--s-5);
  background:
    radial-gradient(120% 90% at 20% 0%, var(--primary-soft), transparent 60%),
    radial-gradient(120% 90% at 90% 20%, var(--sunny-soft), transparent 55%),
    linear-gradient(170deg, var(--primary-tint), var(--cloud-2));
  overflow: hidden;
}

.auth__art::after {
  content: '';
  position: absolute;
  inset: auto -10% -40% -10%;
  height: 60%;
  background: radial-gradient(50% 60% at 50% 50%, rgba(255, 122, 102, 0.18), transparent 70%);
  pointer-events: none;
}

.auth__art-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--s-4);
  text-align: center;
}

.auth__blob {
  display: grid;
  place-items: center;
  width: 188px;
  height: 188px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, #fff, var(--surface-2));
  box-shadow: var(--shadow-lg), inset 0 0 0 8px rgba(255, 255, 255, 0.6);
}

.auth__bubble {
  max-width: 24ch;
  padding: var(--s-3) var(--s-4);
  border-radius: var(--r-lg);
  background: var(--surface);
  border: 2px solid var(--line-strong);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--ink);
}

.auth__benefits {
  display: none;
  gap: var(--s-2);
}

.auth__benefits li {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  font-weight: 700;
  font-size: var(--fs-sm);
  color: var(--ink-soft);
}

.auth__benefits svg {
  color: var(--mint);
  flex: none;
}

/* ------------------------------ Form panel ------------------------------ */
.auth__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--s-5) var(--s-5) var(--s-10);
  background: var(--surface);
}

.auth__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  margin-bottom: var(--s-6);
}

.auth__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
}

.auth__form-wrap {
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  animation: rise 0.5s var(--ease-soft) both;
}

/* ------------------------------ Tabs ------------------------------ */
.auth__tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-1);
  padding: var(--s-1);
  margin-bottom: var(--s-6);
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: var(--r-pill);
}

.auth__tab {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: var(--r-pill);
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--ink-soft);
  transition:
    background 0.22s var(--ease-soft),
    color 0.22s var(--ease-soft),
    box-shadow 0.22s var(--ease-soft);
}

.auth__tab.is-active {
  background: var(--surface);
  color: var(--primary-strong);
  box-shadow: var(--shadow-sm);
}

.auth__title {
  font-size: var(--fs-h2);
  margin-top: var(--s-2);
}

.auth__lead {
  margin-top: var(--s-2);
  margin-bottom: var(--s-6);
}

/* ------------------------------ Form ------------------------------ */
.auth__form {
  display: grid;
  gap: var(--s-5);
}

.auth__form.is-shaking {
  animation: shake 0.42s var(--ease-soft);
}

.field {
  display: grid;
  gap: var(--s-2);
}

.field__label {
  font-weight: 800;
  font-size: var(--fs-sm);
  color: var(--ink);
}

.field__control {
  position: relative;
  display: flex;
  align-items: center;
  border: 2px solid var(--line-strong);
  border-radius: var(--r-md);
  background: var(--surface);
  transition:
    border-color 0.2s var(--ease-soft),
    box-shadow 0.2s var(--ease-soft);
}

.field__control:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-tint);
}

.field__control.has-error {
  border-color: var(--primary-strong);
}

.field__control input {
  flex: 1;
  width: 100%;
  min-height: 54px;
  padding: 0.7rem 1rem;
  border: none;
  background: transparent;
  border-radius: var(--r-md);
  font-weight: 700;
  font-size: 1.05rem;
}

.field__control input:focus {
  outline: none;
}

.field__control input::placeholder {
  color: var(--ink-faint);
  font-weight: 600;
}

.field__pin {
  letter-spacing: 0.55em;
  font-size: 1.4rem;
  text-align: center;
}

.field__control.has-peek input {
  padding-right: 3.25rem;
}

.field__peek {
  position: absolute;
  right: var(--s-2);
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--r-pill);
  color: var(--ink-faint);
  transition:
    background 0.18s var(--ease-soft),
    color 0.18s var(--ease-soft);
}

.field__peek:hover {
  background: var(--surface-2);
  color: var(--ink-soft);
}

.field__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-2);
}

.field__hint {
  font-size: var(--fs-xs);
  color: var(--ink-faint);
}

.field__error {
  font-size: var(--fs-sm);
  font-weight: 800;
  color: var(--primary-strong);
}

.field__count {
  margin-left: auto;
  font-size: var(--fs-xs);
  font-weight: 800;
  color: var(--ink-faint);
  white-space: nowrap;
}

.field__count.is-full {
  color: var(--mint-strong);
}

/* ------------------------------ Submit ------------------------------ */
.auth__submit {
  margin-top: var(--s-2);
  min-height: 56px;
  border-radius: var(--r-pill);
  background: var(--primary-soft);
  color: var(--primary-strong);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.1rem;
  transition:
    background 0.24s var(--ease-soft),
    color 0.24s var(--ease-soft),
    box-shadow 0.24s var(--ease-soft),
    transform 0.16s var(--ease-pop);
}

.auth__submit.is-ready {
  background: var(--primary);
  color: #fff;
  box-shadow: 0 12px 26px -12px rgba(226, 72, 47, 0.8);
}

.auth__submit.is-ready:hover {
  background: var(--primary-strong);
}

.auth__submit:active {
  transform: translateY(1px) scale(0.99);
}

.auth__submit-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
}

.auth__spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2.5px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  animation: spin 0.7s linear infinite;
}

.auth__note {
  display: flex;
  align-items: flex-start;
  gap: var(--s-2);
  margin-top: var(--s-6);
  font-size: var(--fs-xs);
  color: var(--ink-faint);
  line-height: 1.5;
}

.auth__note svg {
  flex: none;
  margin-top: 0.15rem;
  color: var(--mint-strong);
}

/* ------------------------------ Motion ------------------------------ */
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-7px);
  }
  40% {
    transform: translateX(6px);
  }
  60% {
    transform: translateX(-4px);
  }
  80% {
    transform: translateX(3px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ------------------------------ Desktop split ------------------------------ */
@media (min-width: 900px) {
  .auth {
    grid-template-columns: 1.02fr 1fr;
  }

  .auth__art {
    align-items: center;
    padding: var(--s-12);
  }

  .auth__art-inner {
    gap: var(--s-6);
  }

  .auth__blob {
    width: 224px;
    height: 224px;
  }

  .auth__benefits {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: var(--s-3);
    margin-top: var(--s-4);
  }

  .auth__panel {
    justify-content: center;
    padding: var(--s-12);
  }

  .auth__topbar {
    position: absolute;
    top: var(--s-8);
    right: var(--s-8);
    margin: 0;
  }
}
</style>
