import dbConnect from "../../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
  console.log(req.body);

  try {
    const { user_name, user_email, user_password } = req.body;
    if (!user_name || !user_email || !user_password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [existingUser] = await dbConnect.query(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const [result] = await dbConnect.query(
      "INSERT INTO users (user_name, user_email, user_password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
      [user_name, user_email, hashedPassword]
    );
    return res
      .status(201)
      .json({ message: "Signup successful", userId: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    if (!user_email || !user_password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const [users] = await dbConnect.query(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );
    if (users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = users[0];

    if (!user.isActive) {
      return res.status(403).json({ message: "User Blocked. Contact Admin" });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Token verified", decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
