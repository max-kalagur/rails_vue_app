import axios from 'axios';

class BackendApi {

    constructor() {
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        axios.defaults.headers.common['X-CSRF-Token'] = token
        axios.defaults.headers.common['Accept'] = 'application/json'
    }

    async getPaymentOptions() {
        const paymentOptionsRes = await axios.get(`/payment-options.json`)
        return paymentOptionsRes.data;
    }


}

export { BackendApi }