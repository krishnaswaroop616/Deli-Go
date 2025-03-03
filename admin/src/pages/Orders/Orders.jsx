import React from "react";
import "./Orders.css";
import { useState } from "react";
import {toast} from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders=({url})=>{
    const [orders,setOrder]=useState([]);

    const fetchAllOrders=async()=>{
        const response=await axios.get(url+"/order/list");
        if(response.data.success){
            setOrder(response.data.data);
            
        }
        else{
            toast.error("Error");
        }
    }

    const statusHandler=async(event,orderId)=>{
        const response=await axios.post(url+'/order/status',{orderId,status:event.target.value});
        if(response.data.success){
            await  fetchAllOrders()
        }
    }

    useEffect(()=>{
        fetchAllOrders()
    },[])


    return (
        <div className="order add">
            <h2>Orders: </h2>
            <div className="order-list">
                {orders.map((order,index)=>{
                    return (
                        <div  key={index} className="order-item">
                            <img src={assets.parcel_icon} alt=""></img>
                            <div>
                                <p className="order-item-food"><b>
                                    {order.items.map((item,index)=>{
                                        if(index===order.items.length-1){
                                            return item.name+"("+item.quantity+")"
                                        }
                                        else{
                                            return item.name+"("+item.quantity+"), "
                                        }
                                    })}</b>
                                </p>
                                <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
                                <div className="order-item-address">
                                    <p>{order.address.address+","}</p>
                                    <p>{order.address.city+" , "+order.address.state+" , "+order.address.country}</p>
        
                                </div>
                                <p className="order-item-phone">{order.address.phone}</p>
                            </div>
                            <p>Items: {order.items.length}</p>
                            <p>Amount: &#8377; {order.amount}</p>
                            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}> 
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Orders;