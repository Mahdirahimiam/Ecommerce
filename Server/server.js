import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { __dirname } from "./app.js";
dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DATABASE IS CONNECTED"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server is running on port ${port}`));
