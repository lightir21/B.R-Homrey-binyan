import mongoose from "mongoose";

// Auto-generate a sequential-style SKU: BR-XXXXXX
async function generateSku() {
  const last = await mongoose.model("Product").findOne({}, { sku: 1 }).sort({ createdAt: -1 });
  if (!last || !last.sku) return "BR-000001";
  const num = parseInt(last.sku.replace("BR-", ""), 10) + 1;
  return "BR-" + String(num).padStart(6, "0");
}

const ProductSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true,
      trim: true,
    },
    productName: {
      type: String,
      required: [true, "product must contain a name"],
      trim: true,
      maxlength: [200, "product name cannot exceed 200 characters"],
    },
    category: {
      type: String,
      required: [true, "product must contain a category"],
      enum: [
        "ציוד טכני","אביזרי חשמל","תאורה","גינה","קרניזים",
        "אביזרים לבית","אביזרים למקלחת","צבע וציוד נלווה",
        "מוצרי ניקוי","כלי עבודה","מבצעים",
      ],
    },
    subCategory: { type: String, trim: true },
    price: {
      type: Number,
      required: [true, "product must contain a price"],
      min: [0, "price cannot be negative"],
    },
    subTitle: { type: String, trim: true },
    advantagesList: { type: [String], default: [] },
    image: { type: String },
    colors: { type: [String], default: [] },
    hotProducts: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-assign SKU before saving if not provided
ProductSchema.pre("save", async function (next) {
  if (!this.sku) {
    this.sku = await generateSku();
  }
  next();
});

export default mongoose.model("Product", ProductSchema);
