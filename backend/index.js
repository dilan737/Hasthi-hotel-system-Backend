import express from "express"; 
import bodyParser from "body-parser"
import mongoose from "mongoose";
import verifyJwt from "./middleware/auth.js";
import dotenv from "dotenv"
dotenv.config()



const app=express();


mongoose.connect(process.env.MONGO_URL)
.then(
    ()=>{

        console.log("Connected To the database");
    }
).catch(
    ()=>{
        console.log("Connection Failed");
    }
)


app.use(bodyParser.json());
app.use(verifyJwt);



// app.use("/api/user",userRouter);




app.listen(5000,
    ()=>{
        
        console.log("server is Running on port 5000");
    }
)