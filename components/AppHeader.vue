<script setup lang="ts">
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserCircleIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'
import {DialogBackdrop} from "@headlessui/vue";
</script>

<template>
  <header>
  </header>
  <header>
  </header>
  <div class="relative bg-gray-900">
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <img src="public/assets/supo2.png" alt="" class="h-full w-full object-cover object-center"/>
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
        <img src="public/assets/logo4.png" alt="LOGO" class="max-w-full h-auto">
      </div>
      <div class="flex justify-center w-full">
        <form action="#" method="GET" class="w-3/4">
          <input type="text"
                 class="mb-8 p-4 rounded-3xl focus:ring-green-800 focus:ring-opacity-40 focus:ring-4 text-center w-full placeholder-green-950 placeholder-opacity-75"
                 name="query"
                 placeholder="Search for team..." id="search">
        </form>
      </div>
    </div>
  </div>
</template>
