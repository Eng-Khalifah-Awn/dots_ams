<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_asset') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddUserForm">
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('asset_number') }}</label>
              <input v-model="addUserForm.asset_number" type="text" class="form-control" id="lbltxtName" readonly>
              <span class="text-danger" v-if="v$.asset_number.$error">{{ $t('name_should_be_3_character') }}</span>
            </div> <!--asset_number-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('name_asset') }}</label>
              <input v-model="addUserForm.name_asset" type="text" class="form-control" id="lbltxtName" readonly>
              <span class="text-danger" v-if="v$.name_asset.$error">{{ $t('name_should_be_3_character') }}</span>

            </div> <!--name_asset-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('description_asset') }}</label>
              <input v-model="addUserForm.description_asset" type="text" class="form-control" id="lbltxtName" readonly>
            </div> <!--description_asset-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('serial_asset') }}</label>
              <input v-model="addUserForm.serial_asset" type="text" class="form-control" id="lbltxtName" readonly>
              <span class="text-danger" v-if="v$.serial_asset.$error">{{ $t('name_should_be_3_character') }}</span>
            </div> <!--serial_asset-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lblselectBranch" class="form-label">{{ $t('name_brand_category') }}</label>
              <select v-model="addUserForm.branchID" id="lblselectBranch" class="form-select">
                <option v-for="brands in listBrand" :key="brands.id" :value="brands.id">{{ brands.name_brand_category }}</option>
              </select>
              <span class="text-danger" v-if="v$.name_brand_category.$error">{{ $t('please_select_a_branch') }}</span>
            </div> <!--name_brand_category-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lblselectPermission" class="form-label">{{ $t('name_category') }}</label>
              <select v-model="addUserForm.name_category" id="lblselectPermission" class="form-select">
                <option v-for="categories in listCategory" :key="categories.id" :value="categories.id">{{ categories.name_category }}</option>
              </select>
              <span class="text-danger" v-if="v$.name_category.$error">{{ $t('please_select_a_permission') }}</span>
            </div> <!--name_category-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('ram_size') }}</label>
              <input v-model="addUserForm.ram_size" type="text" class="form-control" id="lbltxtName" readonly>
            </div> <!--ram_size-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('hard_disk_type') }}</label>
              <input v-model="addUserForm.hard_disk_type" type="text" class="form-control" id="lbltxtName" readonly>
            </div> <!--hard_disk_type-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('capacity_hard_disk') }}</label>
              <input v-model="addUserForm.capacity_hard_disk" type="text" class="form-control" id="lbltxtName" readonly>
            </div> <!--capacity_hard_disk-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lblselectPermission" class="form-label">{{ $t('use_it_by') }}</label>
              <select v-model="addUserForm.use_it_by" id="lblselectPermission" class="form-select">
                <option v-for="users in listUsers" :key="users.id" :value="users.id">{{ users.first_name }}</option>
              </select>
              <span class="text-danger" v-if="v$.use_it_by.$error">{{ $t('please_select_a_permission') }}</span>
            </div> <!--use_it_by-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('status_asset') }}</label>
              <input v-model="addUserForm.status_asset" type="text" class="form-control" id="lbltxtName" readonly>
            </div> <!--status_asset-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('did_i_check_it') }}</label>
              <input v-model="addUserForm.did_i_check_it" type="text" class="form-control" id="lbltxtName" readonly>
              <span class="text-danger" v-if="v$.did_i_check_it.$error">{{ $t('name_should_be_3_character') }}</span>

            </div> <!--did_i_check_it-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('date_take') }}</label>
              <input v-model="addUserForm.date_take" type="text" class="form-control" id="lbltxtName" readonly>
            </div> <!--date_take-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('returned_take') }}</label>
              <input v-model="addUserForm.returned_take" type="text" class="form-control" id="lbltxtName" readonly>
            </div> <!--returned_take-->
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
const listUsers = ref([]);
const listBrand = ref([]);
const listCategory = ref([]);
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

    const resultUsers = await fetchUsers();
    const resultBrand = await fetchBrands();
    const resultCategory = await fetchCategories();

    if (
        resultUsers.status === 200 &&
        resultBrand.status === 200 &&
        resultCategory.status === 200
    ) {
      listUsers.value = resultUsers.data.results;
      listBrand.value = resultBrand.data.results;
      listCategory.value = resultCategory.data.results;

      console.log(`Users:`, listUsers.value);
      console.log(`Brands:`, listBrand.value);
      console.log(`Categories:`, listCategory.value);
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