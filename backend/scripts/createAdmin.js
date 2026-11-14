require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  if (!email || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env");
  }
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin account already exists:", email);
  } else {
    await User.create({
      name: process.env.ADMIN_NAME || "FarmConnect Admin",
      email, password: await bcrypt.hash(password, 12),
      role: "admin", approvalStatus: "approved"
    });
    console.log("Admin account created:", email);
  }
  await mongoose.disconnect();
})().catch(err => { console.error(err.message); process.exit(1); });
