import {ref} from 'vue';
export default function useAbortOrder() {
    const abortOrderResponseMessage = ref('');
    const accessToken = useCookie('token').value
    const abortOrder = async () => {
        try {
            const response = await fetch('http://localhost:8000/order/payment/abort', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
            })
            abortOrderResponseMessage.value = await response.json();

        } catch (error) {
            abortOrderResponseMessage.value = 'An error occurred. Please try again.';
        }
    };

    return {
        abortOrderResponseMessage,
        abortOrder,
    };
}
