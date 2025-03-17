import dbConnect from "../../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateCustomerToken.js";
import jwt from "jsonwebtoken";

export const customerSignup = async (req, res) => {
  try {
    const { customer_name, customer_email, customer_password } = req.body;
    if (!customer_name || !customer_email || !customer_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existingCustomer] = await dbConnect.query(
      "SELECT * FROM customers WHERE customer_email = ?",
      [customer_email]
    );
    if (existingCustomer.length > 0) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const hashedPassword = await bcrypt.hash(customer_password, 10);
    const [result] = await dbConnect.query(
      "INSERT INTO customers (customer_name, customer_email, customer_password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
      [customer_name, customer_email, hashedPassword]
    );

    return res
      .status(201)
      .json({ message: "Signup successful", customerId: result.insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const customerLogin = async (req, res) => {
  try {
    const { customer_email, customer_password } = req.body;
    if (!customer_email || !customer_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [customers] = await dbConnect.query(
      "SELECT * FROM customers WHERE customer_email = ?",
      [customer_email]
    );
    if (customers.length === 0) {
      return res.status(400).json({ message: "Customer not found" });
    }

    const customer = customers[0];

    if (!customer.isActive) {
      return res
        .status(403)
        .json({ message: "Customer Blocked. Contact Support" });
    }

    const isMatch = await bcrypt.compare(
      customer_password,
      customer.customer_password
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(customer);
    return res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        customer_name: customer.customer_name,
        customer_email: customer.customer_email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const verifyCustomerToken = (req, res) => {
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
