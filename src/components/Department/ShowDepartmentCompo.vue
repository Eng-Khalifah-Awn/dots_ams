<template>
  <div class="container-fluid" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header pb-0">
        <h6 class="col-lg-10 col-md-10 col-sm-10">{{ $t('show_user') }}</h6>
      </div>
      <div class="card-body">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Information User
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
              <div class="accordion-body">
                <div class="row">
                  <div class="col">{{listOfUser.first_name}}</div>
                </div>
              </div>
            </div> <!--body-accordin-->
          </div> <!--information user-->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                Section User
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
              <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div> <!--section user-->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                Images Assets
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
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
import {fetchUserID} from "@/services/apiService/getApiService.js";
import {useRoute} from "vue-router";
import {showToast} from "@/services/customToast.js";

const route = useRoute()
const { t } = useI18n()
const appStore = useAppStore();


const userId = route.params.userId
const listOfUser = ref([]);


//
onMounted(async ()=>{

  try {

    await checkUserLogin()
    // updateLoadingPercentage()


    const resultUsers = await fetchUserID(userId);

    /*let [resultUsers, resultBranch] = await Promise.all([
      await fetchUsers(),
      await fetchBranches()
    ]);*/
    // updateLoadingPercentage()
    if (resultUsers.status === 200) {
      listOfUser.value = resultUsers.data;
      console.log(`the result of Brands ${listOfUser.value}`)
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