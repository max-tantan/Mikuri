import { getCurrentScope, onScopeDispose, ref } from 'vue'
import { useI18n } from '../i18n'

const speaking = ref(false)
const current = ref('')

export function useSpeech() {
  const { lang } = useI18n()
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  function speak(text: string) {
    if (!supported || !text) return
    const synth = window.speechSynthesis
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang.value === 'id' ? 'id-ID' : 'en-US'
    utterance.rate = 0.95
    utterance.pitch = 1.08
    utterance.onend = () => {
      speaking.value = false
      current.value = ''
    }
    utterance.onerror = () => {
      speaking.value = false
      current.value = ''
    }
    current.value = text
    speaking.value = true
    synth.speak(utterance)
  }

  function stop() {
    if (!supported) return
    window.speechSynthesis.cancel()
    speaking.value = false
    current.value = ''
  }

  function toggle(text: string) {
    if (speaking.value && current.value === text) stop()
    else speak(text)
  }

  if (getCurrentScope()) {
    onScopeDispose(() => {
      if (speaking.value) stop()
    })
  }

  return { supported, speaking, current, speak, stop, toggle }
}
