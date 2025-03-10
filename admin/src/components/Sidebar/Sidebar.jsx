import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";

const Sidebar=()=>{
    return (
        <div className="sidebar-container">
            <div className="sidebar-options">
            <NavLink to="/add" className="options">
                <img src={assets.add_icon}></img>
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/list" className="options">
                <img src={assets.order_icon}></img>
                <p>List Items</p>
            </NavLink>
            <NavLink to="/orders" className="options">
                <img src={assets.order_icon}></img>
                <p>Orders</p>
            </NavLink>

            </div>
        </div>
    );
}


export default Sidebar;