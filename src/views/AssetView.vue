<template>
  <div class="container-fluid py-4" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div v-if="loadings" class="d-flex flex-column justify-content-center align-items-center"
               style="height: 100vh;">
            <!-- Loading Progress -->
            <div class="progress" style="width: 50%; height: 20px;">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"
                   :style="{ width: loadingPercentage + '%' }" :aria-valuenow="loadingPercentage" aria-valuemin="0"
                   aria-valuemax="100">
                {{ loadingPercentage }}%
              </div>
            </div>
            <p class="mt-3">Loading... {{ loadingPercentage }}%</p>
          </div>
          <div v-else>
            <div class="card-header">
              <div class="row">
                <h6 class="col-lg-5 col-md-5 col-sm-5">{{ $t('asset_table') }}</h6>
                <div class="col-lg-3 col-md-3 col-sm-3">
                  <input class="form-control " v-model="filters['global'].value" placeholder="Search...">
                </div>

                <button class="btn btn-success col-lg-1 col-md-1 col-sm-1 ms-1" @click="exportCSV"><font-awesome-icon :icon="['fas', 'file-csv']" /></button>
                  <router-link :to="{name: 'AddAsset'}" class="btn btn-primary col-lg-2 col-md-2 col-sm-2 me-1">
                    {{ $t('add') }} +
                  </router-link>

              </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2" v-if="listOfAssets.length > 0">
              <DataTable ref="dt"
                         :value="listOfAssets"
                         dataKey="id"
                         removableSort
                         sortMode="multiple"
                         :paginator="true"
                         :rows="rowsPerPage"
                         :rowsPerPageOptions="[10, 50, 100]"
                         v-model:filters="filters"
                         filterDisplay="row"
                         showGridlines
                         scrollable
                         resizableColumns columnResizeMode="fit"

                         :globalFilterFields="['asset_number', 'use_it_by']">

                <template #empty>{{ $t("no_assets_found") }}</template>
                <templatse #loading>{{ $t("loading_asset_please_wait") }}</templatse>

                <!-- 🧱 Columns -->
                <Column field="asset_number" header="Asset Number" sortable>
                  <template #filter="{ filterModel, filterCallback }">
                    <input class="form-control" v-model="filterModel.value" @input="filterCallback()" placeholder="Search asset number">
                  </template>
                  <template #body="slotProps">
                    <a style="cursor: pointer;" @click.prevent="viewAssets(slotProps.data)">
                      {{ slotProps.data.asset_number }}
                    </a>
                  </template>
                </Column>

                <Column field="use_it_by" header="User" sortable>
                  <template #filter="{ filterModel, filterCallback }">
                    <input class="form-control" v-model="filterModel.value" @input="filterCallback()" placeholder="Search user" />
                  </template>
                </Column>

                <Column field="name_asset" header="Name" sortable>
                  <template #filter="{ filterModel, filterCallback }">
                    <input class="form-control" v-model="filterModel.value" @input="filterCallback()" placeholder="Search name" />
                  </template>
                </Column>

                <Column field="serial_asset" header="Serial Number" sortable>
                  <template #filter="{ filterModel, filterCallback }">
                    <input class="form-control" v-model="filterModel.value" @input="filterCallback()" placeholder="Search serial" />
                  </template>
                </Column>



                <Column field="name_brand_category.name_brand_category" header="Brand Category" sortable>
                  <template #filter="{ filterModel, filterCallback }">
                    <input class="form-control" v-model="filterModel.value" @input="filterCallback()" placeholder="Search brand category" />
                  </template>
                </Column>

                <Column field="did_i_check_it" header="Checked?">
                  <template #filter="{ filterModel, filterCallback }">
                    <input class="form-check-input" type="checkbox" v-model="filterModel.value" binary @change="filterCallback()" />
                  </template>
                </Column>

                <Column :exportable="false" style="min-width: 12rem">
                  <template #body="slotProps">
                    <button type="button" class="btn btn-success ms-1 me-1" @click="editAssets(slotProps.data)">Edit</button>
                    <button type="button" class="btn btn-danger">Delete</button>
                  </template>
                </Column>
              </DataTable>
            </div>
            <div class="py-4 container-fluid" v-else>
              <div class="row">
                <div class="card">
                  <img class="col-12" src="../../src/assets/img/logo_dots_remove_background.png" alt="logo DOTS">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import {checkUserLogin} from "@/services/checkUserSignin";
import {showToast} from "@/services/customToast";
import {fetchAssets, fetchBranches, fetchUsers} from "@/services/apiService/getApiService";
import {FilterMatchMode} from "primevue/api";
import router from "@/router/router.js";


const listOfAssets = ref([]);

/*const listOfUsers = ref([
  {id: 1, name: 'Ahmed', phone_number: '789456123', branchName: 'Branch Name', role: 'Admin'},
  {id: 2, name: 'Ahmed', phone_number: '789456123', branchName: 'Branch Name', role: 'Admin'},
  {id: 3, name: 'Ahmed', phone_number: '789456123', branchName: 'Branch Name', role: 'Admin'},
  {id: 4, name: 'Ahmed', phone_number: '789456123', branchName: 'Branch Name', role: 'Admin'},
  {id: 5, name: 'Ahmed', phone_number: '789456123', branchName: 'Branch Name', role: 'Admin'},

]);*/

/*const listOfBranches = ref([]);
const totalSteps = 3;
const {
  loading,
  loadingPercentage,
  updateLoadingPercentage,
  completeLoading,
} = useLoadingProgress(totalSteps);*/


/*
const userWithBranchNames = computed(()=>{
  return listOfUsers.value.map(user=>{
    const branch = listOfBranches.value.find(branch => branch.id === user.branch_id);
    return{
      ...user,
      branchName: branch ? branch.name : "Unknown Branch",
    };
  });
});
*/
const loading = ref(true)
const rowsPerPage = ref(10)
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  asset_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  name_asset: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  serial_asset: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  use_it_by: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'name_brand_category.name_brand_category': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  did_i_check_it: { value: null, matchMode: FilterMatchMode.EQUALS },
})
const editAssets = (asset) => {
  router.push({ name: 'UpdateAsset', params: { assetId: asset.id } })
}
const viewAssets = (asset) => {
  router.push({ name: 'ShowAsset', params: { assetId: asset.id } })
}
const dt = ref()

const exportCSV = () => {
  dt.value.exportCSV()
}


onMounted(async () => {

  /*checkUserRole(['isAdmin'])*/

  try {

    await checkUserLogin()
    // updateLoadingPercentage()


    const resultAssets = await fetchAssets();

    /*let [resultUsers, resultBranch] = await Promise.all([
      await fetchUsers(),
      await fetchBranches()
    ]);*/
    // updateLoadingPercentage()
    if (resultAssets.status === 200) {
      listOfAssets.value = resultAssets.data.results;
      // updateLoadingPercentage()

    }
  }catch (error) {
    if (error.response){
      setTimeout(() => {
        showToast(error.response.data.message, 'error')
      }, 1000);
    }
  }finally {
    setTimeout(()=>{
      // completeLoading()
    }, 1000)
  }


});


</script>
