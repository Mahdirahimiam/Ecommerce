import Slider from "../Models/sliderModel.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import fs from "fs";
import { __dirname } from "../app.js";
import HandleError from "../Utils/handleError.js";
export const createSlider = catchAsync(async (req, res, next) => {
  const image = req?.file?.filename;
  const newSlider = await Slider.create({ ...req.body, image });
  return res.status(200).json({
    success: "success",
    data: newSlider,
  });
});
export const getAllSlider = catchAsync(async (req, res, next) => {
  const sliderApiFeature = new ApiFeatures(Slider, req.query)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate()
    .search();
  const slider = await sliderApiFeature.query;
  res.status(200).json({
    status: "success",
    message: "get all User Successfully",
    data: {
      slider,
    },
  });
});
export const getOneSlider = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slider = await Slider.findById(id);
  if (!slider) {
    return res
      .status(404)
      .json({ status: "fail", message: "slider not found" });
  }
  return res.status(200).json({
    status: "success",
    message: "slider found",
    data: {
      slider,
    },
  });
});
export const updateSlider = catchAsync(async (req, res, next) => {
  try {
    let slider;
    const { id } = req.params;
    const oldSlider = await Slider.findById(id);
    const image = req?.file?.filename || oldSlider?.image;
    if (req?.body?.image == "deleted") {
      fs.unlinkSync(__dirname + "/public/" + oldSlider.image);
      slider = await Slider.findByIdAndUpdate(
        id,
        { ...req.body, image },
        { new: true, runValidators: true }
      );
    } else {
      if (req?.file?.filename  && oldSlider.image) {
        fs.unlinkSync(__dirname + "/public/" + oldSlider.image);
      }
      slider = await Slider.findByIdAndUpdate(
        id,
        { ...req.body, image },
        { new: true, runValidators: true }
      );
    }
    return res.status(200).json({
      success: "success",
      data: slider,
    });
  } catch (err) {
    return next(new HandleError("invalid id", 404));
  }
});
export const deleteSlider = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const slider = await Slider.findByIdAndDelete(id);
    if (slider.image) {
      fs.unlinkSync(__dirname + "/public/" + slider.image);
    }
    return res.status(200).json({
      success: "success",
      message: "delete successfully",
    });
  } catch (err) {
    return next(new HandleError("invalid id", 404));
  }
});
