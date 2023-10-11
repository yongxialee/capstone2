import { useEffect, useState } from "react";
import Checkout from "./Checkout";

import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useShoppingCart } from "use-shopping-cart";
import CheckoutForm from "./CheckoutForm";

function Payment() {
  // const [stripePromise,setStripePromise]=useState(null)
  const [clientSecret,setClientSecret]=useState("");
  const {totalPrice,cartDetails}=useShoppingCart()
  const currency = Object.values(cartDetails)[0]?.currency || 'usd';
  const amount = totalPrice;
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}/payments`,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount:amount,
        paymentMethodTypes: 'card',
        currency:currency,
   
      })
    }).then(r=>r.json())
    .then((data)=>setClientSecret(data.clientSecret))

    },[])
  // })
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const stripePromise= loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  return (
    <>
    {clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        
      <CheckoutForm />
    </Elements>
    )}
        
 
    </>
  );
}

export default Payment;