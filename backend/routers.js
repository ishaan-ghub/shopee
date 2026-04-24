import "./config.js";
import express from "express";
import cors from "cors";
import router from "./userRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("app is now running");
});
