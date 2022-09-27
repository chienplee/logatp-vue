// import Stripe from 'stripe';
// const stripe = require('stripe')("sk_test_51L4JDISEvKMW8AqaGakvAZCNKUMm3B6bbyjUBU23p2lAc0bBZUmVpjWaWWrBW3hB09DrY8zbajpi7W0iTrInp2qC00f87qlwsV");
// import{loadStripe}from'@stripe/stripe-js';


export default{
    
    async createToke(){
        console.log("hello")
    //    var stripe = await loadStripe("sk_test_51L4JDISEvKMW8AqaGakvAZCNKUMm3B6bbyjUBU23p2lAc0bBZUmVpjWaWWrBW3hB09DrY8zbajpi7W0iTrInp2qC00f87qlwsV");

// const stripe = new Stripe('sk_test_51L4JDISEvKMW8AqaGakvAZCNKUMm3B6bbyjUBU23p2lAc0bBZUmVpjWaWWrBW3hB09DrY8zbajpi7W0iTrInp2qC00f87qlwsV');

// const stripe = require('stripe')("sk_test_51L4JDISEvKMW8AqaGakvAZCNKUMm3B6bbyjUBU23p2lAc0bBZUmVpjWaWWrBW3hB09DrY8zbajpi7W0iTrInp2qC00f87qlwsV");
const stripe = require('stripe')("sk_test_51L4JDISEvKMW8AqaGakvAZCNKUMm3B6bbyjUBU23p2lAc0bBZUmVpjWaWWrBW3hB09DrY8zbajpi7W0iTrInp2qC00f87qlwsV");


const token = await stripe.tokens.create({
  card: {
    number: '4242424242424242',
    exp_month: 9,
    exp_year: 2023,
    cvc: '314',
  },
});
  console.log(token)

//   return token


      
    
    
  
  
    }
}