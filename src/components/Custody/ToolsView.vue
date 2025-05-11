<template>
  <div class="container-fluid mt-5" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <ToastContainer />
    <div class="card">
      <div class="card-header">
        <div class="row">
          <h6 class="col-lg-9 col-md-9 col-sm-9">{{ $t('custody_company_form') }}</h6>
          <div class="col-lg-2 col-md-2 col-sm-2">
            <select v-model.number="choose_company" class="form-select">
              <option value="1">Dots</option>
              <option value="2">Tools</option>
              <option value="3">Wosol</option>
            </select>
          </div>
          <div class="col-lg-1 col-md-1 col-sm-1">
            <button class="dropdown-item" @click="toggleLanguage">
              {{ locale === 'en' ? 'العربية' : 'English' }}
            </button>
          </div>


        </div>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitAddAssetsForm">
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtNameEmployee" class="form-label">{{ $t('name_employee') }}</label>
              <input v-model="custodyTools.name_employee" type="text" class="form-control" id="lbltxtNameEmployee">
              <span class="text-danger" v-if="v$.name_employee.$error">{{ $t('name_should_be_3_character') }}</span>
            </div> <!--name_employee-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtIdEmployee" class="form-label">{{ $t('id_employee') }}</label>
              <input v-model="custodyTools.id_employee" type="number" class="form-control" id="lbltxtIdEmployee" >
              <span class="text-danger" v-if="v$.id_employee.$error">{{ $t('id_should_be_3_character') }}</span>

            </div> <!--id_employee-->
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtNamePosition" class="form-label">{{ $t('name_position_employee') }}</label>
              <input v-model="custodyTools.name_position_employee" type="text" class="form-control" id="lbltxtNamePosition" >
              <span class="text-danger" v-if="v$.name_position_employee.$error">{{ $t('position_should_be_3_character') }}</span>
            </div> <!--name_position_employee-->
            <div class="col-lg-6 col-md-6 col-sm-6 ">
              <label for="lbltxtDate" class="form-label">{{ $t('date') }}</label>
              <input v-model="custodyTools.date_take" type="date" class="form-control" id="lbltxtDate" >
              <span class="text-danger" v-if="v$.date_take.$error">{{ $t('date_should_be_3_character') }}</span>
            </div> <!--date_take-->
          </div>
          <div class="row mb-3 ">
            <!-- Custody Items -->
            <h3 class="text-lg font-semibold mb-2">{{ $t('custody_items') }}</h3>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{{ $t('name_custody') }}</th>
                  <th scope="col">{{ $t('count_custody') }}</th>
                  <th scope="col">{{ $t('condition_custody') }}</th>
                  <th scope="col">{{ $t('note_custody') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in custodyItems" :key="index">
                  <th scope="row">No{{index+1}}</th>
                  <td><input v-model="item.name" placeholder="Item Name" class="form-control" /></td>
                  <td><input v-model="item.count" type="number" placeholder="Count" class="form-control" /></td>
                  <td>
                    <select v-model="item.condition" class="form-select">
                      <option value="جديد">{{ $t('new_device') }}</option>
                      <option value="مستخدم">{{ $t('used_device') }}</option>
                    </select>
                  </td>
                  <td><input v-model="item.note" placeholder="Note" class="form-control" /></td>
                </tr>

                </tbody>
              </table>
            </div>

            <button type="button" class="btn btn-secondary mb-4" @click="addItem">{{ $t('add_custody') }}</button>

          </div>


          <button type="submit" class="btn btn-primary">{{ $t('print_custody') }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import useValidate from "@vuelidate/core";
import {required, minLength, maxLength} from "@vuelidate/validators";
import {computed, onMounted, ref} from "vue";
import "vue3-toastify/dist/index.css";
import {showToast} from "@/services/customToast";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/stores/store.js";
import {dotsEmployeeCustodyPDF, toolsEmployeeCustodyPDF, wosolEmployeeCustodyPDF} from "@/reports/customPDF.js";


const { t } = useI18n()
const appStore = useAppStore();


const { locale } = useI18n()
const toggleLanguage = () => {
  const newLang = locale.value === 'en' ? 'ar' : 'en';
  switchLanguage(newLang);
};
const isEnglish = computed(() => appStore.currentLanguage === 'en');
// Method to switch language
const switchLanguage = (lang) => {
  if (lang === 'en') {
    if (!isEnglish.value) appStore.changeLanguage(); // Toggle to English
    locale.value = 'en'; // Update i18n locale
  } else {
    if (isEnglish.value) appStore.changeLanguage(); // Toggle to Arabic
    locale.value = 'ar'; // Update i18n locale
  }
};


// Start btn Add User

const custodyTools = ref({
  name_employee: '',
  id_employee: '',
  name_position_employee: '',
  date_take: '',


});
// Start computed
const rules = computed(() => ({
  name_employee: { required, minLength: minLength(3) },
  id_employee: { required, minLength: minLength(10), maxLength: maxLength(10) },
  name_position_employee: { required, minLength: minLength(3), },
  date_take: { required },

}))

const custodyItems = ref([])

const addItem = () => {
  custodyItems.value.push({
    name: '',
    count: 1,
    condition: 'جديد',
    note: ''
  })
}
const choose_company = ref(1)

// Vuelidate validation object
const v$ = useValidate(rules, custodyTools)

const submitAddAssetsForm = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid){

    try {

      if (custodyItems.value === []){
        showToast("you_have_to_add_item", "error");
      }else {
        if (choose_company.value === 1)
        dotsEmployeeCustodyPDF(
            custodyTools.value.date_take,
            custodyTools.value.name_employee,
            custodyTools.value.id_employee,
            custodyTools.value.name_position_employee,
            custodyItems.value
        )

        if (choose_company.value === 2)
        toolsEmployeeCustodyPDF(
            custodyTools.value.date_take,
            custodyTools.value.name_employee,
            custodyTools.value.id_employee,
            custodyTools.value.name_position_employee,
            custodyItems.value
        )

        if (choose_company.value === 3)
        wosolEmployeeCustodyPDF(
            custodyTools.value.date_take,
            custodyTools.value.name_employee,
            custodyTools.value.id_employee,
            custodyTools.value.name_position_employee,
            custodyItems.value
        )


      }



    } catch (e) {
      showToast(e, 'error')
    }
  }else{
    console.log('form invalid')
  }

};
// End btn Add User

//
onMounted(async ()=>{




  try {



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