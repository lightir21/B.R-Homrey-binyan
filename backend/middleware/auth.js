import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication required");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid or expired token");
  }
};

export default authenticateAdmin;
