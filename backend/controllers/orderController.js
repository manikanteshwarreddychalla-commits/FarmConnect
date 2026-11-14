const Order = require("../models/Order");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  const { productId, quantityOrdered, pickupMethod } = req.body;
  const qty = Number(quantityOrdered);
  if (!qty || qty <= 0) return res.status(400).json({ message: "Enter a valid quantity." });
  const product = await Product.findOne({ _id: productId, isActive: true });
  if (!product) return res.status(404).json({ message: "Product is unavailable." });
  if (String(product.farmer) === String(req.user._id)) return res.status(400).json({ message: "You cannot order your own listing." });
  if (qty > product.quantityAvailable) return res.status(400).json({ message: "Requested quantity is not available." });
  product.quantityAvailable -= qty;
  await product.save();
  const order = await Order.create({
    product: product._id, buyer: req.user._id, farmer: product.farmer,
    quantityOrdered: qty, totalPrice: qty * product.pricePerKg, pickupMethod
  });
  res.status(201).json({ order, message: "Order placed successfully." });
};

exports.mine = async (req, res) => {
  const query = req.user.role === "customer" ? { buyer: req.user._id } : { farmer: req.user._id };
  const orders = await Order.find(query).populate("product", "cropName imageUrl pricePerKg").populate("buyer", "name phone").populate("farmer", "name phone").sort({ createdAt: -1 });
  res.json({ orders });
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  if (!["Accepted", "Completed"].includes(status)) return res.status(400).json({ message: "Invalid order status." });
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id, farmer: req.user._id }, { status }, { new: true }
  );
  if (!order) return res.status(404).json({ message: "Order not found." });
  res.json({ order, message: "Order status updated." });
};
