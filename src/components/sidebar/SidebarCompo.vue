<template>
  <div :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr' ">
    <!-- Side navigation bar -->
    <div
        id="mySidenav"
        :style="{ width: sideNavWidth }"
        :class="{ 'sidenav-rtl': $i18n.locale === 'ar', 'sidenav-ltr': $i18n.locale !== 'ar' , }"
    >
      <h2>DOTS</h2>
      <router-link class="text-white" :to="{name: 'home'}">{{ $t('dashboard_home') }}</router-link>
      <router-link class="text-white" :to="{name: 'Assets'}">{{ $t('assets') }}</router-link>
      <router-link class="text-white" :to="{name: 'Brands'}">{{ $t('brands') }}</router-link>
      <router-link class="text-white" :to="{name: 'Categories'}">{{ $t('categories') }}</router-link>
      <router-link class="text-white" :to="{name: 'Companies'}">{{ $t('companies') }}</router-link>
      <router-link class="text-white" :to="{name: 'Departments'}">{{ $t('departments') }}</router-link>
      <router-link class="text-white" :to="{name: 'Users'}">{{ $t('users') }}</router-link>

      <a data-bs-toggle="collapse" href="#collapseCustody" role="button" aria-expanded="false" aria-controls="collapseCustody">{{$t('custody')}}</a>
      <div class="collapse m-1 rounded bg-white" id="collapseCustody" >
        <router-link class="text-black" :to="{name: 'CustodyTools'}">{{ $t('dots_company') }}</router-link>
        <router-link class="text-black" :to="{name: 'CustodyTools'}">{{ $t('tools_company') }}</router-link>
        <router-link class="text-black" :to="{name: 'CustodyTools'}">{{ $t('wosol_company') }}</router-link>
      </div>  <!--Reports-->
      <a data-bs-toggle="collapse" href="#collapseReports" role="button" aria-expanded="false" aria-controls="collapseReports">{{$t('reports')}}</a>
      <div class="collapse m-1 rounded bg-white" id="collapseReports" >
        <router-link class="text-black" :to="{name: 'home'}">{{ $t('show_reports') }}</router-link>
        <router-link class="text-black" :to="{name: 'home'}">{{ $t('show_reports') }}</router-link>
        <router-link class="text-black" :to="{name: 'home'}">{{ $t('show_reports') }}</router-link>
        <router-link class="text-black" :to="{name: 'home'}">{{ $t('show_reports') }}</router-link>
      </div>  <!--Reports-->








    </div>

    <!-- Main content -->
    <div id="main" :style="{ [mainDirection]: mainLeftMargin }">
      <!-- Navbar -->
      <nav class="navbar" :style="{ width: navWidth }">
        <!-- LEFT SIDE: Burger + Links -->
        <div class="navbar-left">
          <i class="menu-icon" @click="openCloseNav()">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </i>
          <ul class="nav-links">
            <li><a href="#">{{ $t('home')}}</a></li>
            <li><a href="#">{{ $t('edit_asset')}}</a></li>
            <li><a href="#">{{ $t('add_asset')}}</a></li>
            <li><a href="#">{{ $t('report_asset')}}</a></li>
          </ul>
        </div>

        <!-- RIGHT SIDE: Language + Logout -->
        <div class="navbar-right">
          <div class="dropdown">
            <i class="custom-font-awesome" data-bs-toggle="dropdown" aria-expanded="false">

            </i>
            <button class="dropdown-item" @click="toggleLanguage">
              {{ locale === 'en' ? 'العربية' : 'English' }}
            </button>

          </div>
          <font-awesome-icon :icon="['fas', 'bell']" @click="logout" v-show="false" class="custom-font-awesome" />
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" @click="logout" class="custom-font-awesome" />
        </div>
      </nav>

    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import {computed, ref} from "vue";

import Cookies from "js-cookie";
import {useAppStore} from "@/stores/store.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


// Reactive variables for dynamic styles
const sideNavWidth = ref("17%");
const mainLeftMargin = ref("17%");
const navWidth = ref("83%");


const appStore = useAppStore();
const { locale } = useI18n()

// Function to open the side navigation
// Determine the layout direction
const isRtl = computed(() => locale.value === 'ar');
const mainDirection = computed(() => (isRtl.value ? 'marginRight' : 'marginLeft'));
const logout = ()=>{
  removeAllCookies();
  appStore.redirectTo('Login')
}

const toggleLanguage = () => {
  const newLang = locale.value === 'en' ? 'ar' : 'en';
  switchLanguage(newLang);
};


function removeAllCookies() {
  // Get all cookies
  const cookies = Cookies.get();  // Get all cookies as an object

  // Loop through all cookies and remove each one
  Object.keys(cookies).forEach(cookieName => {
    // Remove each cookie (no need for domain or path here)
    Cookies.remove(cookieName);
  });
}
/*const openCloseNav = ()=>{

  if (sideNavWidth.value === "17%" && mainLeftMargin.value === "17%"){
    sideNavWidth.value = "0";
    mainLeftMargin.value = "0";
    navWidth.value = "100%";
  }else {
    sideNavWidth.value = "17%";
    mainLeftMargin.value = "17%";
    navWidth.value = "83%"
  }

}*/ // old code for open and close sidebar and navbar

const emit = defineEmits(['sidebarToggled'])

const openCloseNav = () => {
  if (sideNavWidth.value === "17%" && mainLeftMargin.value === "17%") {
    sideNavWidth.value = "0";
    mainLeftMargin.value = "0";
    navWidth.value = "100%";
  } else {
    sideNavWidth.value = "17%";
    mainLeftMargin.value = "17%";
    navWidth.value = "83%";
  }

  emit('sidebarToggled', {
    sideNavWidth: sideNavWidth.value,
    mainLeftMargin: mainLeftMargin.value,
    navWidth: navWidth.value
  });
}



// Create a computed property for the current language state
// Computed property to get the current language
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

/*

// Remove the cookie 'tokenOfUser' with path
Cookies.remove('tokenOfUser', { path: '' });

// Remove the cookie 'tokenOfUser' with domain
Cookies.remove('tokenOfUser', { domain: 'example.com' });

// Usage: Call this function to remove all cookies
removeAllCookies();


*/

</script>

<style lang="css" scoped>
/* General Reset */
body {
  margin: 0;
  background-color: #58595B;
}

/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #58595B;
  color: white;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: 0.5s;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  color: #fff;
  text-decoration: none;
}

.nav-links li a:hover {
  text-decoration: underline;
}

.custom-font-awesome {
  color: white;
  cursor: pointer;
}


/* Side Navigation Bar */
.sidenav-ltr {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #58595B;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  color: #BCBDBE;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.sidenav-rtl {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #58595B;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  color: #BCBDBE;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.sidenav-ltr::-webkit-scrollbar {
  display: none;
}

.sidenav-rtl::-webkit-scrollbar {
  display: none;
}

/* Side navigation links */
.sidenav-rtl a{
  padding: 8px 10px 8px 8px;
  text-decoration: none;
  font-size: 18px;
  color: #fff;
  display: block;
  transition: 0.3s;
}

.sidenav-ltr a{
  padding: 8px 8px 8px 10px;
  text-decoration: none;
  font-size: 18px;
  color: #fff;
  display: block;
  transition: 0.3s;
}

.sidenav-ltr a:hover,
.sidenav-rtl a:hover{
  background-color: #BCBDBE;
}

.sidenav-ltr .closebtn,
.sidenav-rtl .closebtn {
  position: absolute;
  top: 0;
  font-size: 36px;
}

.sidenav-ltr .closebtn {
  right: 25px;
}

.sidenav-rtl .closebtn {
  left: 25px;
}

/* Main Content */
/*#main {
  transition: margin-left 0.5s; !* Smooth transition *!
  margin-top: 60px; !* Adjust for navbar height *!
}*/

#main {
  transition: margin 0.5s; /* Smooth transition for margin changes */
  margin-top: 60px; /* Adjust for navbar height */
}

.custom-font-awesome{
  color: white;
  cursor: pointer;
}

@media (max-width: 1024px) {

}

/* Tablet Screen*/
@media (max-width: 768px) {

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1A6D73;
    color: #E9BE46;
    padding: 10px 20px;
    position: fixed;
    width: 87%;
    top: 0;
    z-index: 1000;
    transition: 0.5s;

  }

  /* Side Navigation Bar */
  .sidenav-ltr {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #1A6D73;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    color: white;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .sidenav-rtl {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 10%;
    background-color: #1A6D73;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    color: white;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .sidenav-ltr::-webkit-scrollbar {
    display: none;
  }

  .sidenav-rtl::-webkit-scrollbar {
    display: none;
  }

  /* Side navigation links */
  .sidenav-rtl a{
    padding: 8px 10px 8px 8px;
    text-decoration: none;
    font-size: 18px;
    color: black;
    display: block;
    transition: 0.3s;
  }

  .sidenav-ltr a{
    padding: 8px 8px 8px 10px;
    text-decoration: none;
    font-size: 18px;
    color: #fff;
    display: block;
    transition: 0.3s;
  }

  .sidenav-ltr .closebtn,
  .sidenav-rtl .closebtn {
    position: absolute;
    top: 0;
    font-size: 36px;
  }

  .sidenav-ltr .closebtn {
    right: 25px;
  }

  .sidenav-rtl .closebtn {
    left: 25px;
  }


}
/* End Tablet Screen*/

/* Phone Screen*/
@media (max-width: 480px) {

}
/* End Phone Screen*/
</style>


