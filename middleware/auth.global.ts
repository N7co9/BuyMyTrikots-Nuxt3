import {useState, useCookie} from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userState = useState('user', () => null);
    const accessToken = useCookie('token').value;

    if (!accessToken) {
        console.error('Access token not provided');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/check-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (data.valid) {
                userState.value = data.user;
            } else {
                console.error('Token is invalid');
            }
        } else {
            console.error('Error verifying access token:', response.statusText);
        }
    } catch (error : any) {
        console.error('Network error:', error.message);
    }
});
