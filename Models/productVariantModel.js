import mongoose from "mongoose";
const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variant: [{ type: mongoose.Schema.Types.ObjectId, ref: "Variant" }],
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    finalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

productVariantSchema.pre("save", (next) => {
  if (this.discount) {
    this.finalPrice = this.price - this.price * (this.discount / 100);
  }
  next();
});
const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
