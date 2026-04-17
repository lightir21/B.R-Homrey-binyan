import Product from "../models/Product.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const parseList = (val) =>
  typeof val === "string"
    ? val.split(",").map((s) => s.trim()).filter(Boolean)
    : val;

// GET all products — filter by category, hotProducts, sku, search; sort by price
const getProducts = async (req, res) => {
  const { category, hotProducts, sort, search, sku } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (hotProducts === "true") filter.hotProducts = true;
  if (sku) filter.sku = sku.toUpperCase();
  if (search) {
    filter.$or = [
      { productName: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  let query = Product.find(filter).select("-__v");
  if (sort === "price_asc") query = query.sort({ price: 1 });
  else if (sort === "price_desc") query = query.sort({ price: -1 });
  else query = query.sort({ createdAt: -1 });

  const products = await query;
  res.status(200).json({ products, count: products.length });
};

// GET single product by id OR sku
const getProduct = async (req, res) => {
  const { id } = req.params;
  // Try MongoDB _id first, fallback to SKU
  let product = null;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    product = await Product.findById(id).select("-__v");
  }
  if (!product) {
    product = await Product.findOne({ sku: id.toUpperCase() }).select("-__v");
  }
  if (!product) throw new NotFoundError(`No product found: ${id}`);
  res.status(200).json({ product });
};

// POST create product (admin only)
const addProduct = async (req, res) => {
  req.body.advantagesList = parseList(req.body.advantagesList);
  req.body.colors = parseList(req.body.colors);
  // SKU: use provided (admin override) or let pre-save hook generate
  if (req.body.sku) req.body.sku = req.body.sku.toUpperCase().trim();

  const product = new Product(req.body);
  await product.save(); // triggers pre-save SKU generation
  res.status(201).json({ msg: "Product uploaded successfully", product });
};

// PATCH update product (admin only)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (req.body.advantagesList) req.body.advantagesList = parseList(req.body.advantagesList);
  if (req.body.colors) req.body.colors = parseList(req.body.colors);
  if (req.body.sku) req.body.sku = req.body.sku.toUpperCase().trim();

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new NotFoundError(`No product with id: ${id}`);
  res.status(200).json({ msg: "Product updated", product });
};

// DELETE product (admin only)
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new NotFoundError(`No product with id: ${id}`);
  res.status(200).json({ msg: "Product deleted" });
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
