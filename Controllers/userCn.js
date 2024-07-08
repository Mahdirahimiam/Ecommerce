import User from "../Models/userModel.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";

export const getAllUser = catchAsync(async (req, res, next) => {
  const userApiFeature = new ApiFeatures(User, req.query)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate()
    .search();
  const users = await userApiFeature.query;
  res.status(200).json({
    status: "success",
    message: "get all User Successfully",
    data: {
      users,
    },
  });
});
export const getOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const oneUser = await User.findById(id).populate();
  res.status(200).json({
    status: "success",
    message: "get one User Successfully",
    data: {
      oneUser,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      success: true,
      message: "update successfully",
    });
  } catch (err) {
    return next(new HandleError("invalid id", 404));
  }
});
export const deleteUser = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (err) {
    return next(new HandleError("invalid id", 404));
  }
});
