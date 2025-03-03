import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";


const FoodItem=({item,index})=>{


   
    const {cartItems,addToCart,deleteFromCart,url}=useContext(StoreContext);

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img  className="food-item-img" src={url+"/images/"+item.image}></img>
                {!cartItems[item._id]?<img className="add" onClick={()=>addToCart(item._id)}  src={assets.add_icon_white}></img>
                    :<div className="food-item-counter">
                        <img onClick={()=>deleteFromCart(item._id)} src={assets.remove_icon_red}></img>
                        <p>{cartItems[item._id]}</p>
                        <img onClick={()=>addToCart(item._id)} src={assets.add_icon_green}></img>
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{item.name}</p>
                    <img src={assets.rating_starts}></img>
                </div>
                <p className="food-item-desc">{item.description}</p>
                <p className="food-item-price">&#8377;{item.price}</p>
            </div>
        </div>
    );
}

export default FoodItem;