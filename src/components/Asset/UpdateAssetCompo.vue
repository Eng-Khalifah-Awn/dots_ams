<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ editAssetsForm.asset_number+"   -   "+editAssetsForm.name_asset }}</h6>
      </div>
      <div class="card-body">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Information Asset
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <form @submit.prevent="submitEditAssetsForm">
                  <div>
                    <div class="row mb-3">
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('asset_number') }}</label>
                        <input v-model="editAssetsForm.asset_number" type="text" class="form-control" id="lbltxtName">
                      </div> <!--asset_number-->
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('name_asset') }}</label>
                        <input v-model="editAssetsForm.name_asset" type="text" class="form-control" id="lbltxtName">
                      </div> <!--name_asset-->
                    </div>
                    <div class="row mb-3">
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('description_asset') }}</label>
                        <input v-model="editAssetsForm.description_asset" type="text" class="form-control" id="lbltxtName" >
                      </div> <!--description_asset-->
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('serial_asset') }}</label>
                        <input v-model="editAssetsForm.serial_asset" type="text" class="form-control" id="lbltxtName" >
                      </div> <!--serial_asset-->
                    </div>
                    <div class="row mb-3">
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lblselectBranch" class="form-label">{{ $t('name_brand_category') }}</label>
                        <select v-model="editAssetsForm.name_brand_category" id="lblselectBranch" class="form-select">
                          <option v-for="brands in listBrand" :key="brands.id" :value="editAssetsForm.name_brand_category">{{ brands.name_brand_category }}</option>
                        </select>
                        <span class="text-danger" v-if="v$.name_brand_category.$error">{{ $t('please_select_a_branch') }}</span>
                      </div> <!--name_brand_category-->
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lblselectPermission" class="form-label">{{ $t('name_category') }}</label>
                        <select v-model="editAssetsForm.name_category" id="lblselectPermission" class="form-select">
                          <option v-for="categories in listCategory" :key="categories.id" :value="editAssetsForm.name_category">{{ categories.name_category }}</option>
                        </select>
                        <span class="text-danger" v-if="v$.name_category.$error">{{ $t('please_select_a_permission') }}</span>
                      </div> <!--name_category-->
                    </div>
                    <div class="row mb-3">
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('ram_size') }}</label>
                        <input v-model="editAssetsForm.ram_size" type="text" class="form-control" id="lbltxtName" >
                      </div> <!--ram_size-->
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('hard_disk_type') }}</label>
                        <input v-model="editAssetsForm.hard_disk_type" type="text" class="form-control" id="lbltxtName">
                      </div> <!--hard_disk_type-->
                    </div>
                    <div class="row mb-3">
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('capacity_hard_disk') }}</label>
                        <input v-model="editAssetsForm.capacity_hard_disk" type="text" class="form-control" id="lbltxtName">
                      </div> <!--capacity_hard_disk-->
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lblselectPermission" class="form-label">{{ $t('use_it_by') }}</label>
                        <select v-model="editAssetsForm.use_it_by" id="lblselectPermission" class="form-select">
                          <option v-for="users in listUsers" :key="users.id" :value="editAssetsForm.use_it_by">{{ users.first_name }}</option>
                        </select>
                        <span class="text-danger" v-if="v$.use_it_by.$error">{{ $t('please_select_a_permission') }}</span>
                      </div> <!--use_it_by-->
                    </div>
                    <div class="row mb-3">
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('status_asset') }}</label>
                        <input v-model="editAssetsForm.status_asset" type="text" class="form-control" id="lbltxtName" >
                      </div> <!--status_asset-->
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('did_i_check_it') }}</label>
                        <input v-model="editAssetsForm.did_i_check_it" type="text" class="form-control" id="lbltxtName" >
                      </div> <!--did_i_check_it-->
                    </div>
                    <div class="row mb-3">
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('date_take') }}</label>
                        <input v-model="editAssetsForm.date_take" type="text" class="form-control" id="lbltxtName" >
                      </div> <!--date_take-->
                      <div class="col-lg-6 col-md-6 col-sm-6 ">
                        <label for="lbltxtName" class="form-label">{{ $t('returned_take') }}</label>
                        <input v-model="editAssetsForm.returned_take" type="text" class="form-control" id="lbltxtName" >
                      </div> <!--returned_take-->
                    </div>

                  </div>
                </form>

              </div>
            </div> <!--body-accordin-->
          </div> <!--information asset-->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Images Assets
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="row mb-3">
                  <div class="col-12 text-center">
                    <img
                        :src="editAssetsForm.image_property"
                        alt="Asset Image"
                        class="img-fluid rounded shadow-sm"
                        style="max-height: 300px; object-fit: contain;"
                        @error="(e) => e.target.src = ''"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div> <!--images assets-->

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import "vue3-toastify/dist/index.css";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/stores/store.js";
import {checkUserLogin} from "@/services/checkUserSignin.js";
import {
  fetchAssetID,
  fetchBrands,
  fetchCategories,
  fetchUsers,
} from "@/services/apiService/getApiService.js";
import {useRoute} from "vue-router";
import {showToast} from "@/services/customToast.js";
import {minLength, required} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import {toast} from "vue3-toastify";

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore();


const assetId = route.params.assetId
const listOfAsset = ref([]);
const listUsers = ref([]);
const listBrand = ref([]);
const listCategory = ref([]);

const hasUpperCase = (value) => /[A-Z]/.test(value) || 'Password must include at least one uppercase letter';
const hasSpecialChar = (value) => /[!@#$%^&*]/.test(value) || 'Password must include at least one special character';
const hasNumber = (value) => /\d/.test(value) || 'Password must include at least one number';




// Start btn Add User

const editAssetsForm = ref({
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
  image_property: '',

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
const v$ = useValidate(rules, editAssetsForm)

const submitEditAssetsForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){
    console.log('add asset data:', editAssetsForm.value)
    try {

      const resultOfEditBranch = await axios.put(
          `https://awnams1.pythonanywhere.com/api/v1/${assetId}`,
          {
            asset_number: editAssetsForm.value.asset_number,
            name_asset: editAssetsForm.value.name_asset,
            description_asset: editAssetsForm.value.description_asset,
            serial_asset: editAssetsForm.value.serial_asset,
            name_brand_category: editAssetsForm.value.name_brand_category,
            name_category: editAssetsForm.value.name_category,
            ram_size: editAssetsForm.value.ram_size,
            hard_disk_type: editAssetsForm.value.hard_disk_type,
            capacity_hard_disk: editAssetsForm.value.capacity_hard_disk,
            use_it_by: editAssetsForm.value.use_it_by,
            status_asset: editAssetsForm.value.status_asset,
            did_i_check_it: editAssetsForm.value.did_i_check_it,
            date_take: editAssetsForm.value.date_take,
            returned_take: editAssetsForm.value.returned_take,
            image_property: editAssetsForm.value.image_property,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            }
          }
      );

      if (resultOfEditBranch.status === 200){
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

  try {

    await checkUserLogin()
    // updateLoadingPercentage()


    const resultAssetID = await fetchAssetID(assetId);
    const resultUsers = await fetchUsers();
    const resultBrand = await fetchBrands();
    const resultCategory = await fetchCategories();

    if (
        resultUsers.status === 200 &&
        resultBrand.status === 200 &&
        resultCategory.status === 200 &&
        resultAssetID.status === 200
    ) {
      listUsers.value = resultUsers.data.results;
      listBrand.value = resultBrand.data.results;
      listCategory.value = resultCategory.data.results;
      editAssetsForm.value.asset_number = resultAssetID.data.asset_number;
      editAssetsForm.value.name_asset = resultAssetID.data.name_asset;
      editAssetsForm.value.description_asset = resultAssetID.data.description_asset;
      editAssetsForm.value.serial_asset = resultAssetID.data.serial_asset;
      editAssetsForm.value.name_brand_category = resultAssetID.data.name_brand_category;
      editAssetsForm.value.name_category = resultAssetID.data.name_category;
      editAssetsForm.value.ram_size = resultAssetID.data.ram_size;
      editAssetsForm.value.hard_disk_type = resultAssetID.data.hard_disk_type;
      editAssetsForm.value.capacity_hard_disk = resultAssetID.data.capacity_hard_disk;
      editAssetsForm.value.use_it_by = resultAssetID.data.use_it_by;
      editAssetsForm.value.status_asset = resultAssetID.data.status_asset;
      editAssetsForm.value.did_i_check_it = resultAssetID.data.did_i_check_it;
      editAssetsForm.value.date_take = resultAssetID.data.date_take;
      editAssetsForm.value.returned_take = resultAssetID.data.returned_take;
      editAssetsForm.value.image_property = resultAssetID.data.image_property;

      console.log(`Users:`, listUsers.value);
      console.log(`Brands:`, listBrand.value);
      console.log(`Categories:`, listCategory.value);
      console.log(`the result of Assets ${listOfAsset.value}`);
    }


  }catch (error) {
    if (error.response){
      setTimeout(() => {
        showToast(error.response.data.detail, 'error')
      }, 1000);
    }
  }finally {
    setTimeout(()=>{
      // completeLoading()
    }, 1000)
  }


});
//



</script>

<style lang="scss" scoped>

</style>