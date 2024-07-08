import express from "express";
import { deleteUser, getAllUser, getOneUser, updateUser } from "../Controllers/userCn.js";
const userRouter = express.Router();
userRouter.route("/").get(getAllUser);
userRouter.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);

export default userRouter;
