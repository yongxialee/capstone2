const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



router.post('/', async function (req,res){
    const {id,amount,currency,paymentMethodType} = req.body;
    try{
        //create a paymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount,
            currency:currency,
            description:"Bloom in spring company",
            payment_method_types:[paymentMethodType],
            // confirm:true,
            automatic_payment_methods:{
                enabled:true
            }
        });
        console.log("Payment", paymentIntent);
        res.json({
            clientSecret: paymentIntent.client_secret,
            message:"Payment Successful",
            success:true,
            
            
        });

    }catch(error){
        console.error(error);
        res.status(400).json({
            message:error.message,
            success:false
        })
    }
});
router.get('/config',function (req,res){
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})

module.exports =router;