<template>
  <div>
    <button @click="logout" class="logout-btn">Odhlásit</button>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: "LogoutButton",

  /**
   * Setup funkce komponenty pro odhlašování uživatele pomocí Auth0.
   *
   * @function logout
   * @description Ukončí relaci uživatele a přesměruje jej zpět na domovskou stránku.
   * @returns {Object} Vrací objekt obsahující funkci `logout`.
   */
  setup() {
    const { logout } = useAuth0();

    const logoutUser = () => {
      logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return {
      logout: logoutUser
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
