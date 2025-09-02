import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
userId: String,
packageId: String, // keep as String; we'll $toObjectId during $lookup
name: String,
phone: String,
email: String,
visitors: Number,
price: Number,
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Booking", bookingSchema);