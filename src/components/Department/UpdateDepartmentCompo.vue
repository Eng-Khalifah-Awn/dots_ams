<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('update_company') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitEditDepartmentForm">
          <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
              <label for="lbltxtName" class="form-label">{{ $t('name_department') }}</label>
              <input v-model="editDepartmentForm.name_department" type="text" class="form-control" id="lbltxtName">
              <span class="text-danger" v-if="v$.name_department.$error">{{ $t('name_should_be_2_character') }}</span>

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
import {useI18n} from "vue-i18n";
import {checkUserLogin} from "@/services/checkUserSignin";
import {checkUserRole} from "@/services/permissions/checkUserPermission";
import Cookies from "js-cookie";
import {useAppStore} from "@/stores/store.js";
import {
  fetchBrandID,
  fetchBrands,
  fetchCategoryID,
  fetchCompanyID,
  fetchDepartmentID
} from "@/services/apiService/getApiService.js";
import {useRoute} from "vue-router";
import {toast} from "vue3-toastify";

// This fun is need to be in first of script
checkUserRole(['isAdmin'])
// end fun check user

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore();
const departmentId = route.params.departmentId

const token = Cookies.get('tokenOfUser')

// Start btn Add User

const editDepartmentForm = ref({
  name_department: '',

});
// Start computed
const rules = computed(() => ({

  name_department: { required, minLength: minLength(2) },

}))
// End computed

// Vuelidate validation object
const v$ = useValidate(rules, editDepartmentForm)

const submitEditDepartmentForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add department data:', editDepartmentForm.value)
    try {

      const resultOfEditCompany = await axios.put(
          `https://awnams1.pythonanywhere.com/api/v1/${departmentId}`,
          {
            name_department: editDepartmentForm.value.name_department,

          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            }
          }
      );

      if (resultOfEditCompany.status === 200){
        toast(t('edit_successfully'), {
          "theme": "auto",
          "type": t('success'),
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
        // editUserForm.value.name = "";

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

    const resultDepartmentID = await fetchDepartmentID(departmentId);

    if ( resultDepartmentID.status === 200 ) {
      console.log(`The result is ${resultDepartmentID.data.name_department}`)
      editDepartmentForm.value.name_department = resultDepartmentID.data.name_department;

    }


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