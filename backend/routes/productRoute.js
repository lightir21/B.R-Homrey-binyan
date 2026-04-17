import express from "express";
import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authenticateAdmin from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.route("/").get(getProducts);
router.route("/:id").get(getProduct);

// Admin-only routes
router.route("/").post(authenticateAdmin, addProduct);
router.route("/:id").patch(authenticateAdmin, updateProduct);
router.route("/:id").delete(authenticateAdmin, deleteProduct);

export default router;
