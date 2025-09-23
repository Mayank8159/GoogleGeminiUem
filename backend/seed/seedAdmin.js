import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const seedAdmin = async () => {
  const email = "admin@gemini.ggsc";
  const plainPassword = "SuperSecurePassword123";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists.");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();

  console.log("✅ Admin seeded successfully.");
  process.exit();
};

seedAdmin();