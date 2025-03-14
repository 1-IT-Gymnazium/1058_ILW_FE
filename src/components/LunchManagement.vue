<script setup>
import { ref, onMounted } from "vue";
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, loginWithRedirect } = useAuth0();

const mealName = ref("Název oběda");
const mealNumber = ref("1");
const studentNumber = ref("");

const donateMeal = () => {
  if (studentNumber.value.trim() === "") {
    alert("Prosím, zadejte číslo studenta.");
    return;
  }
  alert(`Oběd "${mealName.value}" (číslo ${mealNumber.value}) byl darován studentovi s číslem ${studentNumber.value}`);
  studentNumber.value = "";
};

</script>

<template>
  <div class="container">
    <div class="background top-image"></div>
    <div class="content">
      <h1 class="meal-name">{{ mealName }}</h1>
      <p class="meal-number">{{ mealNumber }}</p>
      <div class="input-group">
        <input v-model="studentNumber" type="text" placeholder="Číslo studenta" />
        <button @click="donateMeal" class="donate-btn">Darovat dnešní oběd</button>
      </div>
    </div>
    <div class="background bottom-image"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f8f8f8;
}

.background {
  position: absolute;
  left: 0;
  width: 100vw;
  height: 20vh;
  background-size: cover;
  background-position: center;
}

.top-image {
  top: 0;
  background-image: url('https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg');
}

.bottom-image {
  bottom: 0;
  background-image: url('https://images.pexels.com/photos/1213859/pexels-photo-1213859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
}

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
  margin: 20vh auto;
}

.meal-name {
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
}

.meal-number {
  font-size: 18px;
  color: gray;
  margin-top: 5px;
}

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

@media (max-width: 768px) {
  .top-image,
  .bottom-image {
    height: 15vh;
  }

  .content {
    padding: 30px;
    max-width: 90%;
  }
}

@media (max-width: 480px) {
  .top-image,
  .bottom-image {
    height: 12vh;
  }

  .content {
    padding: 20px;
  }
}
</style>
