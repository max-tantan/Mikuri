import { computed, ref } from 'vue'

export interface SessionUser {
  name: string
  createdAt: number
}

const STORAGE_KEY = 'mikuri.session'

function load(): SessionUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SessionUser>
    if (!parsed.name) return null
    return { name: parsed.name, createdAt: parsed.createdAt ?? Date.now() }
  } catch {
    return null
  }
}

const user = ref<SessionUser | null>(load())

function persist() {
  try {
    if (user.value) localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function useAuth() {
  const isAuthenticated = computed(() => user.value !== null)

  function signIn(name: string) {
    user.value = { name: name.trim(), createdAt: Date.now() }
    persist()
  }

  function signOut() {
    user.value = null
    persist()
  }

  return { user, isAuthenticated, signIn, signOut }
}
