import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LunchListView.vue'
import LunchListView from '../views/LunchListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/lunchList',
      name: 'lunchList',
      component: LunchListView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
