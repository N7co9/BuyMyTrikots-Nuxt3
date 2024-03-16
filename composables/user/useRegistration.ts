import { ref } from 'vue';

export default async function useRegistration(username: string, email: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    };

    try {
        const response = await fetch('http://localhost:8000/api/register', requestOptions);
        return await response.json()
    } catch (error) {
        return {
            content: 'An error occurred. Please try again.'
        };
    }
}
