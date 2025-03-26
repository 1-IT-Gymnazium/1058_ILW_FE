<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';
import { useAuth0 } from "@auth0/auth0-vue";

// Auth0 hook pro získání stavu autentizace
const { isAuthenticated } = useAuth0();

/**
 * Hlavní navigační komponenta s odkazy a autentizací uživatele.
 * Zobrazuje odkazy na různé stránky a tlačítka pro přihlášení/odhlášení.
 *
 * @component
 * @name Navigation
 */
</script>

<template>
  <header>
    <nav>
      <div class="nav-links">
        <!-- Odkazy pro navigaci -->
        <RouterLink to="/">Domů</RouterLink>
        <RouterLink to="/lunchList">List obědů</RouterLink>
        <RouterLink to="/lunchManagement">Správa obědů</RouterLink>

        <!-- Podmíněné zobrazení komponent Login/Logout na základě stavu autentizace -->
        <div v-if="!isAuthenticated" class="login-container">
          <Login />
        </div>
        <div v-else class="login-container">
          <Logout />
        </div>
      </div>
    </nav>
  </header>
  <!-- Zobrazení obsahu podle aktuální cesty -->
  <RouterView />
</template>

<style scoped>
/* Celý header */
header {
  background: white;
  border-bottom: 3px solid black; /* Černá spodní čára */
  padding: 15px 30px; /* Menší padding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Navigace */
nav {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Odkazy v navigaci */
.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px; /* Přiměřená mezera mezi odkazy */
}

.nav-links a {
  text-decoration: none;
  color: #222; /* Tmavší text pro lepší čitelnost */
  font-size: 16px; /* O něco menší písmo */
  font-weight: bold;
  padding: 10px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* Hover efekt */
.nav-links a:hover {
  background: black; /* Černé pozadí při hoveru */
  color: white;
  transform: scale(1.05); /* Mírné zvětšení */
}

/* Pravý box pro přihlášení/odhlášení */
.login-container {
  float: right;
}
</style>
