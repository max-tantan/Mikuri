import { reactive, watch } from 'vue'

export type TextScale = 'normal' | 'large'
export type MotionPref = 'auto' | 'reduced'

export interface Settings {
  sound: boolean
  haptics: boolean
  readAloud: boolean
  textScale: TextScale
  motion: MotionPref
}

const STORAGE_KEY = 'mikuri.settings'

const defaults: Settings = {
  sound: false,
  haptics: false,
  readAloud: true,
  textScale: 'normal',
  motion: 'auto',
}

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaults }
    const parsed = JSON.parse(raw) as Partial<Settings>
    return { ...defaults, ...parsed }
  } catch {
    return { ...defaults }
  }
}

const settings = reactive<Settings>(load())

function apply() {
  const root = document.documentElement
  root.dataset.textScale = settings.textScale
  root.dataset.motion = settings.motion
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    /* storage unavailable, keep in-memory */
  }
  apply()
}

apply()
watch(settings, persist)

export function motionReduced(): boolean {
  if (settings.motion === 'reduced') return true
  if (settings.motion === 'auto') {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  }
  return false
}

export function useSettings() {
  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    settings[key] = value
  }

  function toggle(key: 'sound' | 'haptics' | 'readAloud') {
    settings[key] = !settings[key]
  }

  return {
    settings,
    set,
    toggle,
    motionReduced,
    reset: () => Object.assign(settings, defaults),
  }
}
