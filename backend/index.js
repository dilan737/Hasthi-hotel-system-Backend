// -------------------- ORIGINAL IMPORTS --------------------
import express from "express"; 
import bodyParser from "body-parser"
import mongoose from "mongoose";
// import userRouter from "./routes/userRouter.js";
// import productRouter from "./routes/productRouter.js";
import verifyJwt from "./middleware/auth.js";
// import orderrouter from "./routes/orderRoutes.js";

import dotenv from "dotenv"
dotenv.config()

// -------------------- ADDED IMPORTS (NEEDED) --------------------
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import packageRoutes from "./routes/PackageRoutes.js";
import bookingRoutes from "./routes/BookingRoutes.js"; // ✅ ADD

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------- APP --------------------
const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors());                              // enable CORS for dev frontends
app.use(bodyParser.json());                   // keep your original bodyParser
app.use(express.urlencoded({ extended: true })); // form submissions

// If you want all routes protected, keep this here.
// If packages/bookings should be public, move verifyJwt *below* those routes.
app.use(verifyJwt);

// -------------------- STATIC FILES --------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/reports", express.static(path.join(__dirname, "reports"))); // ✅ serve PDFs

// -------------------- ROUTES --------------------
// Public APIs (if verifyJwt should not guard these, move these 2 lines ABOVE app.use(verifyJwt))
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);

// app.use("/api/user",userRouter);
// app.use("/api/product",productRouter);
// app.use("/api/order",orderrouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Safari Package API is running!" });
});

// -------------------- DB CONNECT --------------------
const MONGO = process.env.MONGO_URI || process.env.MONGO_URL;
// mongoose.connect("mongodb+srv://admin:1234@cluster0.sfdum3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
mongoose.connect(MONGO)
  .then(() => {
    console.log("Connected To the database");
  })
  .catch((err) => {
    console.log("Connection Failed");
    // console.error("Connection Failed:", err); // keep original comment style
  });

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is Running on port ${PORT}`);
});
