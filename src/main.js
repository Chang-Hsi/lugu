import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'        // ← 改用 @primevue/themes
import 'primeicons/primeicons.css'              // ← 必須：載入 PrimeIcons

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,                                // 也可改 AuraDark、Lara 等
  }
})

app.mount('#app')
