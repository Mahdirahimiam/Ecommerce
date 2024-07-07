import express from "express";
import {  checkOtp, otp } from "../Controllers/authCn.js";
const authRouter = express.Router();
authRouter.route('/').post(otp)
authRouter.route('/otp').post(checkOtp)







export default authRouter