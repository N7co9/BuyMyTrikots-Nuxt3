import {ref} from 'vue';
import {reloadNuxtApp} from "nuxt/app";

export default function useGetBagInformation() {
    const bagInformation = ref('');
    const accessToken = useCookie('token').value
    const itemsAmount = ref(0);
    const getBagInformation = async () => {
        try {
            const response = await fetch(`http://localhost:8000/shopping/cart`, {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                }
            })
            bagInformation.value = await response.json();

            for (const item in bagInformation.value.items)
            {
                itemsAmount.value++
            }

        } catch (error) {
            bagInformation.value = 'An error occurred. Please try again.';
        }
    }
    return {
        itemsAmount,
        bagInformation,
        getBagInformation
    };
}

// Gladbach gegen Köln tauschen
