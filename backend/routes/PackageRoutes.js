import express from "express";
import multer from "multer";
import path from "path";
import { createPackage, getPackages, updatePackage, deletePackage } from "../controllers/PackageControllers.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Routes
router.post("/", upload.single("image"), createPackage);
router.get("/", getPackages);
router.put("/:id", upload.single("image"), updatePackage); // Added upload for update
router.delete("/:id", deletePackage);

export default router;