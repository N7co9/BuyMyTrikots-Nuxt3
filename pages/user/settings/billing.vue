<script setup>
definePageMeta({
  layout: 'settings-layout'
})
import {CreditCardIcon, FingerPrintIcon, HomeIcon, UserCircleIcon,} from '@heroicons/vue/24/outline'
import useUpdateBilling from "~/composables/settings/billing/useUpdateBilling.ts";
import useFetchBilling from "~/composables/settings/billing/useGetBillingAddress.ts";

const secondaryNavigation = [
  {name: 'General', href: '/user/settings/general', icon: UserCircleIcon, current: false},
  {name: 'Security', href: '/user/settings/security', icon: FingerPrintIcon, current: false},
  {name: 'Billing', href: '/user/settings/billing', icon: CreditCardIcon, current: true},
  {name: 'Home', href: '/', icon: HomeIcon, current: false},

]


const showBillingModal = ref(false);

function closeBilling() {
  showBillingModal.value = false;
}

const {
  exFirstName,
  exLastName,
  exAddress,
  exCity,
  exCountry,
  exRegion,
  exPostalCode,
  exPhoneNumber,
  fetchBillingInformation
} = useFetchBilling();

const {
  firstName,
  lastName,
  phoneNumber,
  country,
  address,
  city,
  postalCode,
  region,
  billingResponseMessage,
  submitBillingForm
} = useUpdateBilling();

const submitForm = async () => {
  await submitBillingForm({
    firstName,
    lastName,
    phoneNumber,
    country,
    address,
    city,
    postalCode,
    region
  });
};

const showExBilling = async () => {
  await fetchBillingInformation({
    exFirstName,
    exLastName,
    exAddress,
    exCity,
    exCountry,
    exRegion,
    exPostalCode,
    exPhoneNumber,
  });
  showBillingModal.value = true;
};

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

      <form @submit.prevent="submitForm">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
              <div class="mt-2">
                <input v-if="!billingResponseMessage?.content?.firstName" v-model="firstName" type="text"
                       name="first-name" id="first-name" autocomplete="given-name"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="John"
                />
                <input v-else-if="billingResponseMessage?.content?.firstName" v-model="firstName" type="text"
                       name="first-name" id="first-name" autocomplete="given-name"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="John"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div class="mt-2">
                <input v-if="!billingResponseMessage?.content?.lastName" v-model="lastName" type="text"
                       name="last-name" id="last-name" autocomplete="given-name"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="Doe"
                />
                <input v-else-if="billingResponseMessage?.content?.lastName" v-model="lastName" type="text"
                       name="first-name" id="first-name" autocomplete="given-name"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="Doe"
                />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
              <div class="mt-2">
                <input v-if="!billingResponseMessage?.content?.phone" v-model="phoneNumber" type="text"
                       name="phoneNumber" id="phoneNumber" autocomplete="phoneNumber"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="+4901234569781"
                />
                <input v-else-if="billingResponseMessage?.content?.phone" v-model="phoneNumber" type="text"
                       name="first-name" id="first-name" autocomplete="given-name"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="+4901234569781"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
              <div class="mt-2">
                <select v-model="country" id="country" name="country" autocomplete="country-name"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>Germany</option>
                </select>
              </div>
            </div>


            <div class="col-span-full">
              <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street
                address</label>
              <div class="mt-2">
                <input v-if="!billingResponseMessage?.content?.address" v-model="address" type="text" name="street"
                       id="street" autocomplete="address"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="Main Street 34b"
                />
                <input v-else-if="billingResponseMessage?.content?.address" v-model="address" type="text"
                       name="address" id="address" autocomplete="address"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="Main Street 34b"
                />
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div class="mt-2">
                <input v-if="!billingResponseMessage?.content?.city" v-model="city" type="text" name="City" id="City"
                       autocomplete="City"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="Ingolstadt"
                />
                <input v-else-if="billingResponseMessage?.content?.city" v-model="city" type="text" name="City"
                       id="City" autocomplete="City"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="Ingolstadt"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="region" class="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
              <div class="mt-2">
                <input v-if="!billingResponseMessage?.content?.postalCode" v-model="postalCode" type="text"
                       name="postal-code"
                       id="postal-code" autocomplete="postal-code"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="0013838"
                />
                <input v-else-if="billingResponseMessage?.content?.postalCode" v-model="postalCode" type="text"
                       name="postal-code" id="postal-code" autocomplete="postal-code"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="0013838"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
              <div class="mt-2">
                <input v-if="!billingResponseMessage?.content?.region" v-model="region" type="text" name="region"
                       id="region" autocomplete="region"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       placeholder="Northrine-Westfalia"
                />
                <input v-else-if="billingResponseMessage?.content?.region" v-model="region" type="text" name="region"
                       id="region" autocomplete="region"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-red-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                       placeholder="Northrine-Westfalia"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="submit"
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
          <div class="">
            <button @click.prevent="showExBilling" type="submit"
                    class="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Show me my current Information
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>


  <div v-if="showBillingModal"
       class="fixed inset-0 overflow-y-auto flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
      <div v-if="exFirstName" class="p-8">
        <div class="justify-center flex font-bold"> <!-- just checking if there is data fuck this -->
          <h1>Here is what we know about you:</h1>
        </div>
        <div class="border mt-4">
          <div class="border-b border-white/10 pb-12 p-6">
            <h2 class="text-base font-semibold leading-7">Personal Information</h2>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label class="block text-sm font-medium leading-6">First name</label>
                <p class="mt-2 text-sm leading-6">{{ exFirstName }}</p>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-sm font-medium leading-6">Last name</label>
                <p class="mt-2 text-sm leading-6">{{ exLastName }}</p>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-sm font-medium leading-6 ">Country</label>
                <p class="mt-2 text-sm leading-6">{{ exCountry }}</p>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-sm font-medium leading-6 ">Phone Number</label>
                <p class="mt-2 text-sm leading-6">{{ exPhoneNumber }}</p>
              </div>

              <div class="col-span-full">
                <label class="block text-sm font-medium leading-6 ">Street address</label>
                <p class="mt-2 text-sm leading-6">{{ exAddress }}</p>
              </div>

              <div class="sm:col-span-2 sm:col-start-1">
                <label class="block text-sm font-medium leading-6 ">City</label>
                <p class="mt-2 text-sm leading-6">{{ exCity }}</p>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-medium leading-6 ">State / Province</label>
                <p class="mt-2 text-sm leading-6">{{ exRegion }}</p>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-medium leading-6 ">ZIP / Postal code</label>
                <p class="mt-2 text-sm leading-6">{{ exPostalCode }}</p>
              </div>
            </div>
          </div>
          <div class="justify-center flex p-4">
            <button @click.prevent="closeBilling" type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Thanks! Looks good.
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="!firstName">
        <h1 class="justify-center flex font-bold p-12">Oooppss! We don't have any information about you.</h1>
        <div class="justify-center flex drop-shadow-2xl">
          <img
              src="https://media4.giphy.com/media/WQ3uneRTR7Q4cgtSKG/giphy.gif?cid=ecf05e475ij3b2ui3ncox0z8jgqw1cfooz28jwhu1ophjbvf&ep=v1_gifs_related&rid=giphy.gif&ct=s"
              alt="">
        </div>
        <div class="justify-center flex p-4">
          <button @click.prevent="closeBilling" type="submit"
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Okay!
          </button>
        </div>
      </div>
    </div>
  </div>

</template>
