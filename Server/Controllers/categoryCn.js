import catchAsync from "../Utils/catchAsync.js";
import Category from "../Models/categoryMd.js";
import Product from "../Models/productMd.js";
import { __dirname } from "../app.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import fs from 'fs'
export const getAllCategory = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const categories = await features.query;
  return res.status(200).json({
    success: true,
    data: categories,
  });
});
export const getCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.status(200).json({
    success: true,
    data: category,
  });
});

export const updateCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {new:true,runValidators:true})
    return res.status(200).json({
        success: true,
        data: category,
        message:'دسته بندی بروزرسانی گردید'

      });
});

export const createCategory = catchAsync(async (req, res, next) => {
    const category = await Category.create( req.body)
    return res.status(200).json({
        success: true,
        data: category,
        message:'دسته بندی ایجاد گردید'
      });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id)
    
    fs.unlinkSync(`${__dirname}/Public/${category.image}`)
    await Product.updateMany({categoryId:id},{$set:{categoryId:''}})
    return res.status(200).json({
        success: true,
        message:'دسته بندی حذف شد'
      });
});
