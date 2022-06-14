import { createApp } from 'vue/dist/vue.esm-bundler.js'
import PaymentsList from './components/payments_list.vue'

class checkout {

    static run()  {

        const invocePrice = sessionStorage.getItem('checkout_price'),
            invoiceCurrency = sessionStorage.getItem('checkout_currency'),
            checkoutWidget = document.getElementById('checkout-widget');

        if (document.body.contains(checkoutWidget) && invocePrice && invoiceCurrency) {

            document.addEventListener('DOMContentLoaded', () => {
                const app = createApp({
                    components: {
                        PaymentsList
                    },
                    data() {
                        return {
                            price: invocePrice,
                            currency: invoiceCurrency,
                        }
                    },
                    template: `
                        <PaymentsList 
                            :price="price"
                            :currency="currency" />
                    `
                });
                app.config.errorHandler = (err, instance, info) => {
                    checkoutWidget.innerHTML = 'Something went wrong. Please try again.';
                    console.log(err.message);
                }

                const rootComponent = app.mount('#checkout-widget');
            });
        }
        else if( document.body.contains(checkoutWidget) ) {
            checkoutWidget.innerHTML = 'Please fill and submit invoice form first on the <a href="/">Main page</a>';
        }

    }
}

export { checkout }