import { createApp } from 'vue'

import App from './App.vue'

import router from './router/router'

// 开启pinia
import {createPinia} from 'pinia'

let pinia=createPinia()

const app=createApp(App)
app.use(pinia)
app.use(router)
app.mount("#app")
