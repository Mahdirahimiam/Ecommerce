import Category from "../Models/categoryModel.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import fs from "fs";
import { __dirname } from "../app.js";
import HandleError from "../Utils/handleError.js";
export const createCategory = catchAsync(async (req, res, next) => {
  const image = req?.file?.filename;
  const newCategory = await Category.create({ ...req.body, image });
  return res.status(201).json({ status: "success", data: newCategory });
});

export const getAllCategory = catchAsync(async (req, res, next) => {
  const categoryApiFeature = new ApiFeatures(Category, req.query)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate()
    .search();
  const category = await categoryApiFeature.query;
  return res.status(200).json({ status: "success", data: category });
});
export const getOneCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("subCategory");
  if (!category) return next(new Error("Category not found", 404));
  return res.status(200).json({ status: "success", data: category });
});
export const updateCategory = catchAsync(async (req, res, next) => {
  try {
    let category;
    const { id } = req.params;
    const oldCategory = await Category.findById(id);
    const image = req?.file?.filename || oldCategory?.image;
    if (req?.body?.image == "deleted") {
      fs.unlinkSync(__dirname + "/public/" + oldCategory.image);
      category = await Category.findByIdAndUpdate(
        id,
        { ...req.body, image },
        { new: true, runValidators: true }
      );
    } else {
      if (req?.file?.filename && oldCategory.image) {
        fs.unlinkSync(__dirname + "/public/" + oldCategory.image);
      }
      category = await Category.findByIdAndUpdate(
        id,
        { ...req.body, image },
        { new: true, runValidators: true }
      );
    }
    return res.status(201).json({
      status: "success",
      message: "category update successfully",
      data: category,
    });
  } catch (err) {
    return next(new HandleError("invalid id", 404));
  }
});
export const deleteCategory = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (category.image) {
      fs.unlinkSync(__dirname + "/public/" + category.image);
    }
    return res.status(200).json({
      status: "success",
      message: "deleted category successfully",
    });
  } catch (err) {
    return next(new HandleError("invalid id", 404));
  }
});
