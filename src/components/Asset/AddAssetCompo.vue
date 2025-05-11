<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('add_asset') }}</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddAssetsForm">
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('asset_number') }}</label>
              <input v-model="addUserForm.asset_number" type="number" class="form-control" id="lbltxtName">
              <span class="text-danger" v-if="v$.asset_number.$error">{{ $t('name_should_be_3_character') }}</span>
            </div> <!--asset_number-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('name_asset') }}</label>
              <input v-model="addUserForm.name_asset" type="text" class="form-control" id="lbltxtName" >
              <span class="text-danger" v-if="v$.name_asset.$error">{{ $t('name_should_be_3_character') }}</span>

            </div> <!--name_asset-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('description_asset') }}</label>
              <input v-model="addUserForm.description_asset" type="text" class="form-control" id="lbltxtName" >
            </div> <!--description_asset-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('serial_asset') }}</label>
              <input v-model="addUserForm.serial_asset" type="text" class="form-control" id="lbltxtName" >
              <span class="text-danger" v-if="v$.serial_asset.$error">{{ $t('name_should_be_3_character') }}</span>
            </div> <!--serial_asset-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lblselectBranch" class="form-label">{{ $t('name_brand_category') }}</label>
              <select v-model="addUserForm.name_brand_category_id" id="lblselectBranch" class="form-select">
                <option v-for="brands in listBrand" :key="brands.id" :value="brands.id">{{ brands.name_brand_category }}</option>
              </select>
              <span class="text-danger" v-if="v$.name_brand_category_id.$error">{{ $t('please_select_a_brand_category') }}</span>
            </div> <!--name_brand_category-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lblselectPermission" class="form-label">{{ $t('name_category') }}</label>
              <select v-model="addUserForm.name_category_id" id="lblselectPermission" class="form-select">
                <option v-for="categories in listCategory" :key="categories.id" :value="categories.id">{{ categories.name_category }}</option>
              </select>
              <span class="text-danger" v-if="v$.name_category_id.$error">{{ $t('please_select_a_category') }}</span>
            </div> <!--name_category-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('ram_size') }}</label>
              <select v-model="addUserForm.ram_size" id="lblselectPermission" class="form-select">
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>
            </div> <!--ram_size-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('hard_disk_type') }}</label>
              <select v-model="addUserForm.hard_disk_type" id="lblselectPermission" class="form-select">
                <option value="SSD">SSD</option>
                <option value="HDD">HDD</option>
              </select>
            </div> <!--hard_disk_type-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('capacity_hard_disk') }}</label>
              <select v-model="addUserForm.capacity_hard_disk" id="lblselectPermission" class="form-select">
                <option value="250GB">250GB</option>
                <option value="500GB">500GB</option>
                <option value="1TB">1TB</option>
              </select>
            </div> <!--capacity_hard_disk-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lblselectPermission" class="form-label">{{ $t('use_it_by') }}</label>
              <select v-model="addUserForm.use_it_by" id="lblselectPermission" class="form-select">
                <option v-for="users in listUsers" :key="users.id" :value="users.first_name">{{ users.first_name }}</option>
              </select>
              <span class="text-danger" v-if="v$.use_it_by.$error">{{ $t('please_select_a_permission') }}</span>
            </div> <!--use_it_by-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('status_asset') }}</label>
              <select v-model="addUserForm.status_asset" id="lblselectPermission" class="form-select">
                <option value="Good">Good</option>
                <option value="Bad">Bad</option>
              </select>
            </div> <!--status_asset-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('did_i_check_it') }}</label>
              <select v-model="addUserForm.did_i_check_it" id="lblselectPermission" class="form-select">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <span class="text-danger" v-if="v$.did_i_check_it.$error">{{ $t('name_should_be_3_character') }}</span>

            </div> <!--did_i_check_it-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('date_take') }}</label>
              <input v-model="addUserForm.date_take" type="date" class="form-control" id="lbltxtName" >
            </div> <!--date_take-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtName" class="form-label">{{ $t('returned_take') }}</label>
              <input v-model="addUserForm.returned_take" type="date" class="form-control" id="lbltxtName" >
            </div> <!--returned_take-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-12  col-md-12 col-sm-12 ">
              <label for="lbltxtName" class="form-label">{{ $t('asset_image') }}</label>
              <input @change="handleImageAsset" type="file" class="form-control" id="lbltxtName"  alt="asset_image" required>
            </div> <!--image_property-->
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
import {defaultAPI, fetchBrands, fetchCategories, fetchUsers} from "@/services/apiService/getApiService.js";

// This fun is need to be in first of script
checkUserRole(['isAdmin'])
// end fun check user

const { t } = useI18n()
const appStore = useAppStore();
const listUsers = ref([]);
const listBrand = ref([]);
const listCategory = ref([]);

const token = Cookies.get('tokenOfUser')


const handleImageAsset = (event)=>{
  addUserForm.value.image_property = event.target.files[0];
}

// Start btn Add User

const addUserForm = ref({
  asset_number: '',
  name_asset: '',
  description_asset: '',
  serial_asset: '',
  name_brand_category_id: 0,
  name_category_id: 0,
  ram_size: '',
  hard_disk_type: '',
  capacity_hard_disk: '',
  use_it_by: '',
  status_asset: '',
  did_i_check_it: '',
  date_take: '',
  returned_take: '',
  image_property: '',

});
// Start computed
const rules = computed(() => ({
  asset_number: { required, minLength: minLength(3) },
  name_asset: { required, minLength: minLength(9) },
  serial_asset: { required, minLength: minLength(8), },

  did_i_check_it: { required },
  use_it_by: { required },
  name_brand_category_id: { required },
  name_category_id: { required },

}))
// End computed

// Vuelidate validation object
const v$ = useValidate(rules, addUserForm)

const submitAddAssetsForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add user data:', addUserForm.value)
    try {

      const apiClient = axios.create({
        baseURL: "https://awnams1.pythonanywhere.com/api/v1/",
        // baseURL: "http://127.0.0.1:8000/api/v1/",
        headers: {
          'Authorization': `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log(addUserForm.value.asset_number,
          addUserForm.value.name_asset,
          addUserForm.value.description_asset,
          addUserForm.value.serial_asset,
          addUserForm.value.name_brand_category,
          addUserForm.value.name_category,
          addUserForm.value.ram_size,
          addUserForm.value.hard_disk_type,
          addUserForm.value.capacity_hard_disk,
          addUserForm.value.use_it_by,
          addUserForm.value.status_asset,
          addUserForm.value.did_i_check_it,
          addUserForm.value.date_take,
          addUserForm.value.returned_take,
          addUserForm.value.image_property,
      )

      const formData = new FormData();
      formData.append('asset_number', addUserForm.value.asset_number);
      formData.append('name_asset', addUserForm.value.name_asset);
      formData.append('description_asset', addUserForm.value.description_asset);
      formData.append('serial_asset', addUserForm.value.serial_asset);
      formData.append('name_brand_category_id', addUserForm.value.name_brand_category_id);
      formData.append('name_category_id', addUserForm.value.name_category_id);
      formData.append('ram_size', addUserForm.value.ram_size);
      formData.append('hard_disk_type', addUserForm.value.hard_disk_type);
      formData.append('capacity_hard_disk', addUserForm.value.capacity_hard_disk);
      formData.append('use_it_by', addUserForm.value.use_it_by);
      formData.append('status_asset', addUserForm.value.status_asset);
      formData.append('did_i_check_it', addUserForm.value.did_i_check_it);
      formData.append('date_take', addUserForm.value.date_take);
      formData.append('returned_take', addUserForm.value.returned_take);
      formData.append('image_property', addUserForm.value.image_property);

      const resultOfAddUser = await apiClient.post('assets/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });


      console.log('Form submitted successfully:', resultOfAddUser.data)
      if (resultOfAddUser.status === 201){
        setTimeout(()=>{
          showToast(t('asset_added_successfully'), 'success')
        }, 1000);
        await appStore.redirectTo("Assets")
        addUserForm.value.asset_number ='';
        addUserForm.value.name_asset ='';
        addUserForm.value.description_asset ='';
        addUserForm.value.serial_asset ='';
        addUserForm.value.name_brand_category ='';
        addUserForm.value.name_category ='';
        addUserForm.value.ram_size ='';
        addUserForm.value.hard_disk_type ='';
        addUserForm.value.capacity_hard_disk ='';
        addUserForm.value.use_it_by ='';
        addUserForm.value.status_asset ='';
        addUserForm.value.did_i_check_it ='';
        addUserForm.value.date_take ='';
        addUserForm.value.returned_take ='';
        addUserForm.value.image_property ='';
      }


    } catch (e) {
      if (e.response && e.response.data) {
        console.error('Server validation errors:', e.response.data);
        showToast(e.response.data, "error")
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