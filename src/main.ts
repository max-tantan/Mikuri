import { createApp } from 'vue'
import '@fontsource/fredoka/latin-500.css'
import '@fontsource/fredoka/latin-600.css'
import '@fontsource/fredoka/latin-700.css'
import '@fontsource/nunito/latin-400.css'
import '@fontsource/nunito/latin-600.css'
import '@fontsource/nunito/latin-700.css'
import '@fontsource/nunito/latin-800.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import { useI18n } from './i18n'

document.documentElement.lang = useI18n().lang.value

createApp(App).use(router).directive('reveal', vReveal).mount('#app')
