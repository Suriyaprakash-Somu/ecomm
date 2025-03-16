import dbConnect from "../../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const adminSignup = async (req, res) => {
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

export const getUsers = async (req, res) => {
  try {
    const { pageIndex = 0, pageSize = 10, filters, sorting } = req.query;
    let parsedFilters = [];
    let parsedSorting = [];

    try {
      parsedFilters =
        filters && filters !== "undefined" ? JSON.parse(filters) : [];
      parsedSorting =
        sorting && sorting !== "undefined" ? JSON.parse(sorting) : [];
    } catch (error) {
      parsedFilters = [];
      parsedSorting = [];
    }

    let filterQuery = "";
    let filterValues = [];

    if (parsedFilters.length > 0) {
      parsedFilters.forEach((filter) => {
        filterQuery += ` AND ${filter.id} LIKE ?`;
        filterValues.push(`%${filter.value}%`);
      });
    }

    let sortQuery = "ORDER BY created_at DESC";
    if (parsedSorting.length > 0) {
      sortQuery = `ORDER BY ${parsedSorting
        .map((s) => `${s.id} ${s.desc ? "DESC" : "ASC"}`)
        .join(", ")}`;
    }

    const offset = Number(pageIndex) * Number(pageSize);

    const [users] = await dbConnect.query(
      `SELECT user_id, user_id AS id, user_name, user_email, isActive FROM users WHERE 1=1 ${filterQuery} ${sortQuery} LIMIT ? OFFSET ?`,
      [...filterValues, Number(pageSize), offset]
    );

    const [countResult] = await dbConnect.query(
      `SELECT COUNT(*) as total FROM users WHERE 1=1 ${filterQuery}`,
      filterValues
    );

    res.status(200).json({
      rows: users,
      rowCount: countResult[0].total,
    });
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const [userCheck] = await dbConnect.query(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );

    if (userCheck.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await dbConnect.query("DELETE FROM users WHERE user_id = ?", [id]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user_id, user_name, user_email, isActive } = req.body;

    if (!user_id || !user_name || !user_email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existingUser] = await dbConnect.query(
      "SELECT * FROM users WHERE user_id = ?",
      [user_id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await dbConnect.query(
      "UPDATE users SET user_name = ?, user_email = ?, isActive = ?, updated_at = NOW() WHERE user_id = ?",
      [user_name, user_email, isActive ? 1 : 0, user_id]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
