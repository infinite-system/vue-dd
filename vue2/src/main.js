import Vue from 'vue'
import App from './App.vue'
// import VueDd from 'vue-dd'
// import VueDd from '../../vue-dd/src/VueDd.vue'
// import VueDd from 'vue-dd'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// Vue.component('VueDd', VueDd)
// Vue.component('VueDdNpm', VueDdNpm)