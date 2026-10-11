import { useSettings } from './useSettings'

type ConfettiFn = (options?: Record<string, unknown>) => void

let modPromise: Promise<ConfettiFn> | null = null

function load(): Promise<ConfettiFn> {
  if (!modPromise) {
    modPromise = import('canvas-confetti').then((mod) => {
      const candidate = (mod as unknown as { default?: ConfettiFn }).default ?? (mod as unknown as ConfettiFn)
      return candidate
    })
  }
  return modPromise
}

export interface BurstOptions {
  kind?: 'small' | 'big'
  originY?: number
}

export function useConfetti() {
  const { motionReduced } = useSettings()

  async function burst(options: BurstOptions = {}) {
    if (motionReduced()) return
    let confetti: ConfettiFn
    try {
      confetti = await load()
    } catch {
      return
    }
    const { kind = 'small', originY = 0.6 } = options

    if (kind === 'big') {
      const duration = 1400
      const end = Date.now() + duration
      const colors = ['#ff7a66', '#f0a521', '#1fbf98', '#3e8ff0', '#8a6ff0']
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: originY }, colors })
        confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: originY }, colors })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
      return
    }

    confetti({
      particleCount: 70,
      spread: 72,
      startVelocity: 32,
      scalar: 0.9,
      ticks: 140,
      origin: { y: originY },
      colors: ['#ff7a66', '#f0a521', '#1fbf98', '#3e8ff0', '#8a6ff0'],
    })
  }

  return { burst }
}
