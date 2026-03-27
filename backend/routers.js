import express from "express";
import cors from "cors";
import router from "./userRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(6060, () => {
  console.log("app is now running");
});
