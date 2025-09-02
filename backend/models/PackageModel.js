import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  description: { type: String, required: true },
  destination: { type: String, required: true }, // Changed from 'location'
  date: { type: String, required: true }, // Added
  period: { type: String, required: true }, // Added
  visitors: { type: Number, required: true }, // Added
  price: { type: Number, required: true },
  type: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);