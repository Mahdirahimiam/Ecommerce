import mongoose from "mongoose";
const variantSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "مدل الزامی می باشد"],
    enum: ["color", "size"],
  },
  value: {
    type: String,
    required: [true, "مقدار الزامی می باشد"],
  },
},{timestamps:true});
const Variant=mongoose.model('Variant',variantSchema)
export default Variant;