<script setup>
import {
  CreditCardIcon,
  FingerPrintIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import {HomeIcon} from "@heroicons/vue/24/outline/index.js";
import useUpdateUsername from '~/composables/settings/useUpdateUsername.ts'
import useUpdateEmail from '~/composables/settings/useUpdateEmail.ts'
import {useState} from "nuxt/app";
import {ref} from 'vue';

const showAlert = ref(false);
const showUsernameModal = ref(false);
const showEmailModal = ref(false);

const {newUsername, usernameResponseMessage, submitUsernameForm} = useUpdateUsername()
const {newEmail, sent, emailResponse, submitEmailForm} = useUpdateEmail()

const closeAlert = () => {
  showAlert.value = false;
};
const openAlert = () => {
  showAlert.value = true;
};

const openUsernameModal = () => {
  showUsernameModal.value = true;
};

const closeUsernameModal = () => {
  showUsernameModal.value = false;
};
const saveUsername = () => {
  submitUsernameForm()
};

const openEmailModal = () => {
  showEmailModal.value = true;
};

const closeEmailModal = () => {
  showEmailModal.value = false;
};
const saveEmail = async () => {
  await submitEmailForm();
  setTimeout(() => {
    if (sent.value) {
      openAlert();
      closeEmailModal();
    }
  }, 1000);
};


const user = useState('user').value
const accessToken = useCookie('token').value

definePageMeta({
  layout: 'settings-layout'
})

const secondaryNavigation = [
  {name: 'General', href: '#', icon: UserCircleIcon, current: true},
  {name: 'Security', href: '/user/settings/security', icon: FingerPrintIcon, current: false},
  {name: 'Billing', href: '/user/settings/billing', icon: CreditCardIcon, current: false},
  {name: 'Home', href: '/', icon: HomeIcon, current: false},
]

</script>
<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">General Settings</h1>

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
          <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what
            you share.</p>

          <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.username }}</div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500"
                        @click="openUsernameModal">Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.email }}</div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500"
                        @click="openEmailModal">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Role</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.roles }}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none py-24">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Private Information</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Do not share this Information with anyone.
          </p>

          <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">verification_token</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.verificationToken }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">is_verified</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.isVerified }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">password_hash</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.password }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">user_id</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.id }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">assigned_apitoken</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ accessToken }}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  </div>

  <!---- MODALS GO HERE BRR !-->

  <div v-if="showUsernameModal" class="fixed inset-0 overflow-y-auto flex justify-center">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full py-8 px-32">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <div class="mt-2">
                <form>
                  <div class="mb-4 flex justify-center">
                    <input type="text" v-model="newUsername" placeholder="New Username" required
                           class="mt-1 text-center focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                </form>
              </div>
              <div class="justify-center flex">
                <p v-if="usernameResponseMessage?.response?.type === 'OK'" class="text-green-500 font-bold">
                  {{ usernameResponseMessage.response.message }}</p>
                <p v-else-if="usernameResponseMessage?.response?.type === 'Exception'"
                   class="text-red-500 font-bold">{{ usernameResponseMessage.response.message }}</p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse flex justify-center">
            <button type="button" @click="saveUsername"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save
            </button>
            <button type="button" @click="closeUsernameModal"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!---- EMAIL MODAL WHOhAAA !-->

  <div v-if="showEmailModal" class="fixed inset-0 overflow-y-auto flex justify-center">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full py-8 px-32">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left">
              <div class="mt-2">
                <form>
                  <div class="mb-4 flex justify-center">
                    <input type="email" autocomplete="email" v-model="newEmail" placeholder="New Email" required
                           class="mt-1 text-center focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div v-if="emailResponse.sent === false" class="text-red-500 font-bold justify-center flex">
            <p>An Error occurred.</p>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse flex justify-center">
            <button type="button" @click="saveEmail"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save
            </button>
            <button type="button" @click="closeEmailModal"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!---- ALLLEEERRRTTT !-->

  <div v-if="showAlert" class="flex justify-center items-center">
    <div class="rounded-md bg-green-50 p-4 w-1/2">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true"/>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">Verification Email has been sent!</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button @click.prevent="closeAlert" type="button"
                    class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
