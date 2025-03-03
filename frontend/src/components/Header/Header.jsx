import React from "react";
import "./Header.css";

const Header=()=>{
    return (
        <div className="header">
            <div className="header-content">
                <h2 >Order Your Favorite Meals, Anytime!</h2>
                <p>Explore a world of flavors with our diverse menu, crafted with the freshest ingredients by top chefs. Whether you're craving a quick bite or a gourmet meal, we've got you covered.</p>
                <p>Delicious food, delivered to your doorstep!</p>
                <a href="#menu" >View Menu</a>
            </div>
        </div>
    );
}

export default Header;