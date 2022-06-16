import axios from 'axios';

class BackendApi {

    constructor() {
        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        axios.defaults.headers.common['X-CSRF-Token'] = token
        axios.defaults.headers.common['Accept'] = 'application/json'
    }

    async getPaymentOptions() {
        const res = await axios.get(`/payment-options.json`)
        return res.data;
    }

    async getInvoiceData() {
        const res = await axios.get(`/invoice-data.json`)
        return res.data;
    }


}

export { BackendApi }