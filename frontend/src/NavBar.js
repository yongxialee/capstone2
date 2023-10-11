import React, { useContext,useState } from 'react';
import SearchBouquets from './SearchBouquets';

import { Navbar, Container, Nav, NavItem,NavLink } from 'react-bootstrap';  
import "./NavBar.css";
import { ShoppingCart } from "phosphor-react";
import CurrentUserContext from './context/CurrentUserContext';
import { useShoppingCart } from 'use-shopping-cart';

function ShoppingCartFunc() {
  
  const { formattedTotalPrice, cartCount } = useShoppingCart();
  

  return (
      <NavLink href='/cart' className="">
          <div className="relative">
              <ShoppingCart size={32}/>
          </div>
          <p className="text-lg">
              {formattedTotalPrice}
              
          </p>
      </NavLink>
  );
}
function Navigation({loggedIn}){
  // const {formattedTotalPrice,cartCount}= useShoppingCart();
  const {logout,currentUser}=useContext(CurrentUserContext);
  const navItems = loggedIn
      ? [
          { href: "/product", name: "Product" },
          { href: "/profile", name: "Profile" },
          { href: "/", name: `Log out ${ currentUser.username}`, onClick: logout },

      ]
      : [
        
          { href : "/login", name: "Login" },
          { href: "/signup", name: "Sign Up" }
      ];
      
  return (
//     <Nav>
// <NavLink href="/profile">Profile</NavLink>  
//               <NavLink href="/login">Login</NavLink>  
//               <NavLink href="/signup">Signup</NavLink> 
//               </Nav>
<Nav>
  {navItems.map((item,idx)=>(
    <>
    <NavLink className={`nav-link ${item.name === 'Login' || item.name === 'Profile' ? 'mr-4' : ''}`} href={item.href} onClick={item.onClick}>
                      {item.name}
                  </NavLink>
                  {/* <ShoppingCartFunc /> */}
                  </>
    ))}
    <ShoppingCartFunc />
</Nav>
  )
  
}

export default function NavBar() {
  

const {formattedTotalPrice,cartCount} = useShoppingCart();

  const {currentUser,logout}=useContext(CurrentUserContext)
  const [isOpen,setIsOpen]=useState(false);
  const toggleMenu=()=>setIsOpen(!isOpen);
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" >  
        <Container>  
          <Navbar.Brand href="/">BlOOM IN SPRING</Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse id="responsive-navbar-nav">  
            {/* <Nav className="me-auto">   */}
            
            <Nav className="container-fluid">
            <NavLink >  <SearchBouquets  /></NavLink>
            </Nav>          
             
          
            <Nav>  
            {/* <NavLink href="/product">Product</NavLink> */}
            <Navigation isOpen={isOpen} loggedIn={currentUser} logout={logout} currentUser={currentUser} />            
              
              {/* <NavLink href="/cart">   
                <ShoppingCart size={32} />
                <div className='badge'>
               <span> {formattedTotalPrice}</span>
                </div>
              </NavLink>   */}
              {/* <ShoppingCartFunc /> */}
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>  
 
  )
}
