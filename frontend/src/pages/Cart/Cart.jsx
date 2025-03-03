import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import {useNavigate} from "react-router-dom";
const Cart=()=>{

    
    const  {cartItems,food_list,deleteFromCart,getTotalAmount,url}=useContext(StoreContext);
    const navigate=useNavigate();
    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br></br>
                <hr></hr>
                {food_list.map((item,index)=>{
                    if(cartItems[item._id]>0){
                        return(
                        <>
                        <div className="cart-items-title cart-items-item">
                            <img src={url+"/images/"+item.image}></img>
                            <p>{item.name}</p>
                            <p>&#8377;{item.price}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>&#8377;{item.price*cartItems[item._id]}</p>
                            <p  onClick={()=>deleteFromCart(item._id)} className="remove">remove</p>
                        </div>
                        <hr></hr>
                        </>
                        );  
                    }
                })}
            </div>
                <div className="cart-total">
                    <h2>Order Summary</h2>
                    <div>
                        <div className="cart-total-details">        
                            <p>Subtotal</p>
                            <p>&#8377;{getTotalAmount()}</p>
                        </div>
                        <hr></hr>
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>&#8377;{getTotalAmount()===0?0:40}</p>
                        </div>
                        <hr></hr>
                        <div className="cart-total-details">
                            <p><b>Total</b></p>
                            <p><b>&#8377;{getTotalAmount()+(getTotalAmount()===0?0:40)}</b></p>
                        </div>
                        <hr></hr>
                        <br></br>
                    </div>
                    <button onClick={()=>navigate('/order')}>Proceed to checkout</button>
                </div>
            </div>
    );
}

export default Cart;