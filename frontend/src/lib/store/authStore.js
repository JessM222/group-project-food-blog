import { writable } from "svelte/store";
const isLoggedin = false;
export const authStore = writable(isLoggedin);


export function updateAuthStore(isLoggedin) {
    authStore.update(() => isLoggedin);
}