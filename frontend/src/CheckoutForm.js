import React, { useContext, useEffect, useState } from 'react';

import { PaymentElement,useStripe,useElements } from '@stripe/react-stripe-js';
// import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from 'use-shopping-cart';
import BloomInSpringAPI from './api';
import CurrentUserContext from './context/CurrentUserContext';
import { Card,CardBody } from 'reactstrap';



export default function CheckoutForm() {
  const stripe=useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

  const {clearCart,cartDetails,totalPrice}= useShoppingCart();

  const {currentUser} = useContext(CurrentUserContext);
    
  useEffect(()=>{
    if(!stripe){
      return
    }
    const clientSecret= new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if(!clientSecret){
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });

  },[stripe])


  const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }

        setIsLoading(true);

     // return a prosmise and resolve error so that you can set handle error 
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3001/success",
          },
        }).then(async function (result){
          if(result.paymentIntent){
            try{
              for(const productDetails of Object.values(cartDetails)){
                let transactionData= {
                  bouquetId:productDetails.id,
                  quantity:productDetails.quantity,
                  totalPrice:productDetails.price * productDetails.quantity
                };
                await BloomInSpringAPI.addTransaction(currentUser.username,transactionData)
              }
            }catch(e){
              console.error("adding transaction failed",e)
            }
            alert("Done!!")

          }else  if (result.error.type === "card_error" || result.error.type === "validation_error") {
            setMessage(result.error.message);
          } else {
            setMessage("An unexpected error occured.");
          }
        });
       
        setIsLoading(false);
      
      };
      
          
  return (

  <div className="container ">
  <hr />
  <Card className="shadow-lg rounded-lg">
    <CardBody className="p-10">
      <h1 className="text-2xl font-bold mb-4">Complete your checkout here!</h1>
    
      <form className="CheckoutForm-form space-y-4" onSubmit={handleSubmit} >
        <label htmlFor="card" className="block text-sm font-medium text-gray-700">
          Enter Payment Details
        </label>
        <div className="CheckoutForm-Input block w-full p-2 border border-gray-300 rounded-md">
          <PaymentElement />
        </div>
        <button className='btn btn-dark' disabled={isLoading || !stripe || !elements} id="submit"
          type="submit"

          >
          Pay Now
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
     
    </CardBody>
  </Card>
</div>
  );
}