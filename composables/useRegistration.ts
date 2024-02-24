import { ref } from 'vue';

export default function useRegistration() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const submitForm = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
            }),
        };

        try {
            const response = await fetch('http://localhost:8000/api/register', requestOptions);
            const responseClear = await response.json()
            if (responseClear.errors)
            {
                errorMessage.value = responseClear.errors;
            }

        } catch (error) {
            errorMessage.value = 'An error occurred. Please try again.';
        }
    };

    return {
        username,
        email,
        password,
        errorMessage,
        submitForm,
    };
}
