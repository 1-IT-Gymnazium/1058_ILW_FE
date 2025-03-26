<template>
  <div>
    <button @click="login" class="login-btn">Přihlásit</button>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: "LoginButton",

  /**
   * Setup funkce komponenty pro přihlašování uživatele pomocí Auth0.
   *
   * @function login
   * @description Vyvolá přesměrování na přihlašovací stránku pomocí `loginWithRedirect` z Auth0.
   * @returns {Object} Vrací objekt obsahující funkci `login`.
   */
  setup() {
    const { loginWithRedirect } = useAuth0();

    const login = () => {
      loginWithRedirect();
    };

    return { login };
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
