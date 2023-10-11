import { CardElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { useStripe, useElements ,} from "@stripe/react-stripe-js";
import {Card,CardBody} from "reactstrap";
import { useShoppingCart } from "use-shopping-cart";
import CurrentUserContext from "./context/CurrentUserContext";
// import BloomInSpringAPI from "./api";
// import { useNavigate } from "react-router-dom";
// import client from "../../backend/db";
// import axios from "axios";


export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const {currentUser}= useContext(CurrentUserContext)
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {clearCart,cartDetails,totalPrice} =useShoppingCart();
  const currency = Object.values(cartDetails)[0]?.currency || 'usd';
  const amount = totalPrice;
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //stripe or element has not yet loaded
    // Make sure to disable form submission until Stripe.js has loaded.
  //   if (!stripe || !elements) {
  //     return;
  //   }
   
  //   setIsLoading(true);
  //   // const cardElement = elements.create(CardElement);

  //   //create payment intent on the server
  //   const {clientSecret} = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payments`,{
  //     method:"POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       amount:amount,
  //       paymentMethodTypes: 'card',
  //       currency:currency,
   
  //     })
  //   }).then(r=>r.json());

  //   //confirm the payment on the client
  //   // const client_secretString=clientSecret.toString();

  //   const result =await stripe.confirmPayment(clientSecret,{
  //     elements,
      
  //     confirmParams:{
  //       return_url:'http://localhost:3001/success'
  //     }
   
  //   });
  //   if(result.error){
  //     console.log(result.error.message);
  //   }else{
  //     navigate('/success')
  //   }
  //   // const {id}
    
  // //   try{

  // //   const {id}=paymentMethod;
  // //   const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payments`,
  // //   {
  // //     method:"POST",
  // //     headers: { "Content-Type": "application/json" },
  // //     body: JSON.stringify({
  // //     payment_method: id,
  // //     amount: amount,
    
  // //   }),

  // // }); 


  // // if(!error){
    
  //   // try{
  //     // const {id}=paymentMethod;
  //     // const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/payments`,
  //     // {amount,
  //     //   // id, 
  //     //   currency
  //     // });
  //     // console.log(response)
  //     //   if(response.data.success){
  //     //     console.log("success")
  //     //   }
      
  //     //   if(response.success){
  //     //     console.log('Payment Succeeded!');
  //       // add transaction to DB after successful payment
  //         // try{
  //         //   for(const [productId,ProductDetails] of Object.entries(cartDetails)){
  //         //     let transactionData= {
  //         //     productId:productId,
  //         //     quantity:ProductDetails.quantity,
  //         //     totalPrice:ProductDetails.price * ProductDetails.quantity
  //         //     };
  //         //     await BloomInSpringAPI.addTransaction(currentUser.username,transactionData)
  //         //   }
  //         // // }catch(e){
  //         // //   console.error("adding transaction failed",e)
  //         // // }
  //         // alert('payment success')
  //         // navigate('/success')
  //         // clearCart();
  //       // }else{
  //       // console.log("Unsucessful payment")
  //       // console.log("Error", error)
  //       // }
  //       // if(!response.ok){
  //       //   console.error(`Server responded with status ${response.status} code`);
  //       //   return;
  //       // }
  //   //  }catch(error){
  //   //   console.log("Error", error)
  //   //   }
  
 
  // // } else {
  // // console.log(error.message)
  // // }
  }

  
  return (

    <div className="container ">
    <hr />
    <Card className="shadow-lg rounded-lg">
      <CardBody className="p-10">
        <h1 className="text-2xl font-bold mb-4">Complete your checkout here!</h1>
     
        <form className="CheckoutForm-form space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
            Enter Payment Details
          </label>
          <div className="CheckoutForm-Input block w-full p-2 border border-gray-300 rounded-md">
            <CardElement id="card-element" />
          </div>
          <button className='btn btn-dark'
            type="submit"
            disabled={!stripe}
            >
            Pay Now
          </button>
        </form>
      </CardBody>
    </Card>
  </div>
    );
  }