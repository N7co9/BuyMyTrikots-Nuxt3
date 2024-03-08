import {useFastRefresh} from "~/composables/refresh/useFastRefresh";

export default function useAddToBag() {
    const bagResponseMessage = ref('');
    const loading = ref(false);
    const accessToken = useCookie('token').value;
    const updateLoading = ref(false)

    const addToBag = async (itemId: any) => {
        try {
            loading.value = true;
            const response = await fetch(`http://localhost:8000/shopping/cart/add/`, {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: itemId,
                    quantity: 1
                }),
            });
            bagResponseMessage.value = await response.json();
            if (bagResponseMessage.value === 'OK') {
                await useFastRefresh();
            }
        } catch (error) {
            bagResponseMessage.value = 'An error occurred. Please try again.';
        } finally {
            loading.value = false;
        }
    };

    const updateItemQuantity = async (itemId: number, newQuantity: number) => {
        console.log(itemId, newQuantity)
        try {
            updateLoading.value = true;
            const response = await fetch(`http://localhost:8000/shopping/cart/add/`, {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: itemId,
                    quantity: newQuantity
                }),
            });
            bagResponseMessage.value = await response.json();
            if (bagResponseMessage.value === 'OK') {
                await useFastRefresh();
            }
        } catch (error) {
            bagResponseMessage.value = 'An error occurred. Please try again.';
        } finally {
            updateLoading.value = false;
        }
    };

    return {
        bagResponseMessage,
        addToBag,
        updateItemQuantity,
        loading,
        updateLoading
    };
}
