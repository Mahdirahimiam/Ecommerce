import express from 'express'
import isAdmin from '../Middleware/isAdmin.js'
import { getAllUser, getUser, updateUser } from '../Controllers/userCn.js'
import isLogin from '../Middleware/isLogin.js'

const userRouter=express.Router()
userRouter.route('/').get(isAdmin,getAllUser)
userRouter.route('/:id').get(isLogin,getUser).patch(isLogin,updateUser)


export default userRouter