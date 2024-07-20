import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import User from "../Models/userMd.js";
import jwt from "jsonwebtoken";
import ApiFeatures from "../Utils/apiFeatures.js";
export const getAllUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const users = await features.query;
  return res.status(200).json({
    success: true,
    results: users.length,
    data: users,
  });
});
export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (userId == id || role == "admin" || role == "superAdmin") {
    const user = await User.findById(id).select("-password -__v");
    return res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    return next(new HandleError("شما مجاز به انجام عملیات نیستید", 401));
  }
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role: tokenRole } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (tokenRole == "superAdmin") {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select("-password -__v -usedDiscountCode");
    return res.status(200).json({
      success: true,
      data: user,
      message: "اطلاعات بروزرسانی گردید",
    });
  } else if (tokenRole == "admin" || id == userId) {
    const {usedDiscountCode="", role = "", password = "", ...others } = req.body;

    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
    if (password && !regex.test(password)) {
      return next(
        new HandleError(
          "رمز عبور باید شامل یک حرف بزرگ و یک حرف کوچک یک عدد و یک کاراکتر خاص باشد"
        )
      );
    } else if (password) {
      const newPassword = bcryptjs.hashSync(password, 10);

      const user = await User.findByIdAndUpdate(
        id,
        { password: newPassword, ...others },
        { new: true, runValidators: true }
      ).select("-password -__v");
      return res.status(200).json({
        success: true,
        data: user,
        message: "اطلاعات بروزرسانی گردید",
      });
    }
    const user = await User.findByIdAndUpdate(id, others, {
      new: true,
      runValidators: true,
    }).select("-password -__v");
    return res.status(200).json({
      success: true,
      data: user,
      message: "اطلاعات بروزرسانی گردید",
    });
  } else {
    return next(new HandleError("شما مجاز به انجام عملیات نیستید", 401));
  }
});
