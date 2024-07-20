import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";

import HandleError from "./Utils/handleError.js";
import catchError from "./Utils/catchError.js";
import authRouter from "./Routes/auth.js";
import cartRouter from "./Routes/cart.js";
import categoryRouter from "./Routes/category.js";
import commentRouter from "./Routes/comment.js";
import orderHistoryRouter from "./Routes/orderHistory.js";
import productRouter from "./Routes/product.js";
import sliderRouter from "./Routes/slider.js";
import userRouter from "./Routes/user.js";
import discountCodeRouter from "./Routes/discount.js";
import variantRouter from "./Routes/variant.js";
import uploadRouter from "./Routes/upload.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("Public"));
app.use(express.json());
app.use(cors());
app.use('/api/upload',uploadRouter)
app.use('/api/auth',authRouter)
app.use('/api/cart',cartRouter)
app.use('/api/category',categoryRouter)
app.use('/api/comment',commentRouter)
app.use('/api/history',orderHistoryRouter)
app.use('/api/product',productRouter)
app.use('/api/slider',sliderRouter)
app.use('/api/discount',discountCodeRouter)
app.use('/api/user',userRouter)
app.use('/api/variant',variantRouter)

app.use('*',(req,res,next)=>{
    return next(new HandleError('invalid route',404))
})
app.use(catchError)

export default app