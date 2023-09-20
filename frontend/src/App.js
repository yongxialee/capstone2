
import {useEffect, useState} from "react";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import BloomInSpringAPI from "./api";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import NavBar from "./NavBar";
// import SearchBouquets from "./SearchBouquets";
import {decodeToken} from 'react-jwt';
import MyRoutes from "./MyRoutes";

import CurrentUserContext from "./context/CurrentUserContext";

import Footer from "./Footer";

function App() {
  const [token,setToken]=useState(null);
  const [infoLoading,setInfoLoading]=useState(false);
  const [currentUser,setCurrentUser] =useState(null);
  // const [cartItems,setCartItems] = useState(getDefaultCart());
  // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  // const navigate=useNavigate()
  async function signUp(signupData){
    try{
      let response = await BloomInSpringAPI.signUp(signupData);
      setToken(response);
      //resgin token 
      BloomInSpringAPI.token=response;
      let decoded = decodeToken(token);
      setCurrentUser(decoded);
 

      
    }catch(e){
      console.log(e);
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
  /**handle login */
  async function login(loginData){
    try{
      let token = await BloomInSpringAPI.login(loginData);
      setToken(token);
      setCurrentUser(token);
    }catch(e){
      console.error('unsuccessfully login', e);
    }
  }
  /**logout function */
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }
  useEffect(()=>{
    async function getCurrentUser(){
      if(token){
        
      }
    }
  })
  //set default to cart
  // async function getDefaultCart(){
  //   let cart={};
  //   let product= await BloomInSpringAPI.getAllProduct();
  //   console.log(product.length)
  //   for(let i=1;i<product.length +1 ; i++){
  //     cart[i]=0;
  //     console.log(cart[i])

  //   }
  // }
  // function addToCart(itemId){
  //   setCartItems(previous =>({...previous,[itemId]:previous[itemId] +1}))

  // }
  // function removeFromCart(itemId){
  //   setCartItems(previous =>({...previous,[itemId]:previous[itemId] -1}))
  // }
  
  // function checkout(){
  //   setCartItems(getDefaultCart())
  // }

  // if(!infoLoading){
  //   return (
  //     <p>Loading ...</p>
  //   )
  // }
  console.log(token)
  return (
    <div className="App">
    
    
    
   <CurrentUserContext.Provider value={{signUp,login,logout,currentUser,removeUser}}>
 
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
