import { ref } from 'vue';
import {useFastRefresh} from "~/composables/refresh/useFastRefresh";

export default function useRemoveFromBag() {
    const bagRemoveResponseMessage = ref('');
    const loading = ref(false); // Add loading state
    const accessToken = useCookie('token').value;
    const removeFromBag = async (itemId : any) => {
        try {
            loading.value = true; // Set loading to true before fetch
            const response = await fetch(`http://localhost:8000/shopping/cart/remove/`, {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: itemId
                }),
            });
            bagRemoveResponseMessage.value = await response.json();

            if (bagRemoveResponseMessage.value === 'OK') {
                await useFastRefresh();
            }
        } catch (error) {
            bagRemoveResponseMessage.value = 'An error occurred. Please try again.';
        } finally {
            loading.value = false;
        }
    };

    return {
        bagRemoveResponseMessage,
        removeFromBag,
        loading
    };
}
