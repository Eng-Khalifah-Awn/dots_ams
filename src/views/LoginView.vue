<template>
  <!-- From Uiverse.io by omriluz -->

  <div class="center-form-login">
    <div class="text-center">
      <ToastContainer />
    </div>

      <div class="form-container">
        <form class="form" @submit.prevent="funLogin">
          <div class="form-group">
            <label for="edtxtUserName" class="form-label">{{ $t('username') }}</label>
            <input v-model="submitLoginForm.username" type="text" class="form-control" id="edtxtUserName">
            <span class="text-danger" v-if="v$.username.$error">{{ $t('username_is_required') }}</span>
          </div>
          <div class="form-group">
            <label for="edtxtPassword" class="form-label">{{ $t('password') }}</label>
            <input v-model="submitLoginForm.password" type="password" class="form-control" id="edtxtPassword">
            <span class="text-danger" v-if="v$.password.$error">{{ $t('password_is_required') }}</span>
          </div>
          <button type="submit" class="form-submit-btn" :disabled="loading">

            <span v-if="loading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <span v-else>{{ $t('submit') }}</span>
          </button>

        </form>
      </div>
  </div>

</template>

<script setup>

import {useAppStore} from "@/stores/store.js";
import {computed, nextTick, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {minLength, required} from "@vuelidate/validators";
import {showToast} from "@/services/customToast.js";
import {useI18n} from "vue-i18n";
import axios from "axios";
import getApiService, {defaultAPI} from "@/services/apiService/getApiService.js";
import Cookies from "js-cookie";

const appStore = useAppStore();
const { t } = useI18n()

const loading = ref(false);



const hasUpperCase = (value) => /[A-Z]/.test(value) || 'Password must include at least one uppercase letter';
const hasSpecialChar = (value) => /[!@#$%^&*]/.test(value) || 'Password must include at least one special character';
const hasNumber = (value) => /\d/.test(value) || 'Password must include at least one number';

const submitLoginForm = ref({
  username:"",
  password:"",
})

const rules = computed(()=>({
  username: {
    required,
    minLength: minLength(3),
  },
  password: {
    required,
    minLength: minLength(3),
    hasUpperCase, hasNumber, hasSpecialChar
  },
}));



const v$ = useVuelidate(rules, submitLoginForm)

const funLogin = async ()=>{
  loading.value = true;
  v$.value.$touch();
  if (!v$.value.$invalid){
    try {

      const resultOfLogin = await axios.post(
          `https://awnams1.pythonanywhere.com/api/v1/login/`,
          {
            username: submitLoginForm.value.username,
            password: submitLoginForm.value.password
          },
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
      )

      if (resultOfLogin.status === 200){
        Cookies.set("tokenOfUser", await resultOfLogin.data.access,{
          expires: 1, // Cookie expiration in days
          secure: true, // Ensures cookie is only sent over HTTPS
          sameSite: 'Strict', // Helps prevent CSRF attacks
          httpOnly: false,
        });
        Cookies.set("tokenOfRefresh", resultOfLogin.data.refresh,{
          expires: 1,
          secure: true,
          sameSite: 'Strict',
          httpOnly: false,
        });
        // appStore.login(await resultOfLogin.data.access);
        loading.value = false;
        appStore.redirectTo("home");
        setTimeout(()=>{
          showToast(t("Welcome to Dots Asset Management"), 'success')
        }, 1000)
      }else {
        loading.value = false;
        setTimeout(()=>{
          showToast(t("You should go to next page"), 'error')
        }, 1000)
      }




    }catch (error) {
      loading.value = false;
      if (error.response){
        setTimeout(()=>{
          showToast(error.response.data.detail, 'error')
        }, 1000)
        console.log(`the error is ${error.response.data.detail}`)
      }else {
        console.log(`error is ${error}`)
      }
    }
  }
  else {
    loading.value = false;
    console.log("invalid form")
  }
}


</script>

<style scoped>

.center-form-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.form-container {
  width: 400px;
  background: linear-gradient(#212121, #212121) padding-box,
  linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;
  background-size: 200% 100%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.form-container button:active {
  scale: 0.95;
}

.form-container .form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 5px;
  color: #717171;
  font-weight: 600;
  font-size: 12px;
}

.form-container .form-group input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  color: #fff;
  font-family: inherit;
  background-color: transparent;
  border: 1px solid #414141;
}

.form-container .form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  resize: none;
  color: #fff;
  height: 96px;
  border: 1px solid #414141;
  background-color: transparent;
  font-family: inherit;
}

.form-container .form-group input::placeholder {
  opacity: 0.5;
}

.form-container .form-group input:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-group textarea:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-submit-btn {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  font-family: inherit;
  color: #717171;
  font-weight: 600;
  width: 40%;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 6px;
}

.form-container .form-submit-btn:hover {
  background-color: #fff;
  border-color: #fff;
}

</style>