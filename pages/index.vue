<script setup>
definePageMeta({
  layout: 'index-layout'
})
import {ref} from 'vue'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import {ChevronDownIcon} from '@heroicons/vue/20/solid'
</script>

<AppHeader/>
<template>
  <div class="bg-gradient-to-b from-green-100">
    <main>
      <section aria-labelledby="category-heading" class="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8">
        <div class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 id="category-heading" class="text-2xl font-bold tracking-tight text-gray-900 mb-3.5">Find your Team
            here</h2>
          <a href="#" class="hidden text-sm font-semibold text-green-600 hover:text-green-400 sm:block">Browse all teams
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
        <div class="mt-4 flow-root">
          <div class="flex justify-between overflow-x-auto xl:overflow-visible">
            <a href="browse/Fc Bayern München" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg/2048px-Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg.png"
                  alt="Team 2" class="object-cover rounded-lg hover:drop-shadow-2xl">
              <span class="mt-2 text-xl font-bold text-gray-900">FC Bayern München</span>
            </a>
            <a href="browse/1. Fc Köln" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem_1.FC_K%C3%B6ln.svg/2048px-Emblem_1.FC_K%C3%B6ln.svg.png"
                  alt="Team 2" class="object-cover rounded-lg hover:drop-shadow-2xl">
              <span class="mt-2 text-xl font-bold text-gray-900">1. FC Köln</span>
            </a>
            <a href="browse/TSG 1899 Hoffenheim" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_TSG_Hoffenheim.svg/1716px-Logo_TSG_Hoffenheim.svg.png"
                  alt="Team 2" class="object-cover rounded-lg hover:drop-shadow-2xl">
              <span class="mt-2 text-xl font-bold text-gray-900">TSG Hoffenheim</span>
            </a>
            <a href="browse/Borussia Dortmund" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/2048px-Borussia_Dortmund_logo.svg.png"
                  alt="Team 2" class="object-cover rounded-lg hover:drop-shadow-2xl">
              <span class="mt-2 text-xl font-bold text-gray-900">Borussia Dortmund</span>
            </a>
            <a href="browse/Bayer 04 Leverkusen" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/de/thumb/f/f7/Bayer_Leverkusen_Logo.svg/2560px-Bayer_Leverkusen_Logo.svg.png"
                  alt="Team 2" class="object-cover rounded-lg hover:drop-shadow-2xl">
              <span class="mt-2 text-xl font-bold text-gray-900">Bayer Leverkusen</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<AppFooter/>
