import jwt from "jsonwebtoken";
import dbConnect from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not authorized" });
  }

  const decoded = jwt.decode(token);

  const userQuery = `
    SELECT 
        u.user_id, 
        u.user_name, 
        u.user_email, 
        u.isActive, 
        ur.user_role_id, 
        ur.user_role_name
    FROM users u
    LEFT JOIN user_roles ur ON u.user_role_id = ur.user_role_id
    WHERE u.user_id = ?;
  `;

  try {
    const [userResult] = await dbConnect.query(userQuery, [decoded.user_id]);

    if (!userResult.length) {
      return res.status(403).json({ message: "User not found" });
    }

    if (!userResult[0].isActive) {
      return res
        .status(403)
        .json({ message: "User is inactive. Contact admin" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token expired. Login again" });
      }
      req.user = userResult[0];
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
