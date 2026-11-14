const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cropName: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  pricePerKg: { type: Number, required: true, min: 0 },
  quantityAvailable: { type: Number, required: true, min: 0 },
  qualityGrade: { type: String, default: "A" },
  location: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
