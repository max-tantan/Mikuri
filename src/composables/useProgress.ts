import { computed, ref } from 'vue'
import { tracks, type Track } from '../data/tracks'

const STORAGE_KEY = 'mikuri.progress'

function load(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? new Set(parsed as string[]) : new Set()
  } catch {
    return new Set()
  }
}

const done = ref<Set<string>>(load())

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...done.value]))
}

export function lessonKey(trackSlug: string, lessonSlug: string) {
  return `${trackSlug}/${lessonSlug}`
}

export function useProgress() {
  function isDone(trackSlug: string, lessonSlug: string) {
    return done.value.has(lessonKey(trackSlug, lessonSlug))
  }

  function markDone(trackSlug: string, lessonSlug: string) {
    if (done.value.has(lessonKey(trackSlug, lessonSlug))) return
    done.value = new Set(done.value).add(lessonKey(trackSlug, lessonSlug))
    persist()
  }

  function toggleDone(trackSlug: string, lessonSlug: string) {
    const next = new Set(done.value)
    const key = lessonKey(trackSlug, lessonSlug)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    done.value = next
    persist()
  }

  function clear() {
    done.value = new Set()
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  function trackDoneCount(track: Track) {
    return track.lessons.filter((l) => done.value.has(lessonKey(track.slug, l.slug))).length
  }

  function trackPercent(track: Track) {
    if (!track.lessons.length) return 0
    return Math.round((trackDoneCount(track) / track.lessons.length) * 100)
  }

  const allLessons = tracks.reduce((sum, t) => sum + t.lessons.length, 0)
  const totalDone = computed(() => done.value.size)
  const overallPercent = computed(() =>
    allLessons ? Math.round((totalDone.value / allLessons) * 100) : 0,
  )

  return {
    isDone,
    markDone,
    toggleDone,
    clear,
    trackDoneCount,
    trackPercent,
    totalDone,
    overallPercent,
    allLessons,
  }
}
