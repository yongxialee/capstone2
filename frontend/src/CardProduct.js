// import React from 'react';
// import { useShoppingCart } from 'use-shopping-cart';

// export default function CardProduct({productId,product}) {
//   const totalPrice=useShoppingCart();
//   return (
//     <div className='item'>
//     <div className='itemBox'>
//     <img src={product.image} />
//     </div>
//     <div>
//     <h1>{product.name}</h1>
//     <p>{product.description}</p>
//     {/* <p>{totalPrice}</p> */}
//     </div>
   
   
//     </div>

//   )
// }
import {
  MDBBtn,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";
  import React from "react";
  import {formatCurrencyString,useShoppingCart } from "use-shopping-cart";
  import {Button} from 'react-bootstrap'
  
  export default function CartProduct({product}) {

    const {setItemQuantity,removeItem,}=useShoppingCart()
  return (
    <div>
    <MDBCol>
                  <div className="p-5">
                    
                    <hr className="my-4" />
  
                    <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                      <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage 
                        src={product.image}
                          fluid className="rounded-3" alt="Cotton T-shirt" />
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                      
                        <MDBTypography tag="h6" className="text-black mb-0">
                        {product.name}
                        </MDBTypography>
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
                        <Button  onClick={()=>setItemQuantity(product.id,product.quantity-1)} className="px-2" overflow="hidden">
                          <MDBIcon fas icon="minus" />
                        </Button>
  
                        <MDBInput type="number" min="0" value={product.quantity} size="xsm" />
  
                        <Button  onClick={()=>setItemQuantity(product.id,product.quantity+1)} className="px-2">
                          <MDBIcon fas icon="plus" />
                        </Button>
                      </MDBCol>
                      <MDBCol md="3" lg="2" xl="2" className="text-end">
                        <MDBTypography tag="h6" className="mb-0">
                        {formatCurrencyString({currency:product.currency, value:product.price})}
                        </MDBTypography>
                      </MDBCol>
                      <MDBCol md="1" lg="1" xl="1" className="text-end">
                        <p onClick ={()=>removeItem(product.id)} className="text-muted" >
                          <MDBIcon fas icon="trash" />
                        </p>
                      </MDBCol>
                      <MDBCol>
                      <MDBTypography tag="h5" className="text-uppercase">
                        Total price:{ }
                      </MDBTypography>
                      </MDBCol>
                    </MDBRow>
                    
                                   
                  </div>
                  
                </MDBCol>
                
                  </div>
                
  );
  }
