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
                <h6 class="col-lg-5 col-md-5 col-sm-5">{{ $t('category_table') }}</h6>
                <div class="col-lg-3 col-md-3 col-sm-3">
                  <input class="form-control " v-model="filters['global'].value" placeholder="Search...">
                </div>

                <button class="btn btn-success col-lg-1 col-md-1 col-sm-1 ms-1" @click="exportCSV"><font-awesome-icon :icon="['fas', 'file-csv']" /></button>
                <router-link :to="{name: 'AddCategory'}" class="btn btn-primary col-lg-2 col-md-2 col-sm-2 me-1">
                  {{ $t('add') }} +
                </router-link>

              </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2" v-if="listOfCategories.length > 0">
              <DataTable ref="dt"
                         :value="listOfCategories"
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

                         :globalFilterFields="['name_category', ]">

                <template #empty>No assets found.</template>
                <template #loading>Loading asset data. Please wait.</template>

                <Column field="id" header="#" sortable></Column>
                <Column field="name_category" header="Category Name" sortable></Column>
                <Column :exportable="false" style="min-width: 12rem">
                  <template #body="slotProps">
                    <button type="button" class="btn btn-success ms-1 me-1" @click="editProduct(slotProps.data)">Edit</button>
                    <button type="button" class="btn btn-danger">Delete</button>
                  </template>
                </Column>


              </DataTable>
            </div>
            <div class="py-4 container-fluid" v-else>
              <div class="row">
                <div class="card">
                  <img class="col-12" src="../../src/assets/img/logo_dots_remove_background.png" alt="logo alqarmoshi">
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
import {
  fetchAssets,
  fetchBranches,
  fetchBrands,
  fetchCategories,
  fetchUsers
} from "@/services/apiService/getApiService";
import {FilterMatchMode} from "primevue/api";
import {useAppStore} from "@/stores/store.js";
import router from "@/router/router.js";


const listOfCategories = ref([]);
const appStore = useAppStore();


const loading = ref(true)
const editProduct = (category) => {
  router.push({ name: 'UpdateCategory', params: { categoryId: category.id } })
}
const rowsPerPage = ref(10)
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name_brand_category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

const dt = ref()

const exportCSV = () => {
  dt.value.exportCSV()
}


onMounted(async () => {

  /*checkUserRole(['isAdmin'])*/

  try {

    await checkUserLogin()
    // updateLoadingPercentage()


    const resultCategories = await fetchCategories();

    /*let [resultUsers, resultBranch] = await Promise.all([
      await fetchUsers(),
      await fetchBranches()
    ]);*/
    // updateLoadingPercentage()
    if (resultCategories.status === 200) {
      listOfCategories.value = resultCategories.data.results;
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