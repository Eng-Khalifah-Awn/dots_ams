import {useI18n} from "vue-i18n";
import {useAppStore} from "@/stores/store.js";

export function checkUserRole(role) {
    const appStore = useAppStore();
    const { t } = useI18n();

    /*if (appStore.state[role]) {
        return true; // User has permission to access
    } else {
        setTimeout(() => {
            showToast(t('you_are_not_allowed'), 'error');
        }, 1000);
        appStore.redirectTo( "NotAuthorized");
    }*/
}




/*
export function checkUserIsAdmin(){
    const store = useStore();
    const { t } = useI18n()

    if (store.state.isAdmin) {
        return true; // User has permission to access
    }else {
        setTimeout(()=>{
            showToast(t('you_are_not_allowed'), 'error');
        }, 1000);
        redirectTo(store, "NotAuthorized")
    }

}

export function checkUserIsManager(){
    const store = useStore();
    const { t } = useI18n()

    if (store.state.isManager){
        console.log("I am manager by the way")
        return true;
    }else {
        setTimeout(()=>{
            showToast(t('you_are_not_allowed'), 'error');
        }, 1000);
        redirectTo(store, "NotAuthorized")
    }

}

export function checkUserIsPos(){
    const store = useStore();
    const { t } = useI18n()

    if (store.state.isPOS){
        return true;
    }else {
        setTimeout(()=>{
            showToast(t('you_are_not_allowed'), 'error');
        }, 1000);
        redirectTo(store, "NotAuthorized")
    }

}
*/

