<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_brand') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddUserForm">
          <div class="row mb-3">
            <div class="col-lg-12 col-md-12 col-sm-12 ">
              <label for="lbltxtName" class="form-label">{{ $t('name_brand') }}</label>
              <input v-model="addUserForm.name_asset" type="text" class="form-control" id="lbltxtName" readonly>
              <span class="text-danger" v-if="v$.name_asset.$error">{{ $t('name_should_be_3_character') }}</span>

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

const addUserForm = ref({
  asset_number: '',
  name_asset: '',
  description_asset: '',
  serial_asset: '',
  name_brand_category: '',
  name_category: '',
  ram_size: '',
  hard_disk_type: '',
  capacity_hard_disk: '',
  use_it_by: '',
  status_asset: '',
  did_i_check_it: '',
  date_take: '',
  returned_take: '',

});
// Start computed
const rules = computed(() => ({
  asset_number: { required, minLength: minLength(3) },
  name_asset: { required, minLength: minLength(9) },
  serial_asset: { required, minLength: minLength(8), },
  did_i_check_it: { required, minLength: minLength(3) },

  use_it_by: { required },
  name_brand_category: { required },
  name_category: { required },

}))
// End computed

// Vuelidate validation object
const v$ = useValidate(rules, addUserForm)

const submitAddUserForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add user data:', addUserForm.value)
    try {

      const apiClient = axios.create({
        baseURL: 'https://foods.alkarmoshy.com/cashier_api',
        headers: {
          'Authorization': `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const resultOfAddUser = await apiClient.post('/users', {
        name: addUserForm.value.name,
        phone_number: addUserForm.value.phoneNumber,
        branch_id: addUserForm.value.branchID,
        password: addUserForm.value.password,
        role: addUserForm.value.permissionID,
      });

      console.log('Form submitted successfully:', resultOfAddUser.data)
      if (resultOfAddUser.status === 200){
        setTimeout(()=>{
          showToast(t('user_added_successfully'), 'success')
        }, 1000);
        await appStore.redirectTo("Users")
        addUserForm.value.name = "";
        addUserForm.value.phoneNumber = "";
        addUserForm.value.password = "";
        addUserForm.value.branchID = "";
        addUserForm.value.permissionID = "";
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