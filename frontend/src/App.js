
import {useEffect, useState} from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import BloomInSpringAPI from "./api";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import NavBar from "./NavBar";
import useLocalStorage from "./hooks/useLocalStorage";

import {decodeToken} from 'react-jwt';
import MyRoutes from "./MyRoutes";


import CurrentUserContext from "./context/CurrentUserContext";
import { useShoppingCart } from "use-shopping-cart";

import Footer from "./Footer";

function App() {
  const [token,setToken]=useState(null);
  // const [infoLoading,setInfoLoading]=useState(false);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const {cartCount}=useShoppingCart()
  const [cart,setCart] = useLocalStorage("cart",null);
  // const [stripePromise,setStripePromise]=useState(null)
  // const [clientSecret, setClientSecret] = useState("");

  
  // const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
  // const navigate=useNavigate()
  // useEffect(()=>{
  //   const fetchPublishableKey = async ()=>{
  //     let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/payments/config`)
  //     const {publishableKey} = await res.json();
  //     // String(publishableKey)
  //     setStripePromise(loadStripe(publishableKey))
  
  //   }
  //   fetchPublishableKey();
  //   console.log(stripePromise)
  // },[]);
  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/payments`, {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     let { clientSecret } = await result.json();

  //     setClientSecret(clientSecret);
  //     // console.log('this is clinetC', clientSecret)
  //   });
  // }, []);
  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  useEffect(()=>{
    async function getCurrentUser(){
      if(token){
        try{
          let decoded = decodeToken(token);
          if(decoded && decoded.username){
            let {username} = decoded;
            BloomInSpringAPI.token = token;
            let user=await BloomInSpringAPI.getCurrentUser(username);
            setCurrentUser(user);
          }else{
            setCurrentUser(null);
          }
        }catch(e){
          console.error(e);
        }

      }
    }getCurrentUser();
  },[token])
  async function signUp(signupData){
    try{
      let token = await BloomInSpringAPI.signUp(signupData);
      setToken(token);
      //resgin token 
      BloomInSpringAPI.token=token;
      let decoded = decodeToken(token);
      console.log(decoded)
      setCurrentUser(decoded);
 

      
    }catch(e){
      console.log(e);
    }
  }
   /**handle login */
   async function login(loginData){
    try{
      let token = await BloomInSpringAPI.login(loginData);
      setToken(token);
      let decodedToken =decodeToken(token)
      setCurrentUser(decodedToken);
      setCart(cartCount)
    }catch(e){
      console.error('unsuccessfully login', e);
    }
  }
  /**delete user and their info */
  async function removeUser(){
    try{
      await BloomInSpringAPI.removeUser(currentUser.username);
      logout();
    }catch(e){
      console.error(e)
    }
  }
 
  /**logout function */
  function logout(){
    setCurrentUser(null);
    setToken(null);
    setCart(null)
  }
  
  console.log('Helloooooo',currentUser)
  console.log(token)
  // console.log(clientSecret)
  return (
    <div className="App">
    
    
    
   <CurrentUserContext.Provider value={{signUp,login,logout,currentUser,setCurrentUser,cart,setCart,removeUser}}>
 
  <BrowserRouter>
 
    {/* <Elements stripe={stripePromise} > */}
    <NavBar />
    
    <MyRoutes />

    <Footer />
    {/* </Elements> */}
  </BrowserRouter>
  </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
