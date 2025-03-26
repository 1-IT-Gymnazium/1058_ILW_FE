<template>
  <RouterLink :to="link" class="card">
    <h2 class="card-title">{{ title }}</h2>
    <img v-if="image" :src="image" alt="Card Image" class="card-image" />
  </RouterLink>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: "CardLink",

  /**
   * Props přijaté komponentou.
   * @property {string} title - Název, který se zobrazí jako titulek karty.
   * @property {string} link - Cílový odkaz, kam komponenta přesměruje po kliknutí.
   * @property {string} [image] - (Volitelné) Cesta k obrázku, který se zobrazí na kartě.
   */
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },

  /**
   * Setup funkce využívající Auth0 hook pro získání informací o autentizaci.
   * @returns {Object} Obsahuje reaktivní proměnnou `isAuthenticated`.
   */
  setup() {
    const { isAuthenticated } = useAuth0();
    return { isAuthenticated };
  }
};
</script>

<style scoped>
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  display: block;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 30%;
  height: auto;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>
