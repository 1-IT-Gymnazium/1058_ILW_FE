<script setup>
import { ref } from "vue";

const tableRows = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");
const isicId = ref("");

const fetchMealData = async () => {
  if (!isicId.value) {
    errorMessage.value = "Prosím, vyplňte ISIC ID.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/users/meals-info/${encodeURIComponent(isicId.value)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Chyba ${response.status}: ${errorData.detail}`);
    }

    const data = await response.json();
    console.log("Načtená data:", data);

    // Přidání nového záznamu do tabulky
    const newRow = {
      user_name: data.user_name || "",
      meal_number: data.meal_number || "",
      meal_name: data.meal_name || "",
      user_number: data.user_number || "",
    };

    tableRows.value.unshift(newRow);

    // Udržení maximálně 6 řádků v tabulce
    if (tableRows.value.length > 6) {
      tableRows.value.pop();
    }

  } catch (error) {
    errorMessage.value = error.message;
    console.error("Chyba při načítání dat:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>


<template>
  <body>
    <h1>Seznam obědů</h1>

    <div class="input-group">
      <label for="isicId">ISIC ID:</label>
      <input v-model="isicId" type="text" id="isicId" required />
    </div>

    <button @click="fetchMealData" class="btn" :disabled="isLoading">
      {{ isLoading ? "Načítání..." : "Načíst" }}
    </button>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <table v-if="tableRows.length">
      <thead>
        <tr>
          <th>Jméno studenta</th>
          <th>Číslo obědu</th>
          <th>Název obědu</th>
          <th>Číslo studenta</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableRows" :key="index" :class="{ highlight: index === 0 }">
          <td>{{ row.user_name }}</td>
          <td>{{ row.meal_number }}</td>
          <td>{{ row.meal_name }}</td>
          <td>{{ row.user_number }}</td>
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

.input-group {
    margin-bottom: 10px;
}

.input-group label {
    display: block;
    font-weight: bold;
}

.input-group input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
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

button:disabled {
    background-color: #999;
    cursor: not-allowed;
}

.error {
    color: red;
    font-weight: bold;
    margin-top: 10px;
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