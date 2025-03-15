<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomePageView from './views/HomePageView.vue';
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/lunchList">Lunches</RouterLink>
        <RouterLink to="/lunchManagement">Student UI</RouterLink>
      </nav>
  </header>
  <RouterView />
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f8f9fa;
}
nav {
    margin-bottom: 20px;
}
nav a {
    margin-right: 10px;
    text-decoration: none;
    color: #007bff;
}
</style>
