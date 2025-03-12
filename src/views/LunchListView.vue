<script setup>
import LunchList from '../components/LunchList.vue'
import Login from '../components/Login.vue'
</script>

<template>
  <main>
    <div class="login-container">
      <Login />
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
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 80px;
}

.login-container button {
  background: black;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
