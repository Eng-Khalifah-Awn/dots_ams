<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_user') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddUserForm">
          <div class="mb-3">
            <label for="lbltxtName" class="form-label">{{ $t('name_user') }}</label>
            <input v-model="addUserForm.name" type="text" class="form-control" id="lbltxtName">
            <span class="text-danger" v-if="v$.name.$error">{{ $t('name_should_be_3_character') }}</span>
          </div> <!--Name-->
          <div class="mb-3">
            <label for="lbltxtPassword" class="form-label">{{ $t('Password') }}</label>
            <input v-model="addUserForm.password" type="password" class="form-control" id="lbltxtPassword">
            <span class="text-danger" v-if="v$.password.$error">{{ $t('password_should_be_8_character') }}</span>
          </div> <!--Password-->
          <div class="mb-3">
            <label for="lbltxtUserName" class="form-label">{{ $t('phone_number') }}</label>
            <input v-model="addUserForm.phoneNumber" type="text" class="form-control" id="lbltxtUserName">
            <span class="text-danger" v-if="v$.phoneNumber.$error">{{ $t('username_should_be_3_character') }}</span>
          </div> <!--PhoneNumber-->
          <div class="mb-3">
            <label for="lblselectBranch" class="form-label">{{ $t('select_branch') }}</label>
            <select v-model="addUserForm.branchID" id="lblselectBranch" class="form-select">
              <option v-for="branch in listOfBranches" :key="branch.id" :value="branch.id">{{ branch.name }}</option>
            </select>
            <span class="text-danger" v-if="v$.branchID.$error">{{ $t('please_select_a_branch') }}</span>
          </div> <!--Branches-->
          <div class="mb-3">
            <label for="lblselectPermission" class="form-label">{{ $t('select_permission') }}</label>
            <select v-model="addUserForm.permissionID" id="lblselectPermission" class="form-select">
              <option v-for="permission in listOfPermissions" :key="permission.id" :value="permission.id">{{ permission.nameRole }}</option>
            </select>
            <span class="text-danger" v-if="v$.permissionID.$error">{{ $t('please_select_a_permission') }}</span>
          </div> <!--Permissions-->
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

// This fun is need to be in first of script
checkUserRole(['isAdmin'])
// end fun check user

const { t } = useI18n()
const appStore = useAppStore();
const listOfBranches = ref([]);
const listOfPermissions = ref([
  {
    'id': 2,
    'nameRole': 'مدير فرع'
  },
  {
    'id': 3,
    'nameRole': 'كاشير '
  }
]);
const token = Cookies.get('tokenOfUser')
const hasUpperCase = (value) => /[A-Z]/.test(value) || 'Password must include at least one uppercase letter';
const hasSpecialChar = (value) => /[!@#$%^&*]/.test(value) || 'Password must include at least one special character';
const hasNumber = (value) => /\d/.test(value) || 'Password must include at least one number';




// Start btn Add User

const addUserForm = ref({
  name: '',
  password: '',
  phoneNumber: '',
  branchID: '',
  permissionID: ''

});
// Start computed
const rules = computed(() => ({
  name: { required, minLength: minLength(3) },
  phoneNumber: { required, minLength: minLength(9) },
  password: { required, minLength: minLength(8), hasNumber, hasUpperCase, hasSpecialChar },
  branchID: { required },
  permissionID: { required },
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

/*  await checkUserLogin()

  try {
    const token = Cookies.get('tokenOfUser')
    const resultOfBranches = await axios.get(
        `https://foods.alkarmoshy.com/cashier_api/branches`,
        {
          headers:{
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }
        }
    );
    if (resultOfBranches.status === 200 && resultOfBranches.data.error === false) {
      listOfBranches.value = resultOfBranches.data.data;
    }
  }catch (e) {
    const {t} = useI18n()
    setTimeout(() => {
      showToast(t('error_failed_successfully'), 'error')
    }, 1000);

  }*/



});
//



</script>

<style lang="scss" scoped>

</style>