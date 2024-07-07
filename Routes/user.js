import express from "express";
import { getAllUser, getOneUser } from "../Controllers/userCn.js";
const userRouter = express.Router();
userRouter.route("/").get(getAllUser);
userRouter.route("/:id").get(getOneUser);

export default userRouter;
