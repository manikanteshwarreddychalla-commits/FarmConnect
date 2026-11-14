const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const safeUser = user => ({
  id: user._id, name: user.name, email: user.email, role: user.role,
  approvalStatus: user.approvalStatus, phone: user.phone, address: user.address
});

function issueToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });
}

async function register(req, res, role) {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required." });
    if (password.length < 8) return res.status(400).json({ message: "Password must contain at least 8 characters." });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "An account with this email already exists." });
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name, email, password: hashed, phone, address, role,
      approvalStatus: role === "farmer" ? "pending" : "approved"
    });
    res.status(201).json({
      message: role === "farmer" ? "Registration submitted. Wait for admin approval before signing in." : "Account created. You can now sign in.",
      user: safeUser(user)
    });
  } catch (err) {
    res.status(500).json({ message: "Could not create account." });
  }
}

exports.registerFarmer = (req, res) => register(req, res, "farmer");
exports.registerCustomer = (req, res) => register(req, res, "customer");

exports.login = async (req, res, role) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase(), role }).select("+password");
    if (!user || !(await bcrypt.compare(password || "", user.password))) {
      return res.status(401).json({ message: "Invalid email or password for this portal." });
    }
    if (role === "farmer" && user.approvalStatus !== "approved") {
      return res.status(403).json({ message: user.approvalStatus === "pending" ? "Your farmer account is awaiting admin approval." : "Your farmer account was not approved." });
    }
    const token = issueToken(user);
    res.json({ token, user: safeUser(user), redirect: `/${role}/dashboard` });
  } catch {
    res.status(500).json({ message: "Unable to sign in right now." });
  }
};

exports.loginFarmer = (req, res) => exports.login(req, res, "farmer");
exports.loginCustomer = (req, res) => exports.login(req, res, "customer");
exports.loginAdmin = (req, res) => exports.login(req, res, "admin");

exports.me = (req, res) => res.json({ user: safeUser(req.user) });
