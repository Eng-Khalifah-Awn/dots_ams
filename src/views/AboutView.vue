<script setup>
import {useAppStore} from "@/stores/store.js";

const appStore = useAppStore();

const handleLogout = () => {
  appStore.logout();
  appStore.redirectTo('login')
}

</script>

<template>
<h1>Hello I am About View</h1>
  <h2>{{ currentRouteName }}</h2>
  <button @click="handleLogout">Logout</button>
</template>

<style scoped>

</style>