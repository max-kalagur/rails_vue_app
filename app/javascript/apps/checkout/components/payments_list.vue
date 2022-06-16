<script>
    import PaymentForm from './payment_form.vue'
    import Spinner from './spinner.vue'
    import { BackendApi } from '../api/backend'

    export default {
        components: {
            PaymentForm,
            Spinner,
        },
        props: ['price','currency'],
        data() {
            return {
                currencies: [],
                paymentOptions: [],
                paymentOptionButtons: [],
                chosenPaymentOption: null,
                backendApi: null,
            }
        },
        methods: {
            calculateFees() {
                this.paymentOptionButtons = this.paymentOptions.filter(payment => payment.currencies.includes(this.currency));
                if( this.paymentOptionButtons.length == 0 ) {
                    throw new TypeError("Bad currency");
                }
                this.paymentOptionButtons.forEach(payment => payment.priceWithFee = (( this.price * (100 + payment.fee) ) / 100).toFixed(2) );
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
            if( this.price && this.currency ) {
                this.calculateFees();
            }
        },
        watch: {
            price: function (newQuestion, oldQuestion) { this.calculateFees() },
            currency: function (newQuestion, oldQuestion) { this.calculateFees() },
        }
    }
</script>

<template>
    
    <Spinner v-if="paymentOptions.length == 0" />

    <div class="payment-btns btn-group-vertical" v-if="!chosenPaymentOption && price && currency">
        <button v-for='paymentOption in paymentOptionButtons' 
            type="button" 
            class="btn btn-outline-primary btn-lg"
            @click="chosenPaymentOption=paymentOption">
            {{ paymentOption.name }} {{ paymentOption.priceWithFee }}
        </button>    
    </div>
    <PaymentForm v-else @return="returnBack">
        <div class="payment-form">
            {{ chosenPaymentOption.name }} <br>
            Form<br>
            {{ chosenPaymentOption.priceWithFee }}
        </div>
    </PaymentForm>

</template>