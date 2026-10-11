import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export function useSwipe(
  target: Ref<HTMLElement | null>,
  handlers: { onSwipeLeft?: () => void; onSwipeRight?: () => void },
  threshold = 72,
) {
  let startX = 0
  let startY = 0
  let tracking = false

  function onStart(event: TouchEvent) {
    const touch = event.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    tracking = true
  }

  function onEnd(event: TouchEvent) {
    if (!tracking) return
    tracking = false
    const touch = event.changedTouches[0]
    const dx = touch.clientX - startX
    const dy = touch.clientY - startY
    if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.4) return
    if (dx < 0) handlers.onSwipeLeft?.()
    else handlers.onSwipeRight?.()
  }

  onMounted(() => {
    const el = target.value
    if (!el) return
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
  })

  onBeforeUnmount(() => {
    const el = target.value
    if (!el) return
    el.removeEventListener('touchstart', onStart)
    el.removeEventListener('touchend', onEnd)
  })
}
