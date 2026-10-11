import type { Component } from 'vue'
import { PhBookOpen, PhGameController, PhHouseSimple, PhUsers } from '@phosphor-icons/vue'
import type { MessageKey } from './i18n'

export interface NavItem {
  key: string
  to: string
  label: MessageKey
  icon: Component
}

export const navItems: NavItem[] = [
  { key: 'home', to: '/', label: 'nav.home', icon: PhHouseSimple },
  { key: 'learn', to: '/belajar', label: 'nav.learn', icon: PhBookOpen },
  { key: 'play', to: '/latihan', label: 'nav.play', icon: PhGameController },
  { key: 'about', to: '/tentang', label: 'nav.about', icon: PhUsers },
]
