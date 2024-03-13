<script setup lang="ts">

import {ref} from 'vue'
import {RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption, Switch,} from '@headlessui/vue'
import {CheckCircleIcon, TrashIcon} from '@heroicons/vue/20/solid'
import {useState} from "nuxt/app";

import useFetchOrderInformation from "~/composables/order/useFetchOrderInformation";
import usePersistOrder from "~/composables/order/usePersistOrder";

const user = useState('user').value

const savedInformation = ref(false);

const {persistOrder, persistOrderResponseMessage} = usePersistOrder()

const userDetails = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  region: '',
  postalCode: '',
  phoneNumber: ''
});


const {
  orderInformationResponse,
  fetchOrderInformation,
  orderFetchingLoading,
} = useFetchOrderInformation();

watch(savedInformation, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await useInformation();
  }
})

const useInformation = async () => {
  if (savedInformation.value === true) {
    userDetails.value.firstName = orderInformationResponse.value.billingInformation.firstName
    userDetails.value.lastName = orderInformationResponse.value.billingInformation.lastName
    userDetails.value.address = orderInformationResponse.value.billingInformation.Address
    userDetails.value.city = orderInformationResponse.value.billingInformation.City
    userDetails.value.region = orderInformationResponse.value.billingInformation.Region
    userDetails.value.postalCode = orderInformationResponse.value.billingInformation.zipCode
    userDetails.value.phoneNumber = orderInformationResponse.value.billingInformation.phoneNumber
  }
  else{
    userDetails.value.firstName = ''
    userDetails.value.lastName = ''
    userDetails.value.address = ''
    userDetails.value.city = ''
    userDetails.value.region = ''
    userDetails.value.postalCode = ''
    userDetails.value.phoneNumber = ''
  }
}

const executePersistOrder = async () => {
  await persistOrder
  (
      user.email,
      userDetails.value.city,
      userDetails.value.lastName,
      userDetails.value.firstName,
      userDetails.value.address,
      selectedDeliveryMethod.value.title,
      selectedDeliveryMethod.value.price,
      orderInformationResponse.value.cartInformation.expenses.total,
      userDetails.value.phoneNumber,
      userDetails.value.postalCode,
      userDetails.value.region,
  )
  {
    orderInformationResponse.value
    orderFetchingLoading.value
    persistOrderResponseMessage.value
  }
};

const deliveryMethods = [
  {id: 1, title: 'Standard', turnaround: '4–10 business days', price: 4.95},
  {id: 2, title: 'Express', turnaround: '2–5 business days', price: 16.00},
]


const footerNavigation = {
  products: [
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
  customerService: [
    {name: 'Contact', href: '#'},
    {name: 'Shipping', href: '#'},
    {name: 'Returns', href: '#'},
    {name: 'Warranty', href: '#'},
    {name: 'Secure Payments', href: '#'},
    {name: 'FAQ', href: '#'},
    {name: 'Find a store', href: '#'},
  ],
}
const selectedDeliveryMethod = ref(deliveryMethods[0])

const executeFetchOrderInformation = async () => {
  await fetchOrderInformation(selectedDeliveryMethod.value.title)
  {
    orderInformationResponse.value
    orderFetchingLoading.value
  }
};

executeFetchOrderInformation();


watch(selectedDeliveryMethod, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await executeFetchOrderInformation();
  }
});


</script>
<template>
  <div class="bg-gray-50 py-8">
    <main class="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <h1 class="sr-only">Checkout</h1>
        <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-gray-900">Contact information</h2>
              <p class="ml-36">Use your saved Information</p>
              <Switch v-model="savedInformation"
                      :class="[savedInformation ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                <span class="sr-only">Use setting</span>
                <span
                    :class="[savedInformation ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
      <span
          :class="[savedInformation ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <span
          :class="[savedInformation ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
          <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
        </svg>
      </span>
    </span>
              </Switch>
            </div>
            <div class="mt-6">
              <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="mt-1">
                <input type="email" v-model="user.email" id="email-address" name="email-address" autocomplete="email"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                       disabled/>
              </div>
            </div>


            <div class="mt-10 border-t border-gray-200 pt-10">
              <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>

              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                  <div class="mt-1">
                    <input v-if="!persistOrderResponseMessage.firstName" v-model="userDetails.firstName" type="text" id="first-name" name="first-name" autocomplete="given-name"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <input v-else-if="persistOrderResponseMessage.firstName" v-model="userDetails.firstName" type="text" id="first-name" name="first-name" autocomplete="given-name"
                           class="block w-full rounded-md border-rose-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>

                <div>
                  <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                  <div class="mt-1">
                    <input v-if="!persistOrderResponseMessage.lastName" v-model="userDetails.lastName" type="text" id="last-name" name="last-name" autocomplete="family-name"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <input v-else-if="persistOrderResponseMessage.lastName" v-model="userDetails.lastName" type="text" id="last-name" name="last-name" autocomplete="family-name"
                           class="block w-full rounded-md border-rose-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                  <div class="mt-1">
                    <input v-if="!persistOrderResponseMessage.address" v-model="userDetails.address" type="text" name="address" id="address" autocomplete="street-address"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <input v-else-if="persistOrderResponseMessage.address" v-model="userDetails.address" type="text" name="address" id="address" autocomplete="street-address"
                           class="block w-full rounded-md border-rose-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>

                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                  <div class="mt-1">
                    <input v-if="!persistOrderResponseMessage.city" v-model="userDetails.city" type="text" name="city" id="city" autocomplete="address-level2"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <input v-else-if="persistOrderResponseMessage.city" v-model="userDetails.city" type="text" name="city" id="city" autocomplete="address-level2"
                           class="block w-full rounded-md border-rose-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>

                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                  <div class="mt-1">
                    <select id="country" name="country" autocomplete="country-name"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      <option>Germany</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                  <div class="mt-1">
                    <input v-if="!persistOrderResponseMessage.region" v-model="userDetails.region" type="text" name="region" id="region" autocomplete="address-level1"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <input v-if="persistOrderResponseMessage.region" v-model="userDetails.region" type="text" name="region" id="region" autocomplete="address-level1"
                           class="block w-full rounded-md border-rose-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>

                <div>
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal code</label>
                  <div class="mt-1">
                    <input v-if="!persistOrderResponseMessage.zip" v-model="userDetails.postalCode" type="text" name="postal-code" id="postal-code" autocomplete="postal-code"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <input v-else-if="persistOrderResponseMessage.zip" v-model="userDetails.postalCode" type="text" name="postal-code" id="postal-code" autocomplete="postal-code"
                           class="block w-full rounded-md border-rose-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                  <div class="mt-1">
                    <input v-if="!persistOrderResponseMessage.phoneNumber" v-model="userDetails.phoneNumber" type="text" name="phone" id="phone" autocomplete="tel"
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                    <input v-else-if="persistOrderResponseMessage.phoneNumber" v-model="userDetails.phoneNumber" type="text" name="phone" id="phone" autocomplete="tel"
                           class="block w-full rounded-md border-rose-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup v-model="selectedDeliveryMethod">
                <RadioGroupLabel class="text-lg font-medium text-gray-900">Delivery method</RadioGroupLabel>

                <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <RadioGroupOption as="template" v-for="deliveryMethod in deliveryMethods" :key="deliveryMethod.id"
                                    :value="deliveryMethod" v-slot="{ checked, active }">
                    <div
                        :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-indigo-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{
                              deliveryMethod.title
                            }}</RadioGroupLabel>
                          <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{
                              deliveryMethod.turnaround
                            }}</RadioGroupDescription>
                          <RadioGroupDescription as="span" class="mt-6 text-sm font-medium text-gray-900">$ {{
                              deliveryMethod.price
                            }}</RadioGroupDescription>
                        </span>
                      </span>
                      <CheckCircleIcon v-if="checked" class="h-5 w-5 text-indigo-600" aria-hidden="true"/>
                      <span
                          :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                          aria-hidden="true"/>
                    </div>
                  </RadioGroupOption>
                </div>
              </RadioGroup>
            </div>
          </div>

          <!-- Order summary -->
          <div class="mt-10 lg:mt-0">
            <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

            <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 class="sr-only">Items in your cart</h3>
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="product in orderInformationResponse?.cartInformation?.cart" :key="product.id"
                    class="flex px-4 py-6 sm:px-6">
                  <div class="flex-shrink-0">
                    <img :src="product.thumbnail" :alt="product.imageAlt" class="w-20 rounded-md"/>
                  </div>

                  <div class="ml-6 flex flex-1 flex-col">
                    <div class="flex">
                      <div class="min-w-0 flex-1">
                        <h4 class="text-sm">
                          <a :href="product.href" class="font-medium text-gray-700 hover:text-gray-800">{{
                              product.name
                            }} Trikot</a>
                        </h4>
                        <p class="mt-1 text-sm text-gray-500">90% Cotton 10% Other Stuff</p>
                        <p class="mt-1 text-sm text-gray-500">This will look so good on you.</p>
                      </div>

                      <div class="ml-4 flow-root flex-shrink-0">
                        <button type="button"
                                class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Remove</span>
                          <TrashIcon class="h-5 w-5" aria-hidden="true"/>
                        </button>
                      </div>
                    </div>

                    <div class="flex flex-1 items-end justify-between pt-2">
                      <p class="mt-1 text-sm font-medium text-gray-900">$ {{ product.price }}</p>

                      <div class="ml-4">
                        <label for="quantity" class="sr-only">Quantity</label>
                        <select id="quantity" name="quantity"
                                class="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Subtotal</dt>
                  <dd class="text-sm font-medium text-gray-900">$
                    {{ orderInformationResponse?.cartInformation?.expenses?.subTotal.toFixed(2) }}
                  </dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Shipping</dt>
                  <dd class="text-sm font-medium text-gray-900">$
                    {{ orderInformationResponse?.cartInformation?.expenses?.shipping.toFixed(2) }}
                  </dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Taxes</dt>
                  <dd class="text-sm font-medium text-gray-900">$
                    {{ orderInformationResponse?.cartInformation?.expenses?.tax.toFixed(2) }}
                  </dd>
                </div>
                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt class="text-base font-medium">Total</dt>
                  <dd class="text-base font-medium text-gray-900">$
                    {{ orderInformationResponse?.cartInformation?.expenses?.total.toFixed(2) }}
                  </dd>
                </div>
              </dl>
              <div class="border-t border-gray-200 px-4 py-8 sm:px-6">
                <button @click.prevent="executePersistOrder" type="submit"
                        class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                  Confirm order
                </button>
                <div class="mt-8 flex justify-between">
                  <a href="/" class="text-indigo-600 hover:text-indigo-800">Go to Homepage</a>
                  <a href="/shoppingcart/overview" class="text-indigo-600 hover:text-indigo-800">Go to Shopping Cart</a>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </main>

    <footer aria-labelledby="footer-heading" class="border-t border-gray-200 bg-white">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="py-20">
          <div class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
            <!-- Image section -->
            <div class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
              <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto"/>
            </div>

            <!-- Sitemap sections -->
            <div
                class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
              <div class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Products</h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li v-for="item in footerNavigation.products" :key="item.name" class="text-sm">
                      <a :href="item.href" class="text-gray-500 hover:text-gray-600">{{ item.name }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">Customer Service</h3>
                <ul role="list" class="mt-6 space-y-6">
                  <li v-for="item in footerNavigation.customerService" :key="item.name" class="text-sm">
                    <a :href="item.href" class="text-gray-500 hover:text-gray-600">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Newsletter section -->
            <div
                class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <h3 class="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
              <p class="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
              <form class="mt-2 flex sm:max-w-md">
                <label for="newsletter-email-address" class="sr-only">Email address</label>
                <input id="newsletter-email-address" type="text" autocomplete="email" required=""
                       class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"/>
                <div class="ml-4 flex-shrink-0">
                  <button type="submit"
                          class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 py-10 text-center">
          <p class="text-sm text-gray-500">&copy; 2021 Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>

  <div v-if="noInformationSavedException">
    <h1 class="justify-center flex font-bold p-12">Oooppss! We don't have any information about you.</h1>
    <div class="justify-center flex drop-shadow-2xl">
      <img
          src="https://media4.giphy.com/media/WQ3uneRTR7Q4cgtSKG/giphy.gif?cid=ecf05e475ij3b2ui3ncox0z8jgqw1cfooz28jwhu1ophjbvf&ep=v1_gifs_related&rid=giphy.gif&ct=s"
          alt="">
    </div>
    <div class="justify-center flex p-4">
      <button @click.prevent="closenNoInformationSavedException" type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Okay!
      </button>
    </div>
  </div>
</template>
