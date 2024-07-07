import User from "../Models/userModel.js";
import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
import HandleError from "../Utils/handleError.js";
import { sendAuthCode, verifyCode } from "../Utils/smsHandler.js";

export const otp = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  if (!phone) {
    return next(new HandleError("Phone number is required", 400));
  }
  const smsData = await sendAuthCode(phone);
  if (!smsData.success) {
    return next(new HandleError(smsData.message, 500));
  }
  res.status(200).json({
    status: "success",
    message: "SMS code sent successfully",
  });
});
export const checkOtp = catchAsync(async (req, res, next) => {
  const { phone, code } = req.body;
  const smsData = await verifyCode(phone, code);
  if (!smsData.success) {
    return next(new HandleError("invalid code", 404));
  }
  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone, isLogin: true });
  }
  const token = jwt.sign(
    { phone: user.phone, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "4d" }
  );
  return res.status(200).json({
    status: "success",
    message: "otp successfully",
    data: {
      token,
    },
  });
});
