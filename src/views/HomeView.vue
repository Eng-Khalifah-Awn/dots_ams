<template>
  <div>
    <h1>{{ $t('hello_I_am_dashboard') }}</h1>
  </div>
</template>

<script setup>
import {checkUserLogin} from "@/services/checkUserSignin.js";
import {onMounted} from "vue";


onMounted(async ()=>{
  await checkUserLogin();
})


</script>

<style scoped>

</style>