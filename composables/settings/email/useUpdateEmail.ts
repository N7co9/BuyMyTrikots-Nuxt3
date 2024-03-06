import {ref} from 'vue';
import {useState} from "nuxt/app";

export default function useUpdateEmail() {
    const emailState = useState('tempMail', () => null);
    const newEmail = ref('');
    const emailResponse = ref('');
    const accessToken = useCookie('token').value;
    const submitEmailForm = async () => {
        try {
            const response = await fetch('http://localhost:8000/settings/update-email', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: newEmail.value,
                }),
            });
            emailResponse.value = await response.json();
            if(emailResponse.value)
            {
                // @ts-ignore
                emailState.value = emailResponse.value.tempMail;
            }

            if (!response.ok) {
                new Error('Failed to update email');
            }
        } catch (error) {
            emailResponse.value = 'Error';
        }
    };

    return {
        newEmail,
        emailResponse,
        submitEmailForm,
    };
}
