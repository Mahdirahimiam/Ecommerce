import express from "express";
import {
  createSlider,
  deleteSlider,
  getAllSlider,
  getOneSlider,
  updateSlider,
} from "../Controllers/sliderCn.js";
import upload from "../Utils/UploadFile.js";
const sliderRouter = express.Router();

sliderRouter
  .route("/")
  .get(getAllSlider)
  .post(upload.single("file"), createSlider);
sliderRouter
  .route("/:id")
  .get(getOneSlider)
  .patch(upload.single("file"), updateSlider)
  .delete(deleteSlider);
export default sliderRouter;
