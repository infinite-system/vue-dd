import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueDdTest from '../components/VueDdTest.vue'
import VueDdTest2 from '../components/VueDdTest2.vue'
import VueDdApiTest from '../components/VueDdApiTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'vue-dd',
          component: VueDdTest
        },
        {
          path: 'test-2',
          name: 'vue-dd-test-2',
          component: VueDdTest2
        },
        {
          path: 'api',
          name: 'vue-dd-api',
          component: VueDdApiTest
        }
      ]
    },
    {
      path: '/api',
      name: 'api',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: VueDdApiTest
    }
  ]
})

export default router
