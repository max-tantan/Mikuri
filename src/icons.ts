import type { Component } from 'vue'
import { PhCode, PhPuzzlePiece, PhTerminal } from '@phosphor-icons/vue'

export const trackIcons: Record<string, Component> = {
  PuzzlePiece: PhPuzzlePiece,
  Terminal: PhTerminal,
  Code: PhCode,
}
