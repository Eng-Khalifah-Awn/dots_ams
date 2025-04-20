// file name is redirectTo
export function redirectTo(store, pageName) {
    return store.dispatch('redirectTo', { val: pageName });
}