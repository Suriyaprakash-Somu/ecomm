import jwt from "jsonwebtoken";

export const generateToken = (data) =>
  jwt.sign(
    {
      customer_id: data.customer_id,
      customer_email: data.customer_email,
      customer_name: data.customer_name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
