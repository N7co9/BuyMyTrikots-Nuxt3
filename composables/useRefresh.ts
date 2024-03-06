import {reloadNuxtApp} from "nuxt/app";

export async function refreshPage()
{
    await new Promise(resolve => setTimeout(resolve, 2500));
    reloadNuxtApp(
        {
            path: '/user/settings/general',
            ttl: 1000,
        }
    )


}