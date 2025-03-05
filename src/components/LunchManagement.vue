<script setup>
import { ref, onMounted } from "vue";

// Dynamické proměnné pro název a číslo oběda
const mealName = ref("Název oběda");
const mealNumber = ref("123");

// Číslo studenta pro input
const studentNumber = ref("");

// Simulace načtení oběda (může být nahrazeno API voláním)
const fetchMealInfo = () => {
  // Simulovaná data, můžeš nahradit fetch() pro API volání
  mealName.value = "Svíčková na smetaně";
  mealNumber.value = "1";
};

// Funkce pro darování oběda
const donateMeal = () => {
  if (studentNumber.value.trim() === "") {
    alert("Prosím, zadejte číslo studenta.");
    return;
  }
  alert(`Oběd "${mealName.value}" (číslo ${mealNumber.value}) byl darován studentovi s číslem ${studentNumber.value}`);
  studentNumber.value = "";
};

// Načíst data o obědě při načtení stránky
onMounted(fetchMealInfo);
</script>

<template>
  <div class="container">
    <!-- Horní obrázek -->
    <div class="top-image"></div>

    <!-- Hlavní obsah -->
    <div class="content">
      <button class="logout-btn">Odhlásit</button>
      <h1 class="meal-name">"{{ mealName }}"</h1>
      <p class="meal-number">"{{ mealNumber }}"</p>

      <div class="input-group">
        <input 
          v-model="studentNumber" 
          type="text" 
          placeholder="Číslo studenta" 
        />
        <button @click="donateMeal" class="donate-btn">Darovat dnešní oběd</button>
      </div>
    </div>

    <!-- Dolní obrázek -->
    <div class="bottom-image"></div>
  </div>
</template>

<style scoped>
/* Základní nastavení */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f8f8;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}

/* Horní obrázkové pozadí */
.top-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: url('https://source.unsplash.com/1600x400/?vegetables') no-repeat center center/cover;
}

/* Dolní obrázkové pozadí */
.bottom-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: url('https://source.unsplash.com/1600x400/?carrots,peppers') no-repeat center center/cover;
}

/* Obsah stránky */
.content {
  background: white;
  padding: 40px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
}

/* Odhlásit tlačítko */
.logout-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background: black;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}

.logout-btn:hover {
  background: #333;
}

/* Název jídla */
.meal-name {
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
}

/* Číslo oběda */
.meal-number {
  font-size: 18px;
  color: gray;
  margin-top: 5px;
}

/* Input a tlačítko */
.input-group {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  width: 200px;
}

.donate-btn {
  background: black;
  color: white;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 5px;
  white-space: nowrap;
}

.donate-btn:hover {
  background: #333;
}

/* 📌 Responzivita */
@media (max-width: 768px) {
  .top-image,
  .bottom-image {
    height: 100px;
  }

  .content {
    padding: 30px;
    max-width: 90%;
  }

  .meal-name {
    font-size: 26px;
  }

  .meal-number {
    font-size: 16px;
  }

  .input-group {
    flex-direction: column;
    gap: 8px;
  }

  .input-group input {
    width: 100%;
  }

  .donate-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .top-image,
  .bottom-image {
    height: 80px;
  }

  .logout-btn {
    top: 5px;
    left: 5px;
    padding: 6px 12px;
    font-size: 14px;
  }

  .content {
    padding: 20px;
  }

  .meal-name {
    font-size: 22px;
  }

  .meal-number {
    font-size: 14px;
  }

  .input-group {
    gap: 6px;
  }

  .donate-btn {
    font-size: 14px;
  }
}
</style>
