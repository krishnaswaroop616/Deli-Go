import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrder=async (req,res)=>{
    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await  newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId ,{cartData:{}});
        res.json({success:true,message:"order placed"}); 
        
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }
}


const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error"});
    }
}


const listOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({});
        res.json({success:true,data:orders});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"}); 
    }
}


const updateStatus=async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


export {placeOrder,userOrders,listOrders,updateStatus};
