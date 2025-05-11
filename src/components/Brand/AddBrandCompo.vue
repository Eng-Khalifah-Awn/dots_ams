<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_brand') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddBrandForm">
          <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
              <label for="lbltxtName" class="form-label">{{ $t('name_brand') }}<span class="text-danger">*</span></label>
              <input v-model="addBrandForm.name_brand_category" type="text" class="form-control" id="lbltxtName" required>
              <span class="text-danger" v-if="v$.name_brand_category.$error">{{ $t('name_should_be_3_character') }}</span>

            </div> <!--name_asset-->
          </div>
          <button type="submit" class="btn btn-primary">{{ $t('submit') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import "vue3-toastify/dist/index.css";
import {showToast} from "@/services/customToast";
import {redirectTo} from "@/services/redirectTo";
import {useI18n} from "vue-i18n";
import {checkUserLogin} from "@/services/checkUserSignin";
import {checkUserRole} from "@/services/permissions/checkUserPermission";
import Cookies from "js-cookie";
import {useAppStore} from "@/stores/store.js";
import {fetchBrands, fetchCategories, fetchUsers} from "@/services/apiService/getApiService.js";
import {defaultOptions as $i18n} from "primevue/config";

// This fun is need to be in first of script
checkUserRole(['isAdmin'])
// end fun check user

const { t } = useI18n()
const appStore = useAppStore();


const token = Cookies.get('tokenOfUser')
const hasUpperCase = (value) => /[A-Z]/.test(value) || 'Password must include at least one uppercase letter';
const hasSpecialChar = (value) => /[!@#$%^&*]/.test(value) || 'Password must include at least one special character';
const hasNumber = (value) => /\d/.test(value) || 'Password must include at least one number';




// Start btn Add User

const addBrandForm = ref({
  name_brand_category: '',


});
// Start computed
const rules = computed(() => ({
  name_brand_category: { required, minLength: minLength(3) },


}))
// End computed

// Vuelidate validation object
const v$ = useValidate(rules, addBrandForm)

const submitAddBrandForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add brand data:', addBrandForm.value)
    try {

      const apiClient = axios.create({
        baseURL: 'https://awnams1.pythonanywhere.com/api/v1/',
        // baseURL: 'http://127.0.0.1:8000/api/v1/',
        headers: {
          'Authorization': `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const resultOfAddBrand = await apiClient.post('brand/', {
        name_brand_category: addBrandForm.value.name_brand_category,
      });

      console.log('Form submitted successfully:', resultOfAddBrand.data)
      if (resultOfAddBrand.status === 201){
        setTimeout(()=>{
          showToast(t('brand_added_successfully'), 'success')
        }, 1000);
        await appStore.redirectTo("Brands")
        addBrandForm.value.name_brand_category = "";

      }


    } catch (e) {
      if (e.response && e.response.data) {
        console.error('Server validation errors:', e.response.data);
        showToast(e.response.data.name_brand_category, "error")
      } else {
        console.error('Unknown error occurred:', e);
      }
    }
  }else{
    console.log('form invalid')
  }

};
// End btn Add User

//
onMounted(async ()=>{

  await checkUserLogin()



  try {

    /*let [resultUsers, resultBrand, resultCategory] = await Promise.all([
      fetchUsers(),
      fetchBrands(),
      fetchCategories()
    ]);*/



  }catch (e) {
    const {t} = useI18n()
    setTimeout(() => {
      showToast(t('error_failed_successfully'), 'error')
    }, 1000);

  }



});
//



</script>

<style lang="scss" scoped>

</style>