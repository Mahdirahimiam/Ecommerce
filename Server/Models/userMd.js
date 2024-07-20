import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    default: 0,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      productVariantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true,
      }
    },
  ],
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  nationalId: {
    type: String,
    match: [/^[0-9]{10}$/g, "کد ملی معتبر نمی باشد"],
  },
  email: {
    type: String,
    match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, "ایمیل معتبر نمی باشد"],
  },
  phone: {
    required: [true, "شماره همراه الزامی می باشد"],
    unique: [true, "شماره همراه تکراری است"],
    type: String,
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
      "شماره همراه صحیح نمی باشد",
    ],
  },
  password: {
    type: String,
  },
  recentlyProduct: {
    type: Array,
    default: [],
  },
  usedDiscountCode: {
    type: Array,
    default: [],
  },
  favoriteProduct: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superAdmin"],
  },
  cart:cartSchema
},{timestamps:true});


const User=mongoose.model('User',userSchema)
export default User