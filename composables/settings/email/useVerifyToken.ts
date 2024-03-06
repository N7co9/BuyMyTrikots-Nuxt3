import {ref} from 'vue';
import {reloadNuxtApp} from "nuxt/app";

export default function useVerifyToken() {
    const route = useRoute()
    const verifyResponse = ref('');
    const verificationToken = ref('');
    verificationToken.value = route.params.verificationToken;
    const accessToken = useCookie('token').value;

    const verifyToken = async () => {
        try {
            const response = await fetch(`http://localhost:8000/settings/update-email/${verificationToken.value}`, {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                }
            });
            verifyResponse.value = await response.json();

            if (!response.ok) {
                new Error('Failed to update email');
            }
        } catch (error) {
            verifyResponse.value = 'Error';
        }
    };

    return {
        verificationToken,
        verifyResponse,
        verifyToken,
    };
}
