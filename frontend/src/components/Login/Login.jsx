import React, {  useState ,useContext} from 'react'
import "./Login.css";
import { assets } from '../../assets/frontend_assets/assets';
import {StoreContext}  from "../../context/StoreContext";
import axios from "axios"

const Login=({setShowLogin})=>{

    const {url,token,setToken} =useContext(StoreContext);
    const [currState,setCurrState]=useState("login");
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    });

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const onSubmitHandler= async (event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState=="login"){
            newUrl+="/user/login";
        }
        else{
            newUrl+="/user/register";
        }
        const response=await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }


    return (
        
        <div className='login'>
            <form  onSubmit={onSubmitHandler} className="login-container">
                <div className="login-title">
                    <h3>{currState}</h3>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}></img>
                </div>
                <div className='login-info'>
                    {currState=="Sign Up"?<input type='text' onChange={onChangeHandler} value={data.name}  name='name' placeholder='Enter your name' required></input>:<></>}
                    <input type='text' name='email' onChange={onChangeHandler} value={data.email} placeholder='Enter your email' required></input>
                    <input type='password' name="password" onChange={onChangeHandler} value={data.password} placeholder='Enter password' required></input>
                </div>
                <button type='submit'>{currState=="Sign Up"?"Create account":"Login"}</button>
                {currState=="Sign Up"?<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>:<p>Create a new Account <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>}
            </form>
        </div>
    );
}

export default Login