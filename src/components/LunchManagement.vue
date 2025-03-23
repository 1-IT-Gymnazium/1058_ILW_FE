<script setup>
import { ref, onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";
const { user, isAuthenticated } = useAuth0();

const mealId = ref();
const mealName = ref("Uživatel nemá dnes jídlo");
const mealNumber = ref();
const studentNumber = ref("");
const donationMessage = ref("Darování jídla je nezvratná akce");


console.log(user.value["https://ILW/isic_id"]);

const fetchUserData = async () => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/users/${user.value.name}`);
    const databaseUser = await res.json();

    console.log(databaseUser.ISIC_id)
    console.log(databaseUser)
    if (!databaseUser?.ISIC_id) {
      console.error("ISIC_id nebylo nalezeno.");
      return;
    }

    const isicRes = await fetch(`http://127.0.0.1:8000/users/meals-info/${databaseUser.ISIC_id}`);
    const isicData = await isicRes.json();

    mealId.value = isicData.meal_id
    mealName.value = isicData.meal_name || "Uživatel nemá dnes jídlo";
    mealNumber.value = isicData.meal_number;
  } catch (err) {
    console.error("Chyba při získávání dat:", err);
  }
};

onMounted(() => {
  if (isAuthenticated.value && user.value) {
    fetchUserData();
  }
});

const updateOrder = async (user_id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/orders/${user.value.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        meal_id: mealId.value,
        status: true,
        withdrawed_at: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error("Chyba při aktualizaci objednávky.");
    }
  } catch (err) {
    console.error(err);
  }
};


const donateMeal = async () => {
  if (studentNumber.value.trim() === "") {
    alert("Prosím, zadejte číslo studenta.");
    return;
  }

  try {
    const res = await fetch(`http://127.0.0.1:8000/users/${studentNumber.value}`);
    const databaseUser = await res.json();

    await updateOrder(databaseUser.id);

    donationMessage.value = `Jídlo bylo darováno studentovi ${studentNumber.value}`;
  } catch (err) {
    console.error("Chyba při darování jídla:", err);
    donationMessage.value = "Nastala chyba při darování jídla.";
  }
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
      <p style="margin-top: 10px; font-size: 14px; color: gray;">
        {{ donationMessage }}
      </p>
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
  position: relative;
  overflow: hidden;
  background-color: #f8f8f8;
}

.background {
  left: 0;
  width: 100vw;
  background-size: cover;
  background-position: center;
}

.top-image {
  height: 20vh;
  background-image: url('https://images.pexels.com/photos/594137/pexels-photo-594137.jpeg');
}

.bottom-image {
  bottom: 0;
  height: 20vh;
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
