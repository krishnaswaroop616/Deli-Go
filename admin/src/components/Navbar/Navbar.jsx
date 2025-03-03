import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar=()=>{
    return (
        <div className="navbar-container">
            <img className="logo" src={assets.logo}></img>
            <i class="fa-regular fa-user profile"></i>
        </div>
    );
}

export default Navbar;