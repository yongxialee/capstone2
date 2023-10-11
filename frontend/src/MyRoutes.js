import React from 'react';
import { Route,Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Product from "./Product";
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import ProfileForm from './forms/ProfileForm';
import SuccessPage from './SuccessPage';
import CartPage from './CartPage';
import ProductDetail from './ProductDetails';
import "./HomePage.css"
import Payment from './Payment';
import PrivateRoute from './PrivateRoute';




export default function MyRoutes() {

  return (
    <div>
   
      <Switch>
        <Route exact path="/" >
        <HomePage />
        </Route>

        <Route exact path='/product'  >
          <Product />
        </Route>
        <Route exact path="/product/:id" >
            <ProductDetail />
        </Route>
        <Route exact path="/login" >
            <LoginForm />
        </Route>
        <Route exact path="/signup">
            <SignupForm />
        </Route>
        <PrivateRoute exact path="/profile" >
            <ProfileForm />
        </PrivateRoute>
        <Route exact path="/cart"  >
           <CartPage />
        </Route>
        <PrivateRoute exact path="/checkout" >
        <Payment />
        </PrivateRoute>
       <PrivateRoute exact path="/success">
          <SuccessPage />
       </PrivateRoute>
        
      
      </Switch>

    </div>
  )
}
