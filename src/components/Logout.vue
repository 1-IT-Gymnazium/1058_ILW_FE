<template>
    <div>
      <button @click="logout" class="logout-btn">Odhlásit</button>
    </div>
  </template>
  <script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  /**
   * Vue.js component handling user logout with Auth0.
   *
   * :returns: Logout function to terminate Auth0 session and redirect user.
   */
  setup() {
    const { logout } = useAuth0();

    return {
      logout: () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
      }
    };
  }
};
  </script>

<style scoped>

.logout-btn {
  top: 10px;
  left: 10px;
  background: black;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}

.logout-btn:hover {
  background: #333;
}
</style>