import {reloadNuxtApp} from "nuxt/app";

export async function useFastRefresh() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    reloadNuxtApp({
        path: window.location.href,
        ttl: 1000,
    });
}
