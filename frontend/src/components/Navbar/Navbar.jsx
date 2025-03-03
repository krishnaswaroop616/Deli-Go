import React, { useContext, useState } from "react";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const Navbar=({setShowLogin})=>{
    const [menu,setMenu]=useState("");

    const {getTotalAmount,token,setToken}=useContext(StoreContext);

    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }
    const orders=()=>{
        navigate("/myorders");
    }
    return(
        <div className="navbar">
            <Link to="/"><img src={assets.DeliGo} alt="" className="logo"></img></Link>
            <ul className="navbar-menu">
                <a href="/" onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</a>
                <a href="/#menu" onClick={()=>setMenu("Menu")}  className={menu==="Menu"?"active":""}>Menu</a>
                <a href="/#footer" onClick={()=>setMenu("Contact us")} className={menu==="Contact us"?"active":""}>Contact us</a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to="/cart"><img src={assets.basket_icon} alt=""></img></Link>
                    <div className={getTotalAmount()===0?"":"dot"}></div>
                </div>
                {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>:
                <div className="navbar-profile">
                    <img src={assets.profile_icon}></img>
                    <ul className="nav-profile-dropdown">
                        <li onClick={orders} ><img src={assets.bag_icon}></img><p>Orders</p></li>
                        <hr></hr>
                        <li onClick={logout}><img src={assets.logout_icon}></img><p>Logout</p></li>
                    </ul>
                </div>
                }
                
            </div>
        </div>
    );
}

export default Navbar;