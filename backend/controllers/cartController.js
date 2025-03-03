import userModel from "../models/userModel.js";

const addToCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"added to cart"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


const deleteFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"deleted from cart"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}

const getCart=async (req,res)=>{
    try{
        const userData=await userModel.findById(req.body.userId);
        const cartData=await userData.cartData;
        res.json({success:true,cartData});
    }
    catch(err){
        console.log(err);
        res.json({success:true,message:"Error"});
    }
}

export {addToCart,deleteFromCart,getCart}