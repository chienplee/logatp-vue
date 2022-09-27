<template>
  <div class>
    <div>
   
        <div class="form-row">
          <label for="card-element">
            Credit or debit card
          </label>
          <div id="card-element">
            <!-- A Stripe Element will be inserted here. -->
          </div>
      
          <!-- Used to display Element errors. -->
       
        </div>
      
        <button>Submit Payment</button>
    
      <button type="submit" @click="createT">Pay $25</button>

      <!-- <button @click="createToken">click</button> -->
    </div>
  </div>
</template>
  
  <script>
import { loadStripe } from "@stripe/stripe-js";

// import token from "../server/token.js"
import { onMounted } from "vue";
import PropTypes from "vue-types";


export default {
  props: {
    planId:{
      required:false,
      type:PropTypes.String
    }
  },
  setup(props) {
    let stripe = null;

    let elements = null;
    var card=null
    onMounted(async () => {
      console.log(props)


      

      const ELEMENT_TYPE = "card";

      stripe = await loadStripe("pk_test_51L4JDISEvKMW8AqalKSC2LJYUuLwuONr0OOgoxwTOiXV8XRaLEeot4UApON2embEL18QCLRUl8JuP6ZYdqn7knxs00qaDCVDKw");
      // this.publishableKey = "";
     

      elements = stripe.elements();
       card = elements.create(ELEMENT_TYPE,
       {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
}
      
      );
    card.mount('#card-element');
    
    // 
    });
  


  const createT = ()=>{
    console.log("creating......................")
    stripe.createToken(card).then((res)=>{console.log(res)})
    console.log(card)
  }


   

   

    return {
      createT
      
    }
  }
};
</script>
  
  <style scoped>
    
  </style>
  