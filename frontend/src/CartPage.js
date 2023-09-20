import React,{useContext,useEffect,useState} from 'react';
import BloomInSpringAPI from './api';
import { useShoppingCart } from 'use-shopping-cart';
import { Link } from 'react-router-dom';
import CartProduct from './CardProduct'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";
// import CurrentUserContext from './context/CurrentUserContext';



export default function CartPage() {

  const {cartCount,cartDetails,formattedTotalPrice}=useShoppingCart()

//   useEffect(()=>{
    
//     async function getProducts(){
    
//       try{
//         let res = await BloomInSpringAPI.getAllProduct();
//         console.log("hello", res.bouquets)
//          setData(res.bouquets)
             
//       }catch(e){
//           console.log(e)
//       }
      
//     }
//     getProducts()
  
//   }
// ,[]);

//   function getDefaultCart(){
//     let cart={};
//     for(let i=1;i<17;i++){
//       cart[i]=0;
//     }return cart;
   
//   }
  
 
   
  
  // function addToCart(itemId){
  //   setCartItems(previous =>({...previous,[itemId]:previous[itemId] +1}))

  // }
  // function removeFromCart(itemId){
  //   setCartItems(previous =>({...previous,[itemId]:previous[itemId] -1}))
  // }
  
  // function checkout(){
  //   setCartItems(getDefaultCart())
  // }



  // // const {getDefaultCart,cartItems} = useContext(CurrentUserContext)
   console.log(cartDetails)
  
  return (
  <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol size="12">
          <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-0">
              <MDBRow className="g-0">
                
                

      <h2> Your Shopping Cart Items:</h2>
      {cartCount >0 ? 
      <div>
      <p>{cartCount} items</p>
      </div>
      :
      <div>
        <h2>Your Shopping Cart Is Empty</h2>
        <Link to ="/product"> <h2>Visit our Product</h2></Link>
        
      </div>
      }

      {cartCount > 0 && <div  className="mt-12 space-y-4">
                {Object.entries(cartDetails).map(([productId, product]) => (
                <CartProduct key={productId} product={product} />
                ))}
                </div>   }
           
             
                </MDBRow>
                </MDBCardBody>
                </MDBCard>
                <div className="pt-5">
                      <MDBTypography tag="h6" className="mb-0">
                        <MDBCardText tag="a" href="#!" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                          to shop
                        </MDBCardText>
                      </MDBTypography>
                    </div>
                </MDBCol>
                
                </MDBRow>
                
                </MDBContainer>
                </section>  
  )
}
