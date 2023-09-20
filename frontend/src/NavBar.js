import React, { useContext } from 'react';
import SearchBouquets from './SearchBouquets';

import { Navbar, Container, Nav, NavItem,NavLink } from 'react-bootstrap';  
import "./NavBar.css";
import { ShoppingCart } from "phosphor-react";
import CurrentUserContext from './context/CurrentUserContext';
import { useShoppingCart } from 'use-shopping-cart';

// import { NavLink } from 'react-router-dom';
export default function NavBar({size}) {
const {formattedTotalPrice,cartCount} = useShoppingCart()
  const {currentUser,logout}=useContext(CurrentUserContext)
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
            <NavLink href="/product">Product</NavLink>
            
              <NavLink href="/profile">Profile</NavLink>  
              <NavLink href="/login">Login</NavLink>  
              <NavLink href="/signup">Signup</NavLink>  
              <NavLink href="/cart">   
                <ShoppingCart size={32} />
                <div className='badge'>
               <span> {formattedTotalPrice}</span>
                </div>
              </NavLink>  
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>  
 
  )
}
