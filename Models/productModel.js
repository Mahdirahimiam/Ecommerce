import mongoose from "mongoose";
import Variant from "./variantModel";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "اسم محصول الزامی می باشد"],
    trim: true,
  },
  image: {
    type: [String],
    required: [true, "تصویر محصول الزامی می باشد"],
  },
  description: {
    type: String,
    required: [true, "توضیحات محصول الزامی می باشد"],
    trim: true,
  },
  defaultVariant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductVariant",
  },
  variant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
    },
  ],
},{timestamps:true});
const Product=mongoose.model('Product',productSchema)
export default Product;
