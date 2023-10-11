import React, { useContext } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './HomePage';
import Product from "./Product";
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import ProfileForm from './forms/ProfileForm';
import SuccessPage from './SuccessPage';
import CartPage from './CartPage';
import ProductDetail from './ProductDetails';
// import PrivateRoute from './PrivateRoute';

import "./HomePage.css"
import PrivateRoute from './PrivateRoute';



export default function MyRoutes() {

  return (
    <div>
    {/* <BrowserRouter> */}
      <Routes>
        {/* <Route exact path="/" element={<HomePage />}/> */}
        <Route exact path="/" element={<MyRoutes />}/>

      </Routes>
    {/* </BrowserRouter> */}
    </div>
  )
}
