import {reloadNuxtApp} from "nuxt/app";

export function useLogout() {
    const authCookie = useCookie('token')
    authCookie.value = null
    reloadNuxtApp(
        {
            path: '/',
            ttl: 1000,
        }
    )
    return true;
}
