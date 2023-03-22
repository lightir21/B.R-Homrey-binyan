import Product from "../models/Product.js";
import BadRequestError from "../errors/bad-request.js";

const addProduct = async (req, res) => {
  const { advantagesList } = req.body;
  const advListArray = advantagesList.split(",");

  const created = Product.create({ ...req.body, advantagesList: advListArray });

  if (!created) throw BadRequestError("there was a problem");

  res.status(200).json({ msg: "uploaded successfully", data: created });
};

export { addProduct };
