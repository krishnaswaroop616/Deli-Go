import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import {toast} from 'react-toastify';

const List=({url})=>{
    
    const [list,setList]=useState([]);
    const fetchList=async()=>{
        const response=await axios.get(`${url}/ap/food/list`);
        // console.log(response);
        if(response.data.success){
            setList(response.data.data)
        }
        else{
            toast.error("Error");
        }

    }

    const removeFood=async (foodId)=>{
        const response=await axios.post(`${url}/ap/food/remove`,{id:foodId});
        await fetchList();
        if(response.data.success){
            toast.success("Food removed");
        }
        else{
            toast.error("Error");
        }
    }

    useEffect(()=>{
        fetchList();
    },[])
    return(
        <div className="list add flex-col">
            <p className="heading">All Food</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((el,index)=>{
                return (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/`+el.image} alt=""></img>
                        <p>{el.name}</p>
                        <p>{el.category}</p>
                        <p>&#8377;{el.price}</p>
                        <p className="remove" onClick={()=>removeFood(el._id)}>remove</p> 
                    </div>
                    )
                })}
            </div>
            
        </div>
    );
}

export default List;