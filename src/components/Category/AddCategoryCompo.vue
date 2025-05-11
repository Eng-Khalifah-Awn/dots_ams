<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_category') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddCategoryForm">
          <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
              <label for="lbltxtName" class="form-label">{{ $t('name_category') }}</label>
              <input v-model="addCategoryForm.name_category" type="text" class="form-control" id="lbltxtName" required>
              <span class="text-danger" v-if="v$.name_category.$error">{{ $t('name_should_be_3_character') }}</span>

            </div> <!--name_category-->
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



const { t } = useI18n()
const appStore = useAppStore();

const token = Cookies.get('tokenOfUser')


// Start btn Add User

const addCategoryForm = ref({
  name_category: '',


});
// Start computed
const rules = computed(() => ({
  name_category: { required, minLength: minLength(3) },

}))
// End computed

// Vuelidate validation object
const v$ = useValidate(rules, addCategoryForm)

const submitAddCategoryForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add user data:', addCategoryForm.value)
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

      const resultOfAddUser = await apiClient.post('category/', {
        name_category: addCategoryForm.value.name_category,

      });

      console.log('Form submitted successfully:', resultOfAddUser.data)
      if (resultOfAddUser.status === 201){
        setTimeout(()=>{
          showToast(t('category_added_successfully'), 'success')
        }, 1000);
        await appStore.redirectTo("Categories")
        addCategoryForm.value.name_category = "";

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