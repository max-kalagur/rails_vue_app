import { createApp } from 'vue/dist/vue.esm-bundler.js'
import PaymentsList from './components/payments_list.vue'
import { BackendApi } from './api/backend'

class checkout {

    static run()  {

        const checkoutWidget = document.getElementById('checkout-widget');

        if (document.body.contains(checkoutWidget)) {

            document.addEventListener('DOMContentLoaded', () => {
                const app = createApp({
                    components: {
                        PaymentsList
                    },
                    data() {
                        return {
                            price: null,
                            currency: null,
                        }
                    },
                    methods: {
                        mainPageInit() {
                            this.price = localStorage.getItem('checkout_price');
                            this.currency = localStorage.getItem('checkout_currency');
                            // track price & currency changes
                            window.addEventListener('storage', (event) => {
                                if( ['checkout_price','checkout_currency'].includes(event.key) ) {
                                    let key = event.key.replace('checkout_','');
                                    console.log(key);
                                    console.log(event.newValue);
                                    console.log(!!event.newValue);
                                    this[key] = event.newValue;
                                }
                            });
                        },
                        async invoicePageInit() {
                            this.backendApi = new BackendApi;
                            const res = await this.backendApi.getInvoiceData();
                            this.price = res.price;
                            this.currency = res.currency;
                        }
                    },
                    template: `
                        <PaymentsList v-if="price && currency"
                            :price="price"
                            :currency="currency" />
                        <div v-else>Please fill invoice form on the <a href="/">Main page</a></div>
                    `,
                    async created() {

                        // Main Page with localStorage data
                        if( window.location.pathname === '/' ) {
                            this.mainPageInit();
                        }
                        // Invoice Page with Backend data
                        else {
                            await this.invoicePageInit();
                        }

                    },
                });
                app.config.errorHandler = (err, instance, info) => {
                    checkoutWidget.innerHTML = 'Something went wrong. Please try again.';
                    console.log(err.message);
                }

                const rootComponent = app.mount('#checkout-widget');
            });
        }

    }
}

export { checkout }