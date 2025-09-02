import Package from "../models/PackageModel.js";

// Create Package
export const createPackage = async (req, res) => {
  try {
    const { description, destination, date, period, visitors, price, type } = req.body;
    const image = req.file ? req.file.path : null;
    
    console.log("Received data:", req.body); // Debug log
    console.log("Received file:", req.file); // Debug log
    
    const newPackage = new Package({ 
      description, 
      destination, 
      date, 
      period, 
      visitors: Number(visitors), 
      price: Number(price), 
      type, 
      image 
    });
    
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (err) {
    console.error("Error creating package:", err); // Debug log
    res.status(500).json({ message: err.message });
  }
};

// Get All Packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Package
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, destination, date, period, visitors, price, type } = req.body;
    
    const updateData = { 
      description, 
      destination, 
      date, 
      period, 
      visitors: Number(visitors), 
      price: Number(price), 
      type 
    };
    
    // If there's a new image, add it
    if (req.file) {
      updateData.image = req.file.path;
    }
    
    const updated = await Package.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Package
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await Package.findByIdAndDelete(id);
    res.json({ message: "Package deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};