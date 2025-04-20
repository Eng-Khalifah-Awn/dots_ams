import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router.js'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "normalize.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import i18n from "@/i18n.js";
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from './services/fontawesome'
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import 'primevue/resources/themes/lara-light-indigo/theme.css'; // or any other theme
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


const app = createApp(App)

const pinia = createPinia();
app.use(pinia);

app.use(PrimeVue);

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Paginator', Paginator);
app.component('Dropdown', Dropdown);
app.component('Button', Button);

app.use(router)
app.use(i18n)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

/*if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'En');
}*/

AOS.init();
/*
const appStore = useAppStore();
i18n.global.locale.value = appStore.currentLanguage;*/
