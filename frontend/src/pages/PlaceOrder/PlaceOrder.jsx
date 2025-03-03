import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";


const PlaceOrder=()=>{
    const {getTotalAmount,token,food_list,cartItems,url}=useContext(StoreContext);
    const navigate = useNavigate(); 


    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        address:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const placeOrder=async(event)=>{
        event.preventDefault();
        let orderItems=[];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo=item;
                itemInfo["quantity"]=cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        let orderData={
            address:data,
            items:orderItems,
            amount:getTotalAmount()+40,
        }
        let response=await axios.post(url+"/order/place",orderData,{headers:{token}});
        if(response.data.success){
            toast.success("Order placed");
            setTimeout(() => {
                navigate("/myorders"); 
            }, 1000);
            
        }
        
    }

    

    useEffect(()=>{
        if(!token){
            navigate('/cart');
            toast.error("Sign in to proceed forward");
        }
        else if(getTotalAmount()==0){
            navigate("/cart");
            toast.error("Add items to proceed");
        }
    },[token])


 
    return(
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery information</p>
                <div className="multi-fields">
                    <input type="text" onChange={onChangeHandler} placeholder="First Name" name="firstName" value={data.firstName}  required ></input>
                    <input type="text"  onChange={onChangeHandler} placeholder="Last Name" name="lastName" value={data.lastName} required></input>
                </div>
                <input type="text"  onChange={onChangeHandler} placeholder="Email address" name="email" value={data.email} required></input>
                <input type="text"  onChange={onChangeHandler} placeholder="Address" name="address" value={data.address} required></input>
            <div className="multi-fields">
                <input type="text"  onChange={onChangeHandler} placeholder="City" name="city" value={data.city} required></input>
                <input type="text"  onChange={onChangeHandler} placeholder="State" name="state" value={data.state} required></input>
            </div>
            <div className="multi-fields">
                <input type="text"  onChange={onChangeHandler} placeholder="Zipcode" name="zipcode" value={data.zipcode} required></input>
                <input type="text"  onChange={onChangeHandler} placeholder="Country" name="country" value={data.country} required></input>
            </div>
            <input type="text"  onChange={onChangeHandler} placeholder="Phone Number" name="phone" value={data.phone} required></input>
            </div>
            <div className="place-order-right">
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
                    <button type="submit">Confirm Order</button>
                </div>
            </div>

        </form>
    );
}


export default PlaceOrder;