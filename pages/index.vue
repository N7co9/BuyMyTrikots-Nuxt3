<template>
  <header>
  </header>
  <div class="bg-gradient-to-b from-green-100">
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
                  <a href="#" class="hidden text-sm font-medium text-white lg:block">Register</a>
                  <div>
                    <a href="#" class="hidden text-sm font-medium text-white lg:block ml-10">Sign in</a>
                  </div>
                  <div class="hidden lg:flex lg:flex-1 lg:items-center">
                  </div>

                  <div class="hidden h-full lg:flex">
                    <PopoverGroup class="inset-x-0 bottom-0 px-4">
                      <div class="flex h-full justify-center space-x-8">
                        <Popover v-for="category in navigation.categories" :key="category.name" class="flex"
                                 v-slot="{ open }">
                          <div class="relative flex">
                            <PopoverButton
                                class="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                              {{ category.name }}
                              <span
                                  :class="[open ? 'bg-white' : '', 'absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out']"
                                  aria-hidden="true"/>
                            </PopoverButton>
                          </div>

                          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
                                      enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
                                      leave-from-class="opacity-100" leave-to-class="opacity-0">
                            <PopoverPanel class="absolute inset-x-0 top-full text-sm text-gray-500">
                              <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                              <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"/>

                              <div class="relative bg-white">
                                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                  <div class="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                    <div v-for="item in category.featured" :key="item.name" class="group relative">
                                      <div
                                          class="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                        <img :src="item.imageSrc" :alt="item.imageAlt"
                                             class="object-cover object-center"/>
                                      </div>
                                      <a :href="item.href" class="mt-4 block font-medium text-gray-900">
                                        <span class="absolute inset-0 z-10" aria-hidden="true"/>
                                        {{ item.name }}
                                      </a>
                                      <p aria-hidden="true" class="mt-1">Shop now</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </transition>
                        </Popover>

                        <a v-for="page in navigation.pages" :key="page.name" :href="page.href"
                           class="flex items-center text-sm font-medium text-white">{{ page.name }}</a>
                      </div>
                    </PopoverGroup>
                  </div>

                  <!-- Mobile menu and search (lg-) -->
                  <div class="flex flex-1 items-center lg:hidden">
                    <button type="button" class="-ml-2 p-2 text-white" @click="mobileMenuOpen = true">
                      <span class="sr-only">Open menu</span>
                      <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
                    </button>

                    <!-- Search -->
                    <a href="#" class="ml-2 p-2 text-white">
                      <span class="sr-only">Search</span>
                      <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true"/>
                    </a>
                  </div>

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
        <!-- Search Bar -->
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

    <main>
      <!-- Category section -->
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


    <footer class="w-full" style="position: fixed; bottom: 0; left: 0; right: 0;">
      <div class="mx-auto max-w-7xl px-6 py-10 md:flex md:items-center md:justify-between lg:px-8">
        <div class="flex justify-center space-x-12 md:order-2">

          <a href="http://localhost:8000/home/browse/Borussia%20Dortmund" class="text-gray-400 hover:text-gray-500">About
            Us</a>
          <a href="http://localhost:8000/home/browse/FC%20Bayern%20M%C3%BCnchen"
             class="text-gray-400 hover:text-gray-500">Contact</a>
          <a href="http://localhost:8000/home/browse/Bayer%2004%20Leverkusen" class="text-gray-400 hover:text-gray-500">Career
            @ BuyMyTrikots</a>

          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Instagram</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"></path>
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">YouTube</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>
        <div class="mt-8 md:order-1 md:mt-0">
          <p class="text-center text-xs leading-5 text-gray-500">&copy; 2023 Buy-My-Trikots GmbH, Inc. All rights
            reserved.</p>
        </div>
      </div>
    </footer>

  </div>
</template>

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
const navigation = {}
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
const collections = [
  {
    name: 'Handcrafted Collection',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg',
    imageAlt: 'Brown leather key ring with brass metal loops and rivets on wood table.',
    description: 'Keep your phone, keys, and wallet together, so you can lose everything at once.',
  },
  {
    name: 'Organized Desk Collection',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg',
    imageAlt: 'Natural leather mouse pad on white desk next to porcelain mug and keyboard.',
    description: 'The rest of the house will still be a mess, but your desk will look great.',
  },
  {
    name: 'Focus Collection',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg',
    imageAlt: 'Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.',
    description: 'Be more productive than enterprise project managers with a single piece of paper.',
  },
]
const footerNavigation = {
  shop: [
    {name: 'Bags', href: '#'},
    {name: 'Tees', href: '#'},
    {name: 'Objects', href: '#'},
    {name: 'Home Goods', href: '#'},
    {name: 'Accessories', href: '#'},
  ],
  company: [
    {name: 'Who we are', href: '#'},
    {name: 'Sustainability', href: '#'},
    {name: 'Press', href: '#'},
    {name: 'Careers', href: '#'},
    {name: 'Terms & Conditions', href: '#'},
    {name: 'Privacy', href: '#'},
  ],
  account: [
    {name: 'Manage Account', href: '#'},
    {name: 'Returns & Exchanges', href: '#'},
    {name: 'Redeem a Gift Card', href: '#'},
  ],
  connect: [
    {name: 'Contact Us', href: '#'},
    {name: 'Facebook', href: '#'},
    {name: 'Instagram', href: '#'},
    {name: 'Pinterest', href: '#'},
  ],
}

const mobileMenuOpen = ref(false)
</script>