<script setup lang="ts">
import { useSearch } from '~/composables/useSearch';
import {
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline';
const { searchId, submitSearch } = useSearch();
</script>

<template>
  <header>
  </header>
  <header>
  </header>
  <div class="relative bg-gray-900">
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <img src="../public/assets/SuitUpPlayOn-HeaderBG.png" alt="" class="h-full w-full object-cover object-center"/>
    </div>
    <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50"/>

    <header class="relative z-10">
      <nav aria-label="Top">
        <div class="bg-gray-900 bg-opacity-10 backdrop-blur-md backdrop-filter">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <div class="flex h-16 items-center justify-between">
                <a href="#" class="hidden text-sm font-medium text-white lg:block ml-10">
                  <UserPlusIcon class="h-6 w-6 mr-2" aria-hidden="true"/>
                </a>
                <p class="hidden text-sm font-medium text-white lg:block">Sign in</p>
                <div>
                  <!-- Sign in Link -->
                  <a href="#" class="hidden text-sm font-medium text-white lg:block ml-10">
                    <UserCircleIcon class="h-6 w-6 mr-2" aria-hidden="true"/>
                  </a>
                </div>
                <p class="hidden text-sm font-medium text-white lg:block">Register</p>
                <div class="flex flex-1 items-center justify-end">
                  <div class="flex items-center lg:ml-8">
                    <a href="#" class="p-2 text-white lg:hidden">
                      <span class="sr-only">Help</span>
                      <QuestionMarkCircleIcon class="h-6 w-6" aria-hidden="true"/>
                    </a>

                    <div class="ml-4 flow-root lg:ml-8">
                      <a href="#" class="group flex items-center p-2 text-white">
                        <ShoppingBagIcon class="ml-2 h-6 w-6 flex-shrink-0 text-white" aria-hidden="true"/>
                        <span class="ml-2 text-sm font-medium text-white">0</span>
                        <span class="sr-only">items in cart, view bag</span>
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

    <div class="relative mx-auto flex max-w-3xl flex-col items-center text-center sm:py-12 lg:px-0">
      <div class="w-96 rounded-2xl overflow-hidden filter drop-shadow-2xl mb-2">
        <img src="../public/assets/BMT-Logo.png" alt="LOGO" class="max-w-full h-auto">
      </div>
      <div class="w-full">
        <form class="max-w-md mx-auto" @submit.prevent="submitSearch">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" v-model="searchId" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Teams, Items..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
