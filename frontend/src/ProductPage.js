import React,{useContext} from 'react';
import CurrentUserContext from './context/CurrentUserContext';
// import BloomInSpringAPI from './api';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import {useShoppingCart,formatCurrencyString} from 'use-shopping-cart';





export default function ProductPage({product}) {
  const {id,name,description,price,currency,image}= product;
  const {addItem} = useShoppingCart();


  const handleSubmit=(e)=>{
    e.preventDefault();
    addItem(product)
    
    console.log(id)
  }
  // console.log(cartItems)

  return (
    <Link to={`/product/${id}` } > 
    <div className='productItem'>
        <img alt="productItem" src={image} />
        <div className='details'>
            <p><b>{name}</b></p>
            <p><b>{description}</b></p>
            <p><b>Price: {formatCurrencyString({currency:currency, value:price})}</b></p>
        </div>
        <button onClick={handleSubmit} className='addToCartBttn'>Add To Cart
        {/* {cartItemCount > 0 && <> ({cartItemCount})</>} */}
        </button>

    </div>
    </Link>
  )
}
