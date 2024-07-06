import mongoose from "mongoose";
const orderHistorySchema = new mongoose.Schema({
  items: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentStatus: {
    type: String,
    enum: ["success", "failed"],
  },
  totalPrice: { type: Number },
},{timestamps:true});
const orderHistory=mongoose.model('orderHistory',orderHistorySchema)
export default orderHistory
