import React from 'react';
import { Routes,Route } from 'react-router-dom';
import HomePage from './HomePage';
import Product from "./Product";
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import ProfileForm from './forms/ProfileForm';
import SuccessPage from './SuccessPage';
import CartPage from './CartPage';
import ProductDetail from './ProductDetail';

import "./HomePage.css"



export default function MyRoutes() {
  return (
    <div>
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route exact path='/product' element={<Product />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/login" element={<LoginForm />}/>
        <Route exact path="/signup"  element={<SignupForm />}/>
        <Route exact path="/profile"  element={<ProfileForm />}/>
        <Route exact path="/cart"  element={<CartPage />}/>
        <Route exact path="/success" element={<SuccessPage />}/>
      </Routes>
    </>
    </div>
  )
}
