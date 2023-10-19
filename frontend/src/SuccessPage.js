import React,{useContext, useState} from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import BloomInSpringAPI from './api';
import CurrentUserContext from './context/CurrentUserContext';

export default function SuccessPage() {
  const {cartDetails,clearCart}=useShoppingCart();
  const {currentUser}= useContext(CurrentUserContext)
  const addtoDBTrans = async function(){
    for(const productDetails of Object.values(cartDetails)){
      let transactionData= {
        bouquetId:productDetails.id,
        quantity:productDetails.quantity,
        totalPrice:productDetails.price * productDetails.quantity
      };
  
       await BloomInSpringAPI.addTransaction(currentUser.username,transactionData);

       console.log('testing ',transactionData)
    }
    
    

  };
  addtoDBTrans();
  
  
  return (
    <div>
      <h1>
        Thank You! 🎉
       
      </h1>
    </div>
  )
}
