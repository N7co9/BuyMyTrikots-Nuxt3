<script setup lang="ts">
import {HomeIcon ,ShoppingBagIcon, UserCircleIcon, UserPlusIcon, Cog8ToothIcon, UserMinusIcon} from "@heroicons/vue/24/outline";
import {useState} from "nuxt/app";
import {useLogout} from "~/composables/user/useLogout";


const user = useState('user').value;

import useGetBagInformation from "~/composables/bag/useGetBagInformation";

const {
  getBagInformation,
  bagInformation,
  itemsAmount
} = useGetBagInformation();

const fetchInformation = async () => {
  await getBagInformation()
  {
    bagInformation.value
    itemsAmount.value
  }
};
fetchInformation()


</script>

<template>
  <header class="relative z-10">
    <nav aria-label="Top">
      <div class="app-header backdrop-blur">
        <div v-if="user" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div class="flex h-16 items-center justify-between">
              <a href="/user/settings/general" class="hidden text-sm font-medium text-white lg:block ml-10">
                <Cog8ToothIcon class="h-6 w-6 mr-2" aria-hidden="true"/>
              </a>
              <a href="/user/settings/general">
                <p class="hidden text-sm font-medium text-white lg:block">Settings</p>
              </a>
              <div>
                <a href="" @click.prevent="useLogout" class="hidden text-sm font-medium text-white lg:block ml-10">
                  <UserMinusIcon class="h-6 w-6 mr-2" aria-hidden="true"/>
                </a>
              </div>
              <a href="" @click.prevent="useLogout">
                <p class="hidden text-sm font-medium text-white lg:block">Logout</p>
              </a>
              <div class="flex flex-1 items-center justify-end">
                <div class="flex items-center lg:ml-8">
                  <div class="ml-4 flow-root lg:ml-8">
                    <a href="/shoppingcart/overview" class="group flex items-center p-2 text-white">
                      <ShoppingBagIcon class="ml-2 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true"/>
                      <span class="ml-2 text-sm font-medium text-white">{{ itemsAmount }}</span>
                      <span class="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <div class="flex h-16 items-center justify-between">
              <a href="/user/login" class="hidden text-sm font-medium text-white lg:block ml-10">
                <UserCircleIcon class="h-6 w-6 mr-2" aria-hidden="true"/>
              </a>
              <a href="/user/login">
                <p class="hidden text-sm font-medium text-white lg:block">Sign in</p>
              </a>
              <div>
                <a href="/user/registration" class="hidden text-sm font-medium text-white lg:block ml-10">
                  <UserPlusIcon class="h-6 w-6 mr-2" aria-hidden="true"/>
                </a>
              </div>
              <a href="/user/registration">
                <p class="hidden text-sm font-medium text-white lg:block">Register</p>
              </a>
              <div class="flex flex-1 items-center justify-end">
                <div class="flex items-center lg:ml-8">
                  <div class="ml-4 flow-root lg:ml-8">
                    <a href="/" class="group flex items-center p-2 text-white">
                      <HomeIcon class="ml-2 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10; /* Ensure it sits on top of other content */
}
</style>
