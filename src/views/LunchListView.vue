<script setup>
import LunchList from '../components/LunchList.vue'
import Login from '../components/Login.vue'
import { useAuth0 } from "@auth0/auth0-vue";
import Logout from '@/components/Logout.vue';

const { isAuthenticated} = useAuth0();
</script>

<template>
  <main>
    <div v-if="!isAuthenticated" class="login-container" >
      <Login />
    </div>
    <div v-else class="login-container" >
      <Logout/>
    </div>
    <LunchList />
  </main>
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
</style>
