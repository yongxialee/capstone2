import { useState,useEffect,useContext } from "react";
import React from "react";
import axios from "axios";
import ProductPage from "./ProductPage";

import "./Product.css"
// import CurrentUserContext from "./context/CurrentUserContext";
import BloomInSpringAPI from "./api";

const Product =()=>{
    
    const [data,setData]=useState();
    
    useEffect(()=>{
        async function getProducts(){
           
            try{
                let res = await BloomInSpringAPI.getAllProduct();
                setData(res.bouquets)
            }catch(e){
                console.log(e)
            }

        }
        getProducts();
    },[]);

    return (
        <div className="products">
        {data? data.map(d=> <ProductPage product={d}/>) :null}
        {/* (<img alt="pictures" style={{width:300, margin: '50px'}}src={d.image}/>)): null} */}
           
        </div>
    )

}

export default Product;