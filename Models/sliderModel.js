import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: [true, "عکس الزامی می باشد"],
  },
  href:{
    type:String,
  }
},{timestamps:true});
 const Slider = mongoose.model("Slider", sliderSchema);
 export default Slider;
