import catchAsync from "../Utils/catchAsync.js";
import jwt from "jsonwebtoken";
import HandleError from "../Utils/handleError.js";
const isAdmin = catchAsync(async (req, res, next) => {
  try {
    const { role } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (role !== "admin")
      return next(new HandleError(403, "You are not an admin!"));
    return next();
  } catch (err) {
    return next(new HandleError("you dnot`t have permission", 401));
  }
});

export default isAdmin;
