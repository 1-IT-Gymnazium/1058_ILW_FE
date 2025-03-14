<script setup>
import Logout from '@/components/Logout.vue';
import LunchManagement from '@/components/LunchManagement.vue'
import { useAuth0 } from "@auth0/auth0-vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const { isAuthenticated, loginWithRedirect } = useAuth0();
const router = useRouter();

onMounted(() => {
  if (!isAuthenticated.value) {
    loginWithRedirect();
  }
});
</script>

<template>
  <main>
    <div v-if="isAuthenticated">
      <LunchManagement />
      <div class="logout-container"> <Logout/></div>
    </div>
    <div v-else class="newtons-cradle">
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
    </div>

  </main>
</template>

<style scoped>


.newtons-cradle {
 --uib-size: 50px;
 --uib-speed: 1.2s;
 --uib-color: #474554;
 position: relative;
 align-items: center;
 justify-content: center;
 width: var(--uib-size);
 height: var(--uib-size);
 position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.newtons-cradle__dot {
 position: relative;
 display: flex;
 align-items: center;
 height: 100%;
 width: 25%;
 transform-origin: center top;
}

.newtons-cradle__dot::after {
 content: '';
 display: block;
 width: 100%;
 height: 25%;
 border-radius: 50%;
 background-color: var(--uib-color);
}

.newtons-cradle__dot:first-child {
 animation: swing var(--uib-speed) linear infinite;
}

.newtons-cradle__dot:last-child {
 animation: swing2 var(--uib-speed) linear infinite;
}

@keyframes swing {
 0% {
  transform: rotate(0deg);
  animation-timing-function: ease-out;
 }

 25% {
  transform: rotate(70deg);
  animation-timing-function: ease-in;
 }

 50% {
  transform: rotate(0deg);
  animation-timing-function: linear;
 }
}

@keyframes swing2 {
 0% {
  transform: rotate(0deg);
  animation-timing-function: linear;
 }

 50% {
  transform: rotate(0deg);
  animation-timing-function: ease-out;
 }

 75% {
  transform: rotate(-70deg);
  animation-timing-function: ease-in;
 }
}

.logout-container {
  position: absolute;
  top: 175px;
  right: 20px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 80px;
}

.logout-container button {
  background: black;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .logout-container {
    position: relative;
    top: auto;
    right: auto;
    margin: 10px auto;
    text-align: center;
    width: fit-content;
  }
}

</style>