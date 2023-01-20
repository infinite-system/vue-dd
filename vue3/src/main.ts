import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueDd from 'vue-dd'

import VueDd from '../../vue-dd/src/VueDd.vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.component('VueDdNpm', VueDdNpm)
app.component('VueDd', VueDd)

app.mount('#app')
