<script>
    import PaymentForm from './payment_form.vue'
    import { BackendApi } from '../api/backend'

    export default {
        components: {
            PaymentForm,
        },
        props: ['price','currency'],
        data() {
            return {
                currencies: [],
                paymentOptions: [],
                chosenPaymentOption: null,
                backendApi: null,
            }
        },
        methods: {
            async calculateFees() {
                this.paymentOptions = this.paymentOptions.filter(payment => payment.currencies.includes(this.currency));
                if( this.paymentOptions.length == 0 ) {
                    throw new TypeError("Bad currency");
                }
                this.paymentOptions.forEach(payment => payment.priceWithFee = ( this.price * (100 + payment.fee) ) / 100 );
            },
            returnBack() {
                this.chosenPaymentOption = null;
            }
        },
        async created() {
            this.backendApi = new BackendApi;
            const res = await this.backendApi.getPaymentOptions();
            this.currencies = res.currencies;
            this.paymentOptions = res.payment_options;
            await this.calculateFees();
        },
    }
</script>

<template>
    
    <div class="payment-btns btn-group-vertical" v-if="!chosenPaymentOption">
        <button v-for='paymentOption in paymentOptions' 
            type="button" 
            class="btn btn-outline-primary btn-lg"
            @click="chosenPaymentOption=paymentOption">
            {{ paymentOption.name }} {{ paymentOption.priceWithFee }}
        </button>    
    </div>
    <div v-if="chosenPaymentOption" class="payment-form">
        <PaymentForm @return="returnBack">
            {{ chosenPaymentOption.name }} <br>
            Form<br>
            {{ chosenPaymentOption.priceWithFee }}
        </PaymentForm>
    </div>

</template>