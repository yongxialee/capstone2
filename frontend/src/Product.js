import { useState,useEffect,useContext } from "react";
import React from "react";
import axios from "axios";
import ProductPage from "./ProductPage";

import "./Product.css"
// import CurrentUserContext from "./context/CurrentUserContext";
import BloomInSpringAPI from "./api";

const Product =()=>{
    
    const [data,setData]=useState();
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        async function getProducts(){
           
            try{
                let res = await BloomInSpringAPI.getAllProduct();
                setData(res.bouquets);
                  setIsLoading(false);
            }catch(e){
                console.log(e)
            }

        }
        getProducts();
    },[]);
      if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }


    return (
        <div className="products">
        {data? data.map(d=> <ProductPage product={d}/>) :null}
        {/* (<img alt="pictures" style={{width:300, margin: '50px'}}src={d.image}/>)): null} */}
           
        </div>
    )

}

export default Product;
