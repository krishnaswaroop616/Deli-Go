import React,{createContext, useEffect, useState} from "react";
import axios from "axios";

export const StoreContext=createContext(null);

export const StoreContextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});

    const url="https://deli-go.onrender.com";

    const [token,setToken]=useState("");

    const [food_list,setFoodList]=useState([]);

    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(url+"/cart/add",{itemId},{headers:{token}});
        }
    }


    const deleteFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/cart/delete",{itemId},{headers:{token}});
        }
    }


    const getTotalAmount=()=>{
        let totalAmount=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((prod)=>prod._id===item);
                totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList= async()=>{
        const response = await axios.get(url+"/ap/food/list");
        setFoodList(response.data.data);
    }

    const loadCartData=async(token)=>{
        const response=await axios.post(url+"/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);

    }


    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);
    


    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        deleteFromCart,
        getTotalAmount,
        url,
        token,
        setToken
    }


    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        
    );

}
