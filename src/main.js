import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue';
import router from './router';

/**
 * Inicializuje a konfiguruje Vue.js aplikaci s Pinia store, Auth0 autentizací a routerem.
 * Aplikace je následně připojena k DOM elementu s ID `#app`.
 *
 * @function
 * @description Vytváří aplikaci, používá Auth0 pro autentizaci, Pinia pro stav a router pro navigaci.
 * @returns {Vue} Vrací nainicializovanou a připojenou Vue aplikaci.
 */
const app = createApp(App);

app.use(
  createAuth0({
    domain: "ilw.eu.auth0.com",
    clientId: "lll4spjIIT5LGnmwQ0pmgN591Ng7fYLP",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
);

app.use(createPinia());
app.use(router);

app.mount('#app');
