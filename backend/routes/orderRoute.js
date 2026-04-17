import express from "express";
import { sendOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", sendOrder);

export default router;
