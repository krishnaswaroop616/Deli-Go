import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App=()=>{

  const [showLogin ,setShowLogin]=useState(false);

  return(
    <>
    <ToastContainer/>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <Navbar setShowLogin={setShowLogin}></Navbar>
    <div className="app">
      
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/order" element={<PlaceOrder/>}></Route>
        <Route path="/myorders" element={<MyOrders/>}></Route>
      </Routes>
      
    </div>
    <Footer></Footer>
    </>
  );
}


export default App;
