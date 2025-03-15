<template>
    <div>
      <button @click="login" class="login-btn">Přihlásit
      </button>
    </div>
  </template>
  <script>
    import { useAuth0 } from '@auth0/auth0-vue';
  
    export default {
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
  position: absolute;
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