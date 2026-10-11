import { useSettings } from './useSettings'

type Ctor = typeof AudioContext

let ctx: AudioContext | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext
  if (!Ctor) return null
  if (!ctx) {
    try {
      ctx = new Ctor()
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

export type Tone = 'pop' | 'correct' | 'wrong' | 'win'

const NOTES: Record<Tone, number[]> = {
  pop: [520],
  correct: [660, 990],
  wrong: [320, 230],
  win: [523, 659, 784, 1046],
}

function playNotes(notes: number[], step = 0.1, dur = 0.16, type: OscillatorType = 'sine') {
  const ac = audio()
  if (!ac) return
  const now = ac.currentTime
  notes.forEach((freq, i) => {
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    const start = now + i * step
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur)
    osc.connect(gain).connect(ac.destination)
    osc.start(start)
    osc.stop(start + dur + 0.02)
  })
}

export function useSound() {
  const { settings } = useSettings()

  function play(tone: Tone) {
    if (!settings.sound) return
    const notes = NOTES[tone]
    if (!notes) return
    if (tone === 'correct' || tone === 'win') playNotes(notes, tone === 'win' ? 0.09 : 0.1, 0.18, 'triangle')
    else playNotes(notes, 0.1, 0.15, 'sine')
  }

  return { play }
}
