import {toast} from "vue3-toastify";

export function showToast(message, type) {
    toast(message, {
        "theme": "auto",
        "type": type,
        "transition": "slide",
        "dangerouslyHTMLString": true
    });
}
