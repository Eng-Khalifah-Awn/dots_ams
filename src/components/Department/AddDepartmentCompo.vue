<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_department') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAaddDepartmentForm">
          <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
              <label for="lbltxtNameDep" class="form-label">{{ $t('asset_department') }}</label>
              <input v-model="addDepartmentForm.name_department" type="text" class="form-control" id="lbltxtNameDep" required>
              <span class="text-danger" v-if="v$.name_department.$error">{{ $t('name_should_be_3_character') }}</span>
            </div> <!--name_department-->
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

const addDepartmentForm = ref({
  name_department: '',

});
// Start computed
const rules = computed(() => ({
  name_department: { required, minLength: minLength(3) },


}))
// End computed

// Vuelidate validation object
const v$ = useValidate(rules, addDepartmentForm)

const submitAaddDepartmentForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add user data:', addDepartmentForm.value)
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

      const resultOfAddDepartment = await apiClient.post('department/', {
        name_department: addDepartmentForm.value.name_department,
      });

      console.log('Form submitted successfully:', resultOfAddDepartment.data)
      if (resultOfAddDepartment.status === 201){
        setTimeout(()=>{
          showToast(t('department_added_successfully'), 'success')
        }, 1000);
        await appStore.redirectTo("Departments")
        addDepartmentForm.value.name_department = "";
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