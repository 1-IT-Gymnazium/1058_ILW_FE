<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div>

      <nav>
        <RouterLink to="/lunchList">Lunch List</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/lunchManagement">Lunch Management</RouterLink>
      </nav>
    </div>
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
