import {ref} from 'vue';
export default function usePersistOrder() {
    const persistOrderResponseMessage = ref('');
    const accessToken = useCookie('token').value
    const checkout_url = ref('');
    const persistOrder = async (email: any, city : any, lastName : any, firstName : any, address: any, deliveryMethod : any, shippingCost : number, totalCost : any, phoneNumber : any, postalCode : any, region : any) => {
        try {
            const response = await fetch('http://localhost:8000/order/persist', {
                method: 'POST',
                headers: {
                    'Authorization': accessToken ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    city: city,
                    lastName: lastName,
                    firstName : firstName,
                    address : address,
                    deliveryMethod : deliveryMethod,
                    shippingCost : shippingCost,
                    totalCost : totalCost,
                    phoneNumber : phoneNumber,
                    postalCode : postalCode,
                    region: region
                }),
            })
            persistOrderResponseMessage.value = await response.json();
            // @ts-ignore
            if(persistOrderResponseMessage.value.success)
            {
                try {
                    const responseCheckout = await fetch('http://localhost:8000/order/payment/', {
                        method: 'POST',
                        headers: {
                            'Authorization': accessToken ?? '',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            shippingCost: shippingCost ?? 4.95,
                        }),
                    })
                    checkout_url.value = await responseCheckout.json();
                    window.location.href = checkout_url.value;}
            catch (error)
                {
                    persistOrderResponseMessage.value = 'An Error occurred while creating the checkout for you.'
                }
            }
        } catch (error) {
            persistOrderResponseMessage.value = 'An error occurred. Please try again.';
        }
    };

    return {
        persistOrderResponseMessage,
        persistOrder,
    };
}
