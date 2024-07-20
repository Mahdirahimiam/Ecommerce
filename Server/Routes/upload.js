import express from "express";
import upload from "../Utils/UploadFile.js";
import { deleteFile, uploadFile } from "../Controllers/uploadCn.js";
import isAdmin from "../Middleware/isAdmin.js";
const uploadRouter = express.Router();
uploadRouter
  .route("/")
  .post(isAdmin, upload.single("file"), uploadFile)
  .delete(isAdmin, deleteFile);
export default uploadRouter;
