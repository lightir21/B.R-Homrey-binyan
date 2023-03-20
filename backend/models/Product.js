import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: [true, "product must contain a name"],
  },
  category: {
    type: String,
    require: [true, "product must contain a category"],
    enum: [
      "ציוד טכני",
      "אביזרי חשמל",
      "תאורה",
      "גינה",
      "קרניזים",
      "אביזרים לבית",
      "אביזרים למקלחת",
      "צבע וציוד נלווה",
      "מוצרי ניקוי",
      "כלי עבודה",
      "מבצעים",
    ],
  },
  subCategory: {
    type: String,
  },
  price: {
    type: Number,
    require: [true, "product must contain a price"],
  },
  subTitle: {
    type: String,
  },
  advantagesList: {
    type: [String],
  },
  image: {
    type: String,
  },
  hotProducts: {
    type: Boolean,
  },
});

export default mongoose.model("Product", ProductSchema);
