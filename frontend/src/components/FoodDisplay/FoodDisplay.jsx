import React,{useContext} from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css"

const FoodDisplay=({category,setCategory})=>{
    const {food_list}=useContext(StoreContext);
    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes for you <button  className="food-display-all" onClick={()=>setCategory("All")}>display all</button></h2>
            <div className="food-display-list">
                 {food_list.map((el,index)=>{
                    if(category==="All"||category===el.category){
                        return (
                            <FoodItem item={el} key={index}/>
                        );
                    }
                    
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;