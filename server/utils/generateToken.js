import jwt from "jsonwebtoken";

export const generateToken = (data) =>
  jwt.sign({ email: data.user_email }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
