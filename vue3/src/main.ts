import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
//
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)


// const npm = false
// let VueDd = await import(npm ? `../node_modules/vue-dd/dist/index.es.js` : `../../vue-dd/src/VueDd.vue`)
// VueDd = npm ? VueDd.VueDd : VueDd.default
//
// app.component('VueDd', VueDd)

app.mount('#app')
