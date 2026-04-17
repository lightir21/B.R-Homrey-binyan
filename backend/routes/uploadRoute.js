import express from "express";
import { getUploadSignature } from "../controllers/uploadController.js";
import authenticateAdmin from "../middleware/auth.js";

const router = express.Router();

// Admin only — returns a signed Cloudinary upload signature
router.get("/signature", authenticateAdmin, getUploadSignature);

export default router;
