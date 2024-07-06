import mongoose from "mongoose";
const discountCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "کد الزامی می باشد"],
    unique: [true, "کد تکراری می باشد"],
  },
  name: {
    type: String,
    required: [true, "عنوان کد تخفیف الزامی می باشد"],
  },
  discount: {
    type: Number,
    required: [true, "مقدار تخفیف الزامی می باشد"],
    min: 0,
    max: 100,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
},{timestamps:true});
const Discount = mongoose.model("Discount", discountCodeSchema);
export default Discount;
