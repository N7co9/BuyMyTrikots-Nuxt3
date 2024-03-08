<script setup>

definePageMeta({
  layout: 'overview-layout'
})

import {CheckIcon, QuestionMarkCircleIcon, XMarkIcon} from '@heroicons/vue/20/solid'

import useGetBagInformation from "~/composables/bag/useGetBagInformation.ts";
import useRemoveFromBag from "~/composables/bag/useRemoveFromBag.ts";
import useAddToBag from "~/composables/bag/useAddToBag.ts";

const {
  getBagInformation,
  bagInformation,
} = useGetBagInformation();

const {
  bagRemoveMessage,
  removeFromBag,
  loading
} = useRemoveFromBag();

const {updateItemQuantity, updateLoading} = useAddToBag()


const executeUpdateItemQuantity = async (itemId, quantity) => {
  await updateItemQuantity(itemId, quantity)
  {
    updateLoading.value
  }
};
const executeRemoveFromBag = async (itemId) => {
  await removeFromBag(itemId)
  {
    bagRemoveMessage.value
    loading.value
  }
};

const fetchInformation = async () => {
  await getBagInformation()
  {
    bagInformation.value
  }
};
fetchInformation()

</script>
<template>
  <div class="bg-white">
    <div v-if="bagInformation?.total?.subTotal" class="mx-auto max-w-2xl px-4 pb-24 pt-32 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
      <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li v-for="(product, productIdx) in bagInformation.items" :key="product.id" class="flex py-6 sm:py-10">
              <div class="flex-shrink-0">
                <img :src="product.thumbnail" :alt="product.imageAlt"
                     class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"/>
              </div>
              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a :href="product.href" class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}
                          Trikot</a>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">Full size Canvas Trikot 90% Bio-Cotton</p>
                      <p v-if="product.size" class="ml-4 border-l border-gray-200 pl-4 text-gray-500">{{
                          product.size
                        }}</p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">$ {{ product.price }}</p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${productIdx}`" class="sr-only">Quantity, {{ product.name }}</label>
                    <select v-model="product.quantity" @change="executeUpdateItemQuantity(product.itemId, $event.target.value)" :id="`quantity-${productIdx}`" :name="`quantity-${productIdx}`" class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>


                    <div class="absolute right-0 top-0">
                      <a @click.prevent="executeRemoveFromBag(product.itemId)" href="">
                        <button type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                          <span class="sr-only">Remove</span>
                          <XMarkIcon class="h-5 w-5" aria-hidden="true"/>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>

                <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                  <CheckIcon class="h-5 w-5 flex-shrink-0 text-green-500"/>
                  <span>{{ product.inStock ? 'In stock' : `Ships in 1-2 Business Days` }}</span>
                </p>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading"
                 class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">$ {{ bagInformation?.total?.subTotal.toFixed(2) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how shipping is calculated</span>
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true"/>
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">$ {{ bagInformation?.total?.shipping.toFixed(2) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Learn more about how tax is calculated</span>
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true"/>
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">$ {{ bagInformation?.total?.tax.toFixed(2) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">$ {{ bagInformation?.total?.total.toFixed(2) }}</dd>
            </div>
          </dl>

          <div class="mt-6">
            <a href="/checkout/overview">
              <button type="button"
                    class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
              Checkout
            </button>
            </a>
          </div>
        </section>
      </form>
    </div>
    <div v-else-if="!bagInformation?.total?.subTotal" class="py-48">
      <div class="bg-white">
        <div class="overflow-hidden pt-32 sm:pt-14">
          <div class="bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div class="relative pb-16 pt-48 sm:pb-24">
                <div>
                  <h2 id="sale-heading" class="text-4xl font-bold tracking-tight text-white md:text-5xl">
                    Ooops!
                    <br/>
                    Nothing but silence here..
                  </h2>
                  <div class="mt-6 text-base">
                    <a href="/" class="font-semibold text-white">
                      Go fill your Bag!
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>

                <div class="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                  <div class="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                    <div class="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                      <div class="flex-shrink-0">
                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                             src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg" alt=""/>
                      </div>

                      <div class="mt-6 flex-shrink-0 sm:mt-0">
                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                             src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg" alt=""/>
                      </div>
                    </div>
                    <div class="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                      <div class="flex-shrink-0">
                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                             src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg" alt=""/>
                      </div>

                      <div class="mt-6 flex-shrink-0 sm:mt-0">
                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                             src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg" alt=""/>
                      </div>
                    </div>
                    <div class="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                      <div class="flex-shrink-0">
                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                             src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg" alt=""/>
                      </div>

                      <div class="mt-6 flex-shrink-0 sm:mt-0">
                        <img class="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                             src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg" alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div v-if="loading || updateLoading"
       class="fixed inset-0 overflow-y-auto flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div role="status">
      <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
           viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
