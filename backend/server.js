import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import "express-async-errors";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import productRouter from "./routes/productRoute.js";
import authRouter from "./routes/authRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/api/v1", (req, res) => res.json({ msg: "B.R Homrey API running" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/upload", uploadRouter);
app.use("/api/v1/order", orderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
