import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import User from "../Models/userMd.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { sendAuthCode, verifyCode } from "../Utils/smsHandler.js";
export const auth = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  if (!user || !user.password) {
    await sendAuthCode(phone);
    return res.status(200).json({
      success: true,
      message: "کد تایید با موفقیت ارسال شد",
      isExist: user ? true : false,
    });
  } else {
    return res.status(200).json({
      success: true,
      isExist: true,
    });
  }
});

export const loginWithPassword = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });
  if (!bcryptjs.compareSync(password, user.password)) {
    return next(new HandleError("رمز عبور اشتباه است", 401));
  }
  const token = jwt.sign({ id: user._id, phone: user.phone, role: user.role });
  return res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        role: user.role,
        phone: user.phone,
        cart: user.cart,
        isComplete: user.isComplete,
      },
    },
    message: "ورود یا موفقیت انجام شد",
  });
});

export const sendCode = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  await sendAuthCode(phone);
  return res.status(200).json({
    success: true,
    message: "کد تایید با موفقیت ارسال شد",
  });
});

export const checkOtp = catchAsync(async (req, res, next) => {
  const { phone, code } = req.body;
  const smsResult = await verifyCode(phone, code);
  if (!smsResult.success) {
    return next(new HandleError("کد تایید اشتباه است", 401));
  }
  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone });
  }
  const token = jwt.sign({ id: user._id, phone: user.phone, role: user.role });
  return res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        role: user.role,
        phone: user.phone,
        cart: user.cart,
        isComplete: user.isComplete,
      },
    },
    message: "ورود یا موفقیت انجام شد",
  });
});

export const forgetPassword = catchAsync(async (req, res, next) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  if (!user) {
    return next(new HandleError("کاربری با این شماره یافت نشد", 404));
  } else {
    await sendAuthCode(phone);
    return res.status(200).json({
      success: true,
      message: "کد تایید با موفقیت ارسال شد",
    });
  }
});

export const checkOtpForgetPassword = catchAsync(async (req, res, next) => {
  const { phone, code } = req.body;
  const user = await User.findOne({ phone });
  if (!user) {
    return next(new HandleError("کاربری با این شماره یافت نشد", 404));
  } else {
    const smsResult = await verifyCode(phone, code);
    if (!smsResult.success) {
      return next(new HandleError("کد تایید اشتباه است", 401));
    }

    const token = jwt.sign({
      id: user._id,
      phone: user.phone,
      role: user.role,
      changePassword: true,
    });
    return res.status(200).json({
      success: true,
      data: {
        token,
      },
      message: "کد تایید مطابقت دارد",
    });
  }
});

export const changePassword = catchAsync(async (req, res, next) => {
  try {
    const { password } = req.body;
    const { id, changePassword } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const user = await User.findById(id);
    if (!user) {
      return next(new HandleError("کاربری با این شماره یافت نشد", 404));
    } else if (!changePassword) {
      return next(new HandleError("احراز هویت انجام نشد", 401));
    }
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
    if (!regex.test(password)) {
      return next(
        new HandleError(
          "رمز عبور باید شامل یک حرف بزرگ و یک حرف کوچک یک عدد و یک کاراکتر خاص باشد"
        )
      );
    }
    const newPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.findByIdAndUpdate(
      id,
      { password: newPassword },
      { new: true, runValidators: true }
    );
    const token = jwt.sign({
      id: user._id,
      phone: user.phone,
      role: user.role,
    });
    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          role: newUser.role,
          phone: newUser.phone,
          cart: newUser.cart,
          isComplete: newUser.isComplete,
        },
      },
      message: "ورود یا موفقیت انجام شد",
    });
  } catch (error) {
    return next(new HandleError("احراز هویت انجام نشد", 401));
  }
});
