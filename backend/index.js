// import express from "express"; 
// import bodyParser from "body-parser"
// import mongoose from "mongoose";
// // import userRouter from "./routes/userRouter.js";
// // import productRouter from "./routes/productRouter.js";
// import verifyJwt from "./middleware/auth.js";
// // import orderrouter from "./routes/orderRoutes.js";
// import dotenv from "dotenv"
// dotenv.config()



// const app=express();


// //mongoose.connect("mongodb+srv://admin:1234@cluster0.sfdum3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(


// mongoose.connect(process.env.MONGO_URL)
// .then(
//     ()=>{

//         console.log("Connected To the database");
//     }
// ).catch(
//     ()=>{
//         console.log("Connection Failed");
//     }
// )

// // ).catch((err) => {
// //     console.error("Connection Failed:", err);
// // });

// app.use(bodyParser.json());
// app.use(verifyJwt);



// // app.use("/api/user",userRouter);
// // app.use("/api/product",productRouter);
// // app.use("/api/order",orderrouter);


// app.listen(5000,
//     ()=>{
        
//         console.log("server is Running on port 5000");
//     }
// )

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routers
import promotionsRouter from "./Router/offersAndPromotionsRoute.js";
import notificationsRouter from "./Router/notificationRoutes.js";



// import userRouter from "./routes/userRouter.js";
// import productRouter from "./routes/productRouter.js";
// import orderRouter from "./routes/orderRoutes.js";

// Middleware
import verifyJwt from "./middleware/auth.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(verifyJwt);

// Routes
app.use("/promotions", promotionsRouter);
app.use("/notifications", notificationsRouter);
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
// app.use("/api/order", orderRouter);

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Connection Failed:", err);
  });

  