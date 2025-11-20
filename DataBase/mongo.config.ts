import mongoose from "mongoose";

export function connect(){
    mongoose
    .connect(process.env.MONGO_URI!,{
        tls:true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}