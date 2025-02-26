<script setup>
import { ref } from 'vue';
</script>

<template>
  <body>
    <div class="login-container">
        <h1>Přihlášení pro studenty</h1>
        <label for="student-number">Číslo studenta</label>
        <input type="text" id="student-number" v-model="studentNumber" placeholder="Zadejte číslo studenta">
        
        <label for="password">Heslo</label>
        <input type="password" id="password" v-model="password" placeholder="Zadejte heslo">
        
        <button @click="submitLogin" class="btn">Přihlásit se</button>
        <a href="#">Zapomenuté heslo?</a>
    </div>
  </body>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8f8f8;
    margin: 0;
}
h1 {
    font-size: 2.5rem;
    font-weight: bold;
}
.login-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}
.login-container input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.login-container button {
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
}
.login-container a {
    display: block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
}
</style>
