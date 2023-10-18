import React,{useContext,useEffect,useState} from 'react';
import BloomInSpringAPI from './api';
import { useShoppingCart } from 'use-shopping-cart';
import { Link } from 'react-router-dom';
import CartProduct from './CardProduct';
import CheckoutForm from './CheckoutForm';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";
// import CurrentUserContext from './context/CurrentUserContext';



export default function CartPage() {

  const {cartCount,cartDetails,formattedTotalPrice,totalPrice,clearCart}=useShoppingCart()
  const currency = Object.values(cartDetails)[0]?.currency || 'usd';
  //  console.log(Object.entries(cartDetails))
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
            <MDBTypography tag="h5" className="text-uppercase">
                Total price:{formattedTotalPrice}
            </MDBTypography>
            <div className="pt-5 d-flex justify-content-center gap-5 ">
            <MDBTypography tag="h6" className="mb-0">
              <MDBCardText tag="a" href="/product" className="text-body">
                <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                  to shop
                </MDBCardText>
              </MDBTypography>
              <MDBTypography>
              <MDBCardText tag="a" href="/checkout" className="text-body">
              Go To Checkout
                <MDBIcon fas icon="long-arrow-alt-right me-2" /> 
                </MDBCardText>
              </MDBTypography>
            </div>
          </MDBCard>
          
          </MDBCol>
                
          </MDBRow>
                
      </MDBContainer>
    </section>  
  )
}
