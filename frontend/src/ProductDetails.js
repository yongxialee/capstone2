import React, { useEffect,useState,useContext } from 'react';
// import {Button} from 'react-bootstrap';
import BloomInSpringAPI from './api';
// import CurrentUserContext from './context/CurrentUserContext';
import { useParams } from 'react-router-dom';
import "./ProductDetail.css"
import {useShoppingCart,formatCurrencyString} from 'use-shopping-cart';
// import { Prev } from 'react-bootstrap/esm/PageItem';


function ProductDetail() {
  const {id} = useParams();
  const [product,setProduct]=useState(null);

  const {addItem} =useShoppingCart();
  const [count,setCount] = useState(1);

  useEffect(()=>{
    async function getData(){
      try{
        let res = await BloomInSpringAPI.getProductById(id);
        console.log(res.bouquet)
        setProduct(res.bouquet)
        
      }catch(e){
        console.log(e)
      }
      
    }
    getData();
  
  },[id]);


  const handleSubmit =(e)=>{
  
      e.preventDefault();
      addItem(product,{count});
      setCount(count +1)
  }
 

  if (!product) {
    return 'Loading...'; // add a loading state
}
console.log(product)
  return (
    <>
    <div className='detail'>
    <img  alt="flowers" src={product.image} />
    <div>
      
      <div className='card-detail'>
        <h3>Product Name:{product.name}</h3>
   
        <p>
          {product.description}
        </p>
       
        <p>
         <b>PRICE: {formatCurrencyString({currency:product.currency, value:product.price})}</b> 
        </p>
        <button className="addToCartBttn" onClick={handleSubmit}>Add To Cart ({count})
        
        </button>

    </div>
    </div>
      
    </div>
    
      </>
  )
}
export default ProductDetail;