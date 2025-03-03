import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app=express();
const port=process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();

app.use("/ap/food",foodRouter);

app.use("/images",express.static("uploads"));

app.use("/user",userRouter);

app.use("/cart",cartRouter);

app.use("/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("Working");
})


app.listen(port,()=>{
    console.log("Listening on port",port)
})