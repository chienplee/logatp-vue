<!-- <template>
    <div>
  <h1>Stripe payment</h1>
  <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="formState.pk"
      :line-items="formState.lineItems"
      :success-url="formState.successURL"
      :cancel-url="formState.cancelURL"
      @loading="v => formState.loading = v"
    />
    <button @click="submit">Pay now!</button>
    </div>
</template>
<script>
import { defineComponent,reactive,ref } from 'vue'
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default defineComponent({
    components: { 
        StripeCheckout
        
     },
    setup() {
        const formState = reactive({
            pk:"pk_test_51L4JDISEvKMW8AqalKSC2LJYUuLwuONr0OOgoxwTOiXV8XRaLEeot4UApON2embEL18QCLRUl8JuP6ZYdqn7knxs00qaDCVDKw",
            loading:false,
            lineItems:{
                price:"price_1Lje1wSEvKMW8AqaYctPi2M8",
                quantity:1

            },
            successURL:"",
            cancelURL:""


                
        })
        var checkoutRef = ref('checkoutRef')
        const submit = async ()=>{
            console.log('alert')
        //    var t='this'
           await  redirectToCheckout();

        }

        return{
            formState,
            submit,
            checkoutRef
        }
    },
   
})
</script> -->
<template>
    

<div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = "pk_test_51L4JDISEvKMW8AqalKSC2LJYUuLwuONr0OOgoxwTOiXV8XRaLEeot4UApON2embEL18QCLRUl8JuP6ZYdqn7knxs00qaDCVDKw";
    return {
      loading: false,
      lineItems: [
        {
          price: 'price_1Lje1wSEvKMW8AqaYctPi2M8', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:8080/success',
      cancelURL: 'http://localhost:8080/error',
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout().then(res=>{console.log(res)});
    },
  },
};
</script>
