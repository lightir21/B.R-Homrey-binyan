import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//Routers
import productRouter from "./routes/productRoute.js";

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "hello" });
});

app.use("/api/v1/product", productRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
