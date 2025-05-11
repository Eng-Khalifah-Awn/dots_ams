<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_company') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddCompanyForm">
          <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
              <label for="lbltxtNameCompany" class="form-label">{{ $t('name_company') }}</label>
              <input v-model="addCompanyForm.name_company" type="text" class="form-control" id="lbltxtNameCompany" required>
              <span class="text-danger" v-if="v$.name_company.$error">{{ $t('name_should_be_3_character') }}</span>

            </div> <!--name_company-->
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

// This fun is need to be in first of script
checkUserRole(['isAdmin'])
// end fun check user

const { t } = useI18n()
const appStore = useAppStore();
const token = Cookies.get('tokenOfUser')

// Start btn Add User

const addCompanyForm = ref({
  name_company: '',

});
// Start computed
const rules = computed(() => ({
  name_company: { required, minLength: minLength(3) },

}))
// End computed

// Vuelidate validation object
const v$ = useValidate(rules, addCompanyForm)

const submitAddCompanyForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add user data:', addCompanyForm.value)
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

      const resultOfAddUser = await apiClient.post('company/', {
        name_company: addCompanyForm.value.name_company,
      });

      console.log('Form submitted successfully:', resultOfAddUser.data)
      if (resultOfAddUser.status === 201){
        setTimeout(()=>{
          showToast(t('company_added_successfully'), 'success')
        }, 1000);
        await appStore.redirectTo("Companies")
        addCompanyForm.value.name_company = "";
      }


    } catch (e) {
      console.error('Error submitting form:', e)
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