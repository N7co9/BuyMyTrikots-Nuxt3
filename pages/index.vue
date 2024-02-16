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
            <a href="#" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg/2048px-Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg.png"
                  alt="Team 1" class="object-cover rounded-lg">
              <span class="mt-2 text-xl font-bold text-gray-900">FC Bayern München</span>
            </a>
            <a href="#" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem_1.FC_K%C3%B6ln.svg/2048px-Emblem_1.FC_K%C3%B6ln.svg.png"
                  alt="Team 2" class="object-cover rounded-lg">
              <span class="mt-2 text-xl font-bold text-gray-900">1. FC Köln</span>
            </a>
            <a href="#" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Logo_TSG_Hoffenheim.svg/1716px-Logo_TSG_Hoffenheim.svg.png"
                  alt="Team 3" class="object-cover rounded-lg">
              <span class="mt-2 text-xl font-bold text-gray-900">TSG Hoffenheim</span>
            </a>
            <a href="#" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/2048px-Borussia_Dortmund_logo.svg.png"
                  alt="Team 4" class="object-cover rounded-lg">
              <span class="mt-2 text-xl font-bold text-gray-900">Borussia Dortmund</span>
            </a>
            <a href="#" class="flex flex-col items-center mt-4 mx-2">
              <img
                  src="https://upload.wikimedia.org/wikipedia/de/thumb/f/f7/Bayer_Leverkusen_Logo.svg/2560px-Bayer_Leverkusen_Logo.svg.png"
                  alt="Team 5" class="object-cover rounded-lg">
              <span class="mt-2 text-xl font-bold text-gray-900">Bayer Leverkusen</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<AppFooter/>

<script setup>
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

const currencies = ['EUR', 'USD', 'AUD', 'CAD', 'GBP']
const categories = [
  {
    name: '1. FC Köln',
    href: '#',
    imageSrc: 'https://effzeh.com/wp-content/uploads/2019/07/Heimtrikot1920_Hoeger.jpg',
  },
  {
    name: 'Bayer 04 Leverkusen',
    href: '#',
    imageSrc: 'https://cdn02.plentymarkets.com/r08hdwlu0xo0/item/images/97396/full/BA4220H-08-M01.jpg',
  },
  {
    name: 'FC Bayern München',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg',
  },
  {
    name: 'Borussia Dortmund',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg',
  },
  {
    name: 'TSG 1899 Hoffenheim',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg'
  },
]


const mobileMenuOpen = ref(false)
</script>