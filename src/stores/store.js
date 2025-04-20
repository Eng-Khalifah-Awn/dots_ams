// stores/useAppStore.js
import {computed, ref} from 'vue';
import { defineStore } from 'pinia';
import router from '@/router/router';

export const useAppStore = defineStore('app', () => {
  const currentLanguage = ref(localStorage.getItem('language') || 'ar');


  // Actions to update the state



  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', currentLanguage.value);
  };


  const changeLanguage = () => {
    toggleLanguage();
  };

  const redirectTo = (routeName, nameOfParams, dataParams) => {
    router.push({ name: routeName, params:{nameOfParams: dataParams} });
  };

  return {
    currentLanguage,
    toggleLanguage,
    changeLanguage,
    redirectTo,
  };
});
