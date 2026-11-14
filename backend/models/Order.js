const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantityOrdered: { type: Number, required: true, min: 0.1 },
  totalPrice: { type: Number, required: true, min: 0 },
  pickupMethod: { type: String, enum: ["Pickup", "Delivery"], default: "Pickup" },
  status: { type: String, enum: ["Pending", "Accepted", "Completed"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
