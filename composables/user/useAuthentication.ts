import {ref} from 'vue';
import {useRouter} from "vue-router";

export default function useAuthentication() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const authenticationLoading = ref(false)
    const authenticationResponse = ref();


    const submitForm = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: email.value,
                password: password.value,
            }),
        };
        try {
            authenticationLoading.value = true;

            const response = await fetch('http://localhost:8000/api/login', requestOptions);
            const data = await response.json();

            const tokenCookie = useCookie('token', {
                maxAge: 3600,
                secure: true,
                sameSite: true,
            })
            tokenCookie.value = data.token

            if (!response.ok)
            {
                authenticationResponse.value = 'An Exception occurred in Authentication';
            }
            else if (response.ok)
            {
                await router.push('/')
            }
        }
        finally {
            authenticationLoading.value = false;
        }
    };

    return {
        authenticationLoading,
        email,
        password,
        authenticationResponse,
        submitForm,
    };
}
