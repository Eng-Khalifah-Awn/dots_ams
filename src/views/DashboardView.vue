<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <SidebarCompo @sidebarToggled="onSidebarToggled" />
    <ToastContainer />
    <div
        id="main"
        :style="{
        [isRtl ? 'marginRight' : 'marginLeft']: mainLeftMargin
      }"
        style="transition: 0.5s; padding: 20px; margin-top: 60px;"
    >
      <router-view />
    </div>
  </div>
</template>
<script setup>
import SidebarCompo from "@/components/sidebar/SidebarCompo.vue";
import { useI18n } from "vue-i18n";
import {ref, computed, onMounted} from "vue";
import {checkUserLogin} from "@/services/checkUserSignin.js";

const { locale } = useI18n();

const mainLeftMargin = ref("17%"); // default open
const isRtl = computed(() => locale.value === "ar");

// Listen for sidebar toggle
const onSidebarToggled = ({ mainLeftMargin: margin }) => {
  mainLeftMargin.value = margin;
};

onMounted(async ()=>{

  await checkUserLogin();



})


</script>
<style scoped>

</style>

