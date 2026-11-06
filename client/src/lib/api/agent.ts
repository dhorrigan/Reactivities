import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    });
}

const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
})

agent.interceptors.response.use(
    async response => {
        await sleep(1000);
        store.uiStore.isIdle()
        return response;
    },
    async error => {
        await sleep(1000);
        store.uiStore.isIdle();

        const { status, data } = error.response;
        switch (status) {
            case 400:
                // toast.error('bad request');
                // console.log('Bad Request');
                // the Fluent data validation in API returns an object with errors for each field
                // we collect all the errors and throw them as a flat array
                if (data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('Unauthorised');
                // console.log('Unauthorized');
                break;
            case 404:
                router.navigate('/not-found');
                // toast.error('Not Found');
                // console.log('Not Found');
                break;
            case 500:
                router.navigate('/server-error', {state: {error: data}})
                // toast.error('Server error');
                // console.log('Internal Server Error');
                break;
            default:
                //toast.error('Unexpected Error');
                // console.log('Unexpected Error');
                break;
        }

        return Promise.reject(error);
    }
);

export default agent;
