require('dotenv').config()
const express = require('express')
const stripe = require('stripe')("sk_test_51L4JDISEvKMW8AqaGakvAZCNKUMm3B6bbyjUBU23p2lAc0bBZUmVpjWaWWrBW3hB09DrY8zbajpi7W0iTrInp2qC00f87qlwsV");
const router = express.Router()
router.use(express.json())
router.post('/', async (req, res) => {

    const { email, fullname } = req.body;
  
    if (!email && !fullname) {
      return res.sendStatus(400);
    }
  
    try {
      // pass customer fullname and additional parameters
      const customer = await stripe.customers.create({
        email: email,
        name: fullname
      })
      
  
  
      console.log("break")

      
       
      if (customer) {
        // save the customer.id as stripeCustomerId
        // in your database.
        console.log('customer',customer)
        return res.json({ customer: customer.id });
      }
  
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  });

  // Create subscription
router.post('/subs', async (req, res) => {
  console.log(req.body)
  const { customerId, priceId } = req.body;

  if (!customerId && !priceId) {
    return res.sendStatus(403);
  }

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });

  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
    
  }
});

router.post('/token', async (req, res) => {

  const { customerId,token } = req.body;

  if (!customerId && !token) {
    return res.sendStatus(400);
  }

  try {
    // pass customer fullname and additional parameters
    const setToken =  await stripe.customers.createSource(customerId,{source: token})

    


    console.log("break")

    
     
    if (setToken) {
      // save the customer.id as stripeCustomerId
      // in your database.
      console.log('customer',setToken)
      return res.json({ customer: setToken});
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});




  module.exports = router