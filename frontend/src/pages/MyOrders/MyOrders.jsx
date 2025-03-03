import React, { useContext, useEffect ,useState} from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders=()=>{

    const [data,setData]=useState([]);
    const {url,token}=useContext(StoreContext);

    const fetchOrders=async()=>{
        const response=await axios.post(url+"/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        
    }

    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token]);


    return (
        <div className="my-orders">
            <h1>Track your orders here:</h1>
            <div className="container">
                {data.map((order,index)=>{
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt=""></img>
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return item.name+"x"+item.quantity;
                                }
                                else{
                                    return item.name+"x"+item.quantity+" , ";
                                }
                            })}</p>
                            <p>Amount: &#8377;{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><b><span>&#8226; </span>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}


export default MyOrders;