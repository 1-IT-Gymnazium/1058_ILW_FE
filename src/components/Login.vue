<template>
    <div>
      <button @click="login" class="login-btn">Přihlásit
      </button>
    </div>
  </template>
  <script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  /**
   * Vue.js component handling user login with Auth0.
   *
   * :returns: Login function to initiate Auth0 redirect authentication.
   */
  setup() {
    const { loginWithRedirect } = useAuth0();

    return {
      login: () => {
        loginWithRedirect();
      }
    };
  }
};

  </script>

<style scoped>

.login-btn {
  top: 10px;
  left: 10px;
  background: black;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}

.login-btn:hover {
  background: #333;
}
</style>