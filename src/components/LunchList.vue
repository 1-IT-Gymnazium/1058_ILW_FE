<script setup>
import { ref, computed } from 'vue';

const getData = (method, url, id) => {
  return fetch(`${url}${id}`, {
      method: method,
      headers: { "Content-Type": "application/json" },
  }).then(response => {
      if (!response.ok) {
          return response.json().then(errorData => {
              throw new Error(`Chyba ${response.status}: ${JSON.stringify(errorData)}`);
          });
      }
      return response.json();
  });
};

const meals = ref([]);
const users = ref([]);

async function fetchMeals() {
  try {
    const mealsData = await getData("GET", "http://127.0.0.1:8000/meals/", "1");
    const usersData = await getData("GET", "http://127.0.0.1:8000/users/", "ahoj");
    
    //udělat na array
    meals.value = Array.isArray(mealsData) ? mealsData : mealsData.results || [];
    users.value = Array.isArray(usersData) ? usersData : usersData.results || [];

    console.log("Meal data:", meals.value);
    console.log("User data:", users.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Propojení jídel s uživateli
const mealsWithUsers = computed(() => {
  return Array.isArray(meals.value)
    ? meals.value.map(meal => ({
        ...meal,
        user: users.value.find(user => user.id === meal.user_id) || { name: "Neznámý", user_number: "N/A" }
      }))
    : [];
});
</script>

<template>
  <body>
    <h1>Seznam obědů</h1>
    <button @click="fetchMeals" class="btn">Načíst</button>
    <table>
      <thead>
        <tr>
          <th>Jméno studenta</th>
          <th>Číslo obědu</th>
          <th>Název obědu</th>
          <th>Číslo studenta</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="meal in mealsWithUsers" :key="meal.id">
          <td>{{ meal.user.name }}</td>
          <td>{{ meal.meal_number }}</td>
          <td>{{ meal.name }}</td>
          <td>{{ meal.user.user_number }}</td>
        </tr>
      </tbody>
    </table>
  </body>
</template>


<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 20px;
    background-color: #f8f9fa;
}

button.btn {
    background-color: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
}

button.btn:hover {
    background-color: #333;
}

.status {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
}

.status .online {
    color: #28a745;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

th {
    background-color: #6c757d;
    color: #fff;
    padding: 10px;
    text-align: left;
}

td {
    padding: 10px;
    border: 1px solid #dee2e6;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr.highlight {
    background-color: #b6ec8f;
}

tr.highlight td {
    font-weight: bold;
}
</style>
