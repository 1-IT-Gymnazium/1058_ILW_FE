import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue';
import router from './router';

/**
 * Initializes and configures the Vue.js application with Pinia store, Auth0 authentication, and router.
 *
 * :returns: Mounted Vue.js application instance.
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
