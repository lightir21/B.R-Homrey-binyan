import Product from "../models/Product.js";

const addProduct = async (req, res) => {
  res.status(200).json(req.body);
};

export { addProduct };
