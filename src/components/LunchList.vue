<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const tableRows = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");
const infoMessage = ref("");
const isicId = ref("");
const user_id = ref();
const meal_id = ref();

/**
 * Aktualizuje stav objednávky na `status: false` a nastaví `withdrawed_at` na aktuální čas.
 *
 * :param userNumber: Číslo studenta, podle kterého se vyhledá objednávka.
 * :type userNumber: number
 * :returns: Promise bez návratové hodnoty, pouze aktualizace na serveru.
 * :rtype: Promise<void>
 * :raises Error: Pokud dojde k chybě při komunikaci s API.
 */
const updateOrderStatus = async (userNumber) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/orders/${userNumber}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id.value,
        meal_id: meal_id.value,
        status: false,
        withdrawed_at: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error("Nepodařilo se aktualizovat stav objednávky.");
    }

    console.log(`Objednávka studenta ${userNumber} aktualizována na status: false`);
  } catch (error) {
    console.error("Chyba při updatu objednávky:", error);
  }
};

/**
 * Načte informace o jídle podle ISIC ID a rozhodne, zda se má zobrazit v tabulce.
 * Pokud `status === false`, vypíše hlášku a záznam nezobrazí.
 *
 * :returns: Promise bez návratové hodnoty. Data se ukládají do `tableRows`.
 * :rtype: Promise<void>
 * :raises Error: Pokud nastane chyba při komunikaci s API.
 */
const fetchMealData = async () => {
  if (!isicId.value) {
    errorMessage.value = "Prosím, vyplňte ISIC ID.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  infoMessage.value = "";

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/users/meals-info/${encodeURIComponent(isicId.value)}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Chyba ${response.status}: ${errorData.detail}`);
    }

    const data = await response.json();

    // Pokud má status false, nezobrazujeme jídlo a jen informujeme uživatele
    if (data.order_status === false) {
      infoMessage.value = `Uživatel ${data.user_name} už si oběd vyzvedl.`;
    }

    meal_id.value = data.meal_id;
    user_id.value = data.user_id;

    const newRow = {
      user_name: data.user_name || "",
      meal_number: data.meal_number || "",
      meal_name: data.meal_name || "",
      user_number: data.user_number || "",
    };

    tableRows.value.unshift(newRow);
    await updateOrderStatus(data.user_number);

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

/**
 * Zpracuje stisk klávesy – pokud je to Enter, spustí fetchMealData,
 * jinak přidává stisknuté znaky do `isicId` vstupu.
 *
 * :param event: Událost stisknutí klávesy.
 * :type event: KeyboardEvent
 */
const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    fetchMealData();
  } else {
    isicId.value += event.key;
  }
};

/**
 * Při načtení komponenty naslouchá na stisk klávesy.
 */
onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
});

/**
 * Při odpojení komponenty odebere posluchač klávesnice.
 */
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyPress);
});
</script>


<template>
  <body>
    <h1>Seznam obědů</h1>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="infoMessage" class="info">{{ infoMessage }}</p>

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
    margin: 20px 0;
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

.info {
  color: #555;
  font-style: italic;
  margin-top: 10px;
}
</style>
