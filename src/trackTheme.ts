import type { TrackColor } from './data/tracks'

const base: Record<TrackColor, string> = {
  mint: 'var(--mint)',
  sky: 'var(--sky)',
  sunny: 'var(--sunny)',
  grape: 'var(--grape)',
  coral: 'var(--primary)',
}

const soft: Record<TrackColor, string> = {
  mint: 'var(--mint-soft)',
  sky: 'var(--sky-soft)',
  sunny: 'var(--sunny-soft)',
  grape: 'var(--grape-soft)',
  coral: 'var(--primary-soft)',
}

const strong: Record<TrackColor, string> = {
  mint: 'var(--mint-strong)',
  sky: 'var(--sky-strong)',
  sunny: 'var(--sunny-strong)',
  grape: 'var(--grape-strong)',
  coral: 'var(--primary-strong)',
}

export function trackVars(color: TrackColor): Record<string, string> {
  return {
    '--track': base[color],
    '--track-soft': soft[color],
    '--track-strong': strong[color],
  }
}
