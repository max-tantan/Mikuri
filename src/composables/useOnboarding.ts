import { ref } from 'vue'

const STORAGE_KEY = 'mikuri.onboarding.seen'

function load(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw === 'true'
  } catch {
    return false
  }
}

const seen = ref<boolean>(load())

function persist(value: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, String(value))
  } catch {
    /* ignore */
  }
}

export function useOnboarding() {
  const isOpen = ref<boolean>(!seen.value)

  function markSeen() {
    seen.value = true
    persist(true)
    isOpen.value = false
  }

  function show() {
    isOpen.value = true
  }

  function hide() {
    isOpen.value = false
  }

  function reset() {
    seen.value = false
    persist(false)
    isOpen.value = true
  }

  return {
    seen,
    isOpen,
    markSeen,
    show,
    hide,
    reset,
  }
}