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
                <h6 class="col-lg-5 col-md-5 col-sm-5">{{ $t('user_table') }}</h6>
                <div class="col-lg-3 col-md-3 col-sm-3">
                  <input class="form-control " v-model="filters['global'].value" placeholder="Search...">
                </div>

                <button class="btn btn-success col-lg-1 col-md-1 col-sm-1 ms-1" @click="exportCSV"><font-awesome-icon :icon="['fas', 'file-csv']" /></button>
                <router-link :to="{name: 'AddUsers'}" class="btn btn-primary col-lg-2 col-md-2 col-sm-2 me-1">
                  {{ $t('add') }} +
                </router-link>

              </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2" v-if="listOfUsers.length > 0">
              <DataTable ref="dt"
                         :value="listOfUsers"
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

                         :globalFilterFields="['name_brand_category', ]">

                <template #empty>No assets found.</template>
                <template #loading>Loading asset data. Please wait.</template>

                <Column field="id" header="#" sortable>
                  <template #body="slotProps">
                    <a style="cursor: pointer;" @click.prevent="viewUser(slotProps.data)">
                      {{ slotProps.data.id }}
                    </a>
                  </template>
                </Column>
                <Column field="username" header="User Name" sortable></Column>
                <Column field="email" header="email" sortable></Column>
                <Column field="company.name_company" header="Company" sortable></Column>
                <Column field="department.name_department" header="Department" sortable></Column>
                <Column field="signature_file" header="File" :exportable="false">
                  <template #body="slotProps">
                    <a
                        :href="slotProps.data.signature_file"
                        target="_blank"
                        download
                        class="text-primary"
                    >
                      <font-awesome-icon :icon="['fas', 'file-pdf']" />
                    </a>

                  </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                  <template #body="slotProps">
                    <button type="button" class="btn btn-success ms-1 me-1" @click="editUser(slotProps.data)">Edit</button>
                    <button type="button" class="btn btn-danger">Delete</button>
                  </template>
                </Column>

              </DataTable>
            </div>
            <div class="py-4 container-fluid" v-else>
              <div class="row d-flex">
                <div class="card col-12 text-center">
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
import {ref, onMounted} from "vue";
import {checkUserLogin} from "@/services/checkUserSignin";
import {showToast} from "@/services/customToast";
import {fetchUsers} from "@/services/apiService/getApiService";
import {FilterMatchMode} from "primevue/api";
import {useAppStore} from "@/stores/store.js";
import router from "@/router/router.js";


const listOfUsers = ref([]);
const appStore = useAppStore();

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
const editUser = (user) => {
  router.push({ name: 'UpdateUser', params: { userId: user.id } })
}
const viewUser = (user) => {
  router.push({ name: 'ShowUser', params: { userId: user.id } })
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


    const resultUsers = await fetchUsers();

    /*let [resultUsers, resultBranch] = await Promise.all([
      await fetchUsers(),
      await fetchBranches()
    ]);*/
    // updateLoadingPercentage()
    if (resultUsers.status === 200) {
      listOfUsers.value = resultUsers.data.results;
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


</script>