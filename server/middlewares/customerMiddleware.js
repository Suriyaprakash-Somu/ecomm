import jwt from "jsonwebtoken";
import dbConnect from "../config/db.js";

export const customerMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not authorized" });
  }

  const decoded = jwt.decode(token);

  const customerQuery = `
    SELECT 
        customer_id, 
        customer_name, 
        customer_email, 
        isActive
    FROM customers
    WHERE customer_id = ?;
  `;

  try {
    const [customerResult] = await dbConnect.query(customerQuery, [
      decoded.user_id,
    ]);

    if (!customerResult.length) {
      return res.status(403).json({ message: "Customer not found" });
    }

    if (!customerResult[0].isActive) {
      return res
        .status(403)
        .json({ message: "Customer is inactive. Contact support" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, customer) => {
      if (err) {
        return res.status(403).json({ message: "Token expired. Login again" });
      }
      req.customer = customerResult[0];
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
