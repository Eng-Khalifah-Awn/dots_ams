<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ listOfAsset.asset_number+"   -   "+listOfAsset.name_asset }}</h6>
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
                <div>
                  <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('asset_number') }}</label>
                      <input v-model="listOfAsset.asset_number" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--asset_number-->
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('name_asset') }}</label>
                      <input v-model="listOfAsset.name_asset" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--name_asset-->
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('description_asset') }}</label>
                      <input v-model="listOfAsset.description_asset" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--description_asset-->
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('serial_asset') }}</label>
                      <input v-model="listOfAsset.serial_asset" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--serial_asset-->
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('name_brand_category') }}</label>
                      <input :value="listOfAsset.name_brand_category?.name_brand_category" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--name_brand_category-->
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('name_category') }}</label>
                      <input :value="listOfAsset.name_category?.name_category" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--name_category-->
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('ram_size') }}</label>
                      <input v-model="listOfAsset.ram_size" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--ram_size-->
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('hard_disk_type') }}</label>
                      <input v-model="listOfAsset.hard_disk_type" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--hard_disk_type-->
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('capacity_hard_disk') }}</label>
                      <input v-model="listOfAsset.capacity_hard_disk" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--capacity_hard_disk-->
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('use_it_by') }}</label>
                      <input v-model="listOfAsset.use_it_by" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--use_it_by-->
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('status_asset') }}</label>
                      <input v-model="listOfAsset.status_asset" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--status_asset-->
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('did_i_check_it') }}</label>
                      <input v-model="listOfAsset.did_i_check_it" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--did_i_check_it-->
                  </div>
                  <div class="row mb-3">
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('date_take') }}</label>
                      <input v-model="listOfAsset.date_take" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--date_take-->
                    <div class="col-lg-6 col-md-6 col-sm-6 ">
                      <label for="lbltxtName" class="form-label">{{ $t('returned_take') }}</label>
                      <input v-model="listOfAsset.returned_take" type="text" class="form-control" id="lbltxtName" readonly>
                    </div> <!--returned_take-->
                  </div>



                </div>
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
                        :src="listOfAsset.image_property"
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
import {onMounted, ref} from "vue";
import axios from "axios";
import "vue3-toastify/dist/index.css";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/stores/store.js";
import {checkUserLogin} from "@/services/checkUserSignin.js";
import {fetchAssetID, fetchUserID} from "@/services/apiService/getApiService.js";
import {useRoute} from "vue-router";
import {showToast} from "@/services/customToast.js";

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore();


const assetId = route.params.assetId
const listOfAsset = ref([]);


//
onMounted(async ()=>{

  try {

    await checkUserLogin()
    // updateLoadingPercentage()


    const resultAssetID = await fetchAssetID(assetId);


    // updateLoadingPercentage()
    if (resultAssetID.status === 200) {
      listOfAsset.value = resultAssetID.data;
      console.log(`the result of Brands ${listOfAsset.value}`)
      // updateLoadingPercentage()

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