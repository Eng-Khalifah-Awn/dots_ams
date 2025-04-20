import {redirectTo} from "@/services/redirectTo";
import {useI18n} from "vue-i18n";
import {showToast} from "@/services/customToast";
import Cookies from "js-cookie";
import {useAppStore} from "@/stores/store.js";

export function checkUserLogin(){
    const appStore = useAppStore();
    const { t } = useI18n()
    // let getUserLogin = localStorage.getItem("user-info")
    let getUserLogin = Cookies.get('tokenOfUser')
    if (!getUserLogin){
        setTimeout(()=>{
            showToast(t('you_are_not_login'), 'error');
        }, 1000);
        appStore.redirectTo("Login")
    }


}