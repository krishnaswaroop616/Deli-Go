import mongoose from "mongoose";

export const connectDB= async ()=>{
    await mongoose.connect("mongodb+srv://krishnaswaroop431:KrishnaMark1@cluster0.6i0ta.mongodb.net/?").then(()=>console.log("DB connected"));
}