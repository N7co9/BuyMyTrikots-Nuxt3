import { reloadNuxtApp } from "nuxt/app";

export async function refreshPage(path: string) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    reloadNuxtApp({
        path: path,
        ttl: 1000,
    });
}