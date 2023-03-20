import Product from "../models/Product.js";

const addProduct = async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
};

export { addProduct };
