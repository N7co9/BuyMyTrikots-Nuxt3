
export default function useFetchOrderInformation() {
    const orderInformationResponse = ref('');
    const accessToken = useCookie('token').value;
    const orderFetchingLoading = ref(false)

    const fetchOrderInformation = async () => {
        try {
            orderFetchingLoading.value = true;
            const response = await fetch(`http://localhost:8000/order/billing/information`, {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
            });
            orderInformationResponse.value = await response.json();
        } catch (error) {
            orderInformationResponse.value = 'An error occurred. Please try again.';
        } finally {
            orderFetchingLoading.value = false;
        }
    };

    return {
        orderInformationResponse,
        fetchOrderInformation,
        orderFetchingLoading
    };
}
