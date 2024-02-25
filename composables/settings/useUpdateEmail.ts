import { ref } from 'vue';

export default function useUpdateEmail() {
    const newEmail = ref('');
    const emailResponse = ref('');
    const sent = ref('');
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
            sent.value = emailResponse.value.sent

            if (!response.ok) {
                throw new Error('Failed to update email');
            }
        } catch (error) {
            emailResponseMessage.value = 'Error';
        }
    };

    return {
        newEmail,
        emailResponse,
        sent,
        submitEmailForm,
    };
}
