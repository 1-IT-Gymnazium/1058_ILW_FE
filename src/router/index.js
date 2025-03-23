import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'

/**
 * Creates and exports Vue Router instance for navigation within the application.
 *
 * :returns: Router instance configured with defined routes and history mode.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageView,
    },
    {
      path: '/lunchManagement',
      name: 'lunchManagement',
      // route level code-splitting
      // this generates a separate chunk (LunchManagement.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LunchManagementView.vue'),
    },
    {
      path: '/lunchList',
      name: 'lunchList',
      // route level code-splitting
      // this generates a separate chunk (LunchList.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LunchListView.vue'),
    },
  ],
})

export default router
