import {ref} from 'vue';
export default function useFetchOrderInformationUponSuccess() {
    const successOrderResponseMessage = ref('');
    const accessToken = useCookie('token').value
    const fetchOrderInformationUponSuccess = async () => {
        try {
            const response = await fetch('http://localhost:8000/order/payment/success', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
            })
            successOrderResponseMessage.value = await response.json();
        } catch (error) {
            successOrderResponseMessage.value = 'An error occurred. Please try again.';
        }
    };

    return {
        successOrderResponseMessage,
        fetchOrderInformationUponSuccess,
    };
}
