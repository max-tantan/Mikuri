import { useSettings } from './useSettings'

export function useHaptics() {
  const { settings } = useSettings()
  const supported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  function buzz(pattern: number | number[] = 12) {
    if (!supported || !settings.haptics) return
    try {
      navigator.vibrate(pattern)
    } catch {
      /* ignore */
    }
  }

  return { buzz, supported }
}
