import {ref} from 'vue';
import {reloadNuxtApp} from "nuxt/app";
import {a} from "vite-node/index-WT31LSgS";

export default function useUpdateBilling() {

    const firstName = ref('');
    const lastName = ref('');
    const phoneNumber = ref('');
    const country = ref('');
    const address = ref('');
    const city = ref('');
    const postalCode = ref('');
    const region = ref('');

    const billingResponseMessage = ref('');
    const accessToken = useCookie('token').value

    const submitBillingForm = async () => {
        try {
            const response = await fetch('http://localhost:8000/settings/update-billing', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    phoneNumber: phoneNumber.value,
                    country: country.value,
                    address: address.value,
                    city: city.value,
                    postalCode: postalCode.value,
                    region: region.value
                }),
            })
            billingResponseMessage.value = await response.json();

        } catch (error) {
            billingResponseMessage.value = 'An error occurred. Please try again.';
        }
    };

    return {
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
    };
}
