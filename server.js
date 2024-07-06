import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("DATABASE IS CONNECT");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is run`);
});
