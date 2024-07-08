import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from "../Controllers/categoryCn.js";
import upload from "../Utils/UploadFile.js";
const categoryRouter = express.Router();

categoryRouter
  .route("/")
  .post(upload.single("file"), createCategory)
  .get(getAllCategory);
categoryRouter
  .route("/:id")
  .get(getOneCategory)
  .patch(upload.single("file"), updateCategory)
  .delete(deleteCategory);
export default categoryRouter;
