import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
  address: { type: String, required: [true, "address is required"] },
  city: { type: String, required: [true, "city is required"] },
  state: { type: String, required: [true, "state is required"] },
  country: { type: String, required: [true, "country is required"] },
  postalCode: { type: Number, required: [true, "postalCode is required"] },
});
const cartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  items: {
    type: [
      {
        productVariant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductVariant",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },
});
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "شماره تلفن الزامی می باشد"],
      trim: true,
      match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm,
    },
    nationalCode: {
      type: String,
      trim: true,
      match: /^\d{10}$/gm,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      trim: true,
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm,
    },
    dataUser: {
      type: Boolean,
      default: false,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    address: { type: addressSchema },
    cart: { type: cartSchema },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
