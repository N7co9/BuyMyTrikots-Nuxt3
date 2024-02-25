import {ref} from 'vue';
import {reloadNuxtApp} from "nuxt/app";

export default function useUpdateUsername() {
    const newUsername = ref('');
    const usernameResponseMessage = ref('');
    const accessToken = useCookie('token').value
    const submitUsernameForm = async () => {
        try {
            const response = await fetch('http://localhost:8000/settings/update-username', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUsername.value,
                }),
            })
            usernameResponseMessage.value = await response.json();

        } catch (error) {
            usernameResponseMessage.value = 'An error occurred. Please try again.';
        }

        if (usernameResponseMessage.value.response.type === 'OK') {
            await new Promise(resolve => setTimeout(resolve, 1500));
            reloadNuxtApp(
                {
                    path: '/user/settings/general',
                    ttl: 1000,
                }
            )
        }
    };

    return {
        newUsername,
        usernameResponseMessage,
        submitUsernameForm,
    };
}
