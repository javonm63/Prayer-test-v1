import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ error: "All fields are required" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({
      message: "User created",
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error("❌ Signup Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found");
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) return res.status(400).send("Invalid password");

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, userId: user._id, username: user.username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
    });
    res.json({ msg: "OTP sent to your email" });
  } catch (err) {
    console.error("❌ Forgot Password Error:", err);
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });
    console.log("📨 Received email:", email);
    console.log("🧾 Received OTP:", otp);
    console.log("💾 Stored OTP:", user.otp);
    console.log("⌛ Expiry:", user.otpExpires, "Now:", Date.now());
    if (!user.otp) return res.status(400).json({ msg: "No OTP found for this user" });

    if (user.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });
    if (user.otpExpires < Date.now()) return res.status(400).json({ msg: "OTP expired" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
    console.log("✅ Password reset successful");
    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error("❌ Reset Password Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

