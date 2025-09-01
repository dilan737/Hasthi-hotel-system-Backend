import express from "express"; 
import bodyParser from "body-parser"
import mongoose from "mongoose";
// import userRouter from "./routes/userRouter.js";
// import productRouter from "./routes/productRouter.js";
import verifyJwt from "./middleware/auth.js";
// import orderrouter from "./routes/orderRoutes.js";
import dotenv from "dotenv"
dotenv.config()



const app=express();


//mongoose.connect("mongodb+srv://admin:1234@cluster0.sfdum3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(


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

// ).catch((err) => {
//     console.error("Connection Failed:", err);
// });

app.use(bodyParser.json());
app.use(verifyJwt);



// app.use("/api/user",userRouter);
// app.use("/api/product",productRouter);
// app.use("/api/order",orderrouter);

hmbj

app.listen(5000,
    ()=>{
        
        console.log("server is Running on port 5000");
    }
)