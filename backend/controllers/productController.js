const Product = require("../models/Product");

exports.list = async (req, res) => {
  const { search, location } = req.query;
  const filter = { isActive: true, quantityAvailable: { $gt: 0 } };
  if (search) filter.cropName = { $regex: search, $options: "i" };
  if (location) filter.location = { $regex: location, $options: "i" };
  const products = await Product.find(filter).populate("farmer", "name phone address").sort({ createdAt: -1 });
  res.json({ products });
};

exports.create = async (req, res) => {
  const product = await Product.create({ ...req.body, farmer: req.user._id });
  res.status(201).json({ product, message: "Product listed successfully." });
};

exports.update = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, farmer: req.user._id }, req.body, { new: true, runValidators: true }
  );
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product, message: "Product updated." });
};

exports.remove = async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ message: "Product deleted." });
};

exports.mine = async (req, res) => {
  const products = await Product.find({ farmer: req.user._id }).sort({ createdAt: -1 });
  res.json({ products });
};
