const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.summary = async (_req, res) => {
  const [farmers, customers, products, orders, pendingFarmers, revenue] = await Promise.all([
    User.countDocuments({ role: "farmer", approvalStatus: "approved" }),
    User.countDocuments({ role: "customer" }),
    Product.countDocuments({ isActive: true }),
    Order.countDocuments(),
    User.countDocuments({ role: "farmer", approvalStatus: "pending" }),
    Order.aggregate([{ $match: { status: "Completed" } }, { $group: { _id: null, total: { $sum: "$totalPrice" } } }])
  ]);
  res.json({ summary: { farmers, customers, products, orders, pendingFarmers, revenue: revenue[0]?.total || 0 } });
};

exports.farmers = async (_req, res) => {
  const farmers = await User.find({ role: "farmer" }).select("-password").sort({ createdAt: -1 });
  res.json({ farmers });
};

exports.approveFarmer = async (req, res) => {
  const farmer = await User.findOneAndUpdate(
    { _id: req.params.id, role: "farmer" },
    { approvalStatus: "approved" }, { new: true }
  ).select("-password");
  if (!farmer) return res.status(404).json({ message: "Farmer not found." });
  res.json({ farmer, message: "Farmer approved." });
};

exports.removeProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ message: "Listing removed." });
};
