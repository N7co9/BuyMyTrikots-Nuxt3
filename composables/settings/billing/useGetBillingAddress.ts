import {ref} from 'vue';
import {reloadNuxtApp} from "nuxt/app";
import {a} from "vite-node/index-WT31LSgS";

export default function useFetchBilling() {

    const exFirstName = ref('');
    const exLastName = ref('');
    const exPhoneNumber = ref('');
    const exCountry = ref('');
    const exAddress = ref('');
    const exCity = ref('');
    const exPostalCode = ref('');
    const exRegion = ref('');

    const exBillingResponse = ref('');
    const accessToken = useCookie('token').value

    const fetchBillingInformation = async () => {
        try {
            const response = await fetch('http://localhost:8000/settings/fetch-billing', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
            })
            exBillingResponse.value = await response.json();
            if(exBillingResponse.value)
            {
                exFirstName.value = exBillingResponse.value.firstName
                exLastName.value = exBillingResponse.value.lastName
                exAddress.value = exBillingResponse.value.address
                exCity.value = exBillingResponse.value.city
                exCountry.value = exBillingResponse.value.country
                exRegion.value = exBillingResponse.value.region
                exPostalCode.value = exBillingResponse.value.postalCode
                exPhoneNumber.value = exBillingResponse.value.phone
            }

        } catch (error) {
            exBillingResponse.value = 'An error occurred. Please try again.';
        }
    };

    return {
        exFirstName,
        exLastName,
        exAddress,
        exCity,
        exCountry,
        exRegion,
        exPostalCode,
        exPhoneNumber,
        fetchBillingInformation
    };
}
