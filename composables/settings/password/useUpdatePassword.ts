import {ref} from 'vue';
import {reloadNuxtApp} from "nuxt/app";

export default function useUpdatePassword() {
    const password = ref('');
    const newPassword = ref('');
    const passwordResponseMessage = ref('');
    const accessToken = useCookie('token').value
    const authCookie = useCookie('token')
    const submitPasswordForm = async () => {
        try {
            const response = await fetch('http://localhost:8000/settings/update-password', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    old_password: password.value,
                    new_password: newPassword.value
                }),
            })
            passwordResponseMessage.value = await response.json();

            // @ts-ignore
            if(passwordResponseMessage.value.response.type === 'OK')
            {
                authCookie.value = null
            }

        } catch (error) {
            passwordResponseMessage.value = 'An error occurred. Please try again.';
        }
    };

    return {
        password,
        newPassword,
        passwordResponseMessage,
        submitPasswordForm,
    };
}
