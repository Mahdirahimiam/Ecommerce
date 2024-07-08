import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "نام دسته بندی الزامی است"] },
    image: { type: String, required: [true, "عکس برای دسته بندی الزامی است"] },
    href:{
      type:String,
    },
    subCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
