<script setup>

import {HomeIcon} from "@heroicons/vue/24/outline/index.js";

definePageMeta({
  layout: 'settings-layout'
})
import {
  CreditCardIcon,
  FingerPrintIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

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
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Change your password</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Our Team will never ask for you password, be careful.</p>

          <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">

            <div class="relative">
              <label for="name"
                     class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Old
                Password</label>
              <input type="password" name="old_password" id="old_password"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>

            <div class="relative">
              <label for="name"
                     class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">New
                Password</label>
              <input type="password" name="new_password" id="new_password"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </dl>
        </div>
      </div>
      <div class="py-16 flex justify-center">
        <p>
          <button
              class="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out">
            Request Reset Email
          </button>
        </p>
      </div>
    </main>
  </div>
</template>
