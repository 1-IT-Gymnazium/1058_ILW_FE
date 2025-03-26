<script>
import Card from "@/components/Card.vue";
import Login from "@/components/Login.vue";
import Logout from "@/components/Logout.vue";
import { useAuth0 } from "@auth0/auth0-vue";

/**
 * Hlavní komponenta domovské stránky systému pro inteligentní výdej obědů.
 * Zahrnuje Auth0 autentizaci a zobrazuje odkazy na správu a výpis obědů.
 *
 * @component
 * @name HomePage
 * @returns {Object} Vrací objekt s proměnnou `isAuthenticated` ze systému Auth0.
 */
export default {
  name: "HomePage",
  components: {
    Card,
    Login,
    Logout,
  },
  setup() {
    const { isAuthenticated } = useAuth0();
    return { isAuthenticated };
  }
};
</script>


<template>
    <div class="container">
      <h1 class="title">Inteligent Lunch Withdrawal</h1>
      <div class="cards">
        <Card title="Správa obědů" link="/lunchManagement" image="/src/assets/User-Icon.webp"/>
        <Card title="List obědů" link="/lunchList" image="/src/assets/lunch-icon.png"/>
      </div>
      <p class="description">Systém pro inteligentní výdej obědů pomocí ISIC</p>
    </div>
  </template>
  
  <style scoped>
.login-container {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 80px;
}

@media (max-width: 768px) {
  .login-container {
    position: relative;
    top: auto;
    right: auto;
    margin: 10px auto;
    text-align: center;
    width: fit-content;
  }
}

  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 85vh;
    width: 100%;
    background-color: #f4f4f4;
    color: #333;
    text-align: center;
    overflow: hidden;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }
  
  .cards {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .description {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: #666;
  }
  
  @media (max-width: 600px) {
    .cards {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>
  