import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const login = (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new UnauthenticatedError("Password required");
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    throw new UnauthenticatedError("Invalid password");
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME || "8h" }
  );

  res.status(200).json({ token });
};

export { login };
