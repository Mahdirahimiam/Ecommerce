import mongoose from "mongoose";
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
},{timestamps:true})


const Category=mongoose.model('Category',categorySchema)
export default Category