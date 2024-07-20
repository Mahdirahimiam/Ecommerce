import express from 'express'
import { auth, changePassword, checkOtp, checkOtpForgetPassword, forgetPassword, loginWithPassword, sendCode } from '../Controllers/authCn.js'

const authRouter=express.Router()
authRouter.route('/').post(auth)
authRouter.route('/login-password').post(loginWithPassword)
authRouter.route('/send-code').post(sendCode)
authRouter.route('/check-otp').post(checkOtp)
authRouter.route('/forget').post(forgetPassword)
authRouter.route('/forget-check').post(checkOtpForgetPassword)
authRouter.route('/change-password').patch(changePassword)


export default authRouter