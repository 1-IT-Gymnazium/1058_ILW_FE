<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

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

    const newRow = {
      user_name: data.user_name || "",
      meal_number: data.meal_number || "",
      meal_name: data.meal_name || "",
      user_number: data.user_number || "",
    };

    tableRows.value.unshift(newRow);

    if (tableRows.value.length > 6) {
      tableRows.value.pop();
    }

  } catch (error) {
    errorMessage.value = error.message;
    console.error("Chyba při načítání dat:", error);
  } finally {
    isLoading.value = false;
    isicId.value = ""; 
  }
};

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    fetchMealData();
  } else {
    isicId.value += event.key;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyPress);
});
</script>

<template>
  <body>
    <h1>Seznam obědů</h1>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

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
