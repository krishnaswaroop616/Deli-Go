import React from "react";
import "./ExploreMenu.css"
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu=({category,setCategory})=>{
    return (
        <>
        
        <div className="menu" id="menu" >
            <div className="menu-text">
            <h1>Explore Our Menu</h1>
            <p>"Discover a variety of delicious dishes crafted with the finest ingredients. From quick bites to gourmet meals, we have something for every craving!</p>
            </div>
            <div className="menu-items">
                {menu_list.map((el,index)=>{
                    return(
                        <div onClick={()=>setCategory(prev=>prev===el.menu_name?"All":el.menu_name)} key={index} className="items">
                            <img src={el.menu_image}></img>
                            <p>{el.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr className="mt-5"></hr>
        </div>
        </>
    );
}
export default ExploreMenu;