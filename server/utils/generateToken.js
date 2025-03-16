import jwt from "jsonwebtoken";

export const generateToken = (data) =>
  jwt.sign(
    {
      user_id: data.user_id,
      email: data.user_email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
