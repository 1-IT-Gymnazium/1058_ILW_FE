import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'

/**
 * Vytváří a exportuje instanci Vue Routeru pro navigaci v aplikaci.
 *
 * @constant
 * @type {vue-router}
 * @description Router je nakonfigurovaný s třemi cestami a využívá HTML5 history API.
 * @returns {vue-router} Konfigurovaný router s definovanými cestami.
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
      /**
       * Lazy-load komponenty pomocí dynamického importu.
       * Vytváří separovaný chunk (LunchManagement.[hash].js), který se načte při návštěvě.
       */
      component: () => import('../views/LunchManagementView.vue'),
    },
    {
      path: '/lunchList',
      name: 'lunchList',
      /**
       * Lazy-load komponenty pomocí dynamického importu.
       * Vytváří separovaný chunk (LunchList.[hash].js), který se načte při návštěvě.
       */
      component: () => import('../views/LunchListView.vue'),
    },
  ],
})

export default router
