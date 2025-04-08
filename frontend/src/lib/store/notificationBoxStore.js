import { writable } from "svelte/store";
const visiable = false;
export const notificationBoxStore = writable(visiable);


export function updateNotificationBoxStore(visiable) {
    notificationBoxStore.update(() => visiable);
}