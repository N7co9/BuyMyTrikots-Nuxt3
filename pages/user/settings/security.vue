<script setup>

import {CheckCircleIcon, HomeIcon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";

definePageMeta({
  layout: 'settings-layout'
})
import {
  CreditCardIcon,
  FingerPrintIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

import useUpdatePassword from "~/composables/settings/password/useUpdatePassword.ts";
import {ref} from "vue";

import {refreshPage} from "~/composables/useRefresh.ts";


const {password, newPassword, passwordResponseMessage, submitPasswordForm} = useUpdatePassword()

const showSuccessAlert = ref(false);
const showExceptionAlert = ref(false);

const submitPassword= async () => {
  await submitPasswordForm()
  if (passwordResponseMessage.value.response.type === 'OK') {
    showExceptionAlert.value = false;
    showSuccessAlert.value = true;
    await refreshPage('/user/login')
  }
  else if(passwordResponseMessage.value.response.type === 'Exception')
  {
    showSuccessAlert.value = false;
    showExceptionAlert.value = true;
  }
};


const secondaryNavigation = [
  {name: 'General', href: '/user/settings/general', icon: UserCircleIcon, current: false},
  {name: 'Security', href: '/user/settings/security', icon: FingerPrintIcon, current: true},
  {name: 'Billing', href: '/user/settings/billing', icon: CreditCardIcon, current: false},
  {name: 'Home', href: '/', icon: HomeIcon, current: false},

]

</script>
<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">Security Settings</h1>

    <aside
        class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          <li v-for="item in secondaryNavigation" :key="item.name">
            <a :href="item.href"
               :class="[item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold']">
              <component :is="item.icon"
                         :class="[item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                         aria-hidden="true"/>
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">

        <form @submit.prevent="submitPassword">
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">Change your password</h2>
            <p class="mt-1 text-sm leading-6 text-gray-500">Our Team will never ask for your password, be careful.</p>

            <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">

              <!-- Old Password Input -->
              <div class="relative">
                <label for="old_password" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Old Password</label>
                <input type="password" v-model="password" name="old_password" id="old_password" required
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>

              <!-- New Password Input -->
              <div class="relative">
                <label for="new_password" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">New Password</label>
                <input type="password" v-model="newPassword" name="new_password" id="new_password" required
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </dl>

            <!-- Submit Button -->
            <div class="mt-6 flex justify-center">
              <button type="submit"
                      class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                Submit New Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </div>

  <div v-if="showSuccessAlert"
       class="fixed inset-0 overflow-y-auto flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
      <div class="p-8">
        <div class="justify-center flex font-bold">
          <h1>Update your Password</h1>
        </div>
        <div class="border mt-4">
        </div>
        <div class="justify-center flex drop-shadow-2xl">
          <img
              src="https://media2.giphy.com/media/8AUfwiMNiw4a8wFlNL/giphy.gif"
              alt="">
        </div>
        <div class="font-bold text-green-500 py-8">
          <p class="justify-center flex">Your Request was handled successfully. </p>
          <p class="justify-center flex">You will now be redirected... </p>
        </div>
      </div>
    </div>
  </div>


  <div v-if="showExceptionAlert" class="mb-12 rounded-md bg-yellow-50 p-4 fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 z-50">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">Attention needed</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>{{passwordResponseMessage.response.message}}</p>
        </div>
      </div>
    </div>
  </div>

</template>
