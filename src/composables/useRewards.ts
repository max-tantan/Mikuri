import { computed, ref } from 'vue'
import { tracks, type Track, type TrackColor } from '../data/tracks'
import { useProgress } from './useProgress'
import { useI18n } from '../i18n'

const STREAK_KEY = 'mikuri.streak'

interface StreakState {
  count: number
  last: string
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

function yesterday(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function loadStreak(): StreakState {
  try {
    const raw = localStorage.getItem(STREAK_KEY)
    if (!raw) return { count: 0, last: '' }
    const parsed = JSON.parse(raw) as Partial<StreakState>
    return { count: parsed.count ?? 0, last: parsed.last ?? '' }
  } catch {
    return { count: 0, last: '' }
  }
}

const streak = ref<StreakState>(loadStreak())

export interface Badge {
  id: string
  label: string
  desc: string
  tone: TrackColor
  unlocked: boolean
  progress: number
}

export function useRewards() {
  const { totalDone, allLessons, trackPercent } = useProgress()
  const { t, pick } = useI18n()

  function touchStreak() {
    const now = today()
    if (streak.value.last === now) return
    const next: StreakState =
      streak.value.last === yesterday()
        ? { count: streak.value.count + 1, last: now }
        : { count: 1, last: now }
    streak.value = next
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }

  function clear() {
    streak.value = { count: 0, last: '' }
    try {
      localStorage.removeItem(STREAK_KEY)
    } catch {
      /* ignore */
    }
  }

  const badges = computed<Badge[]>(() => {
    const done = totalDone.value
    const total = allLessons
    const ratio = (n: number, goal: number) => Math.min(n / goal, 1)

    const base: Badge[] = [
      {
        id: 'first',
        label: t('badge.first.label'),
        desc: t('badge.first.desc'),
        tone: 'coral',
        unlocked: done >= 1,
        progress: ratio(done, 1),
      },
      {
        id: 'regular',
        label: t('badge.regular.label'),
        desc: t('badge.regular.desc'),
        tone: 'sky',
        unlocked: done >= 5,
        progress: ratio(done, 5),
      },
      {
        id: 'streak',
        label: t('badge.streak.label'),
        desc: t('badge.streak.desc'),
        tone: 'sunny',
        unlocked: streak.value.count >= 3,
        progress: ratio(streak.value.count, 3),
      },
      {
        id: 'expert',
        label: t('badge.expert.label'),
        desc: t('badge.expert.desc'),
        tone: 'grape',
        unlocked: done >= total && total > 0,
        progress: ratio(done, total),
      },
    ]

    const trackBadges: Badge[] = tracks.map((track: Track) => {
      const percent = trackPercent(track)
      return {
        id: `track-${track.slug}`,
        label: pick(track.title),
        desc: t('badge.track.desc'),
        tone: track.color,
        unlocked: percent >= 100,
        progress: percent / 100,
      }
    })

    return [...base, ...trackBadges]
  })

  const unlockedBadges = computed(() => badges.value.filter((b) => b.unlocked).length)
  const stars = computed(() => totalDone.value)
  const readyToCelebrate = computed(() => allLessons > 0 && totalDone.value >= allLessons)

  return {
    badges,
    unlockedBadges,
    stars,
    streak,
    touchStreak,
    clear,
    readyToCelebrate,
  }
}
