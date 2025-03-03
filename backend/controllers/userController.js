import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}


const loginUser=async(req,res)=>{
    const {email,password}=req.body; 
    try{
        const user=await userModel.findOne({email:email});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Incorrect email or password"});
        }
        const token=createToken(user._id);
        res.json({success:true,token})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});

    }
}


const registerUser=async (req,res)=>{
    const {name,password,email} = req.body;

    
    try{
        const exists=await userModel.findOne({email:email});
        if(exists){
            return res.json({success:false,message:"User already exists "});
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email address"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Weak password! Use a mix of uppercase, lowercase, numbers, and symbols."});
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const user=await newUser.save();
        const token =createToken(user._id);
        res.json({success:true,token});
         
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }
}

export {loginUser,registerUser};