import { createApp } from 'vue'

import 'virtual:uno.css'
import '@/styles/index.scss'

import router from '@/router/index.js'
import pinia from '@/store/index.js'

const app = createApp(App)

import App from './App.vue'

app.use(pinia)
app.use(router)

app.mount('#app')
