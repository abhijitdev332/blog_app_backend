import express from "express";
const app = express();
import globalError from "./utils/globalErrorHandler.js";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
// import
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import adminRoutes from "./routes/admin.route.js";
import { allowOrigins } from "./config/config.js";
import { configureCloudinary } from "./config/cloudinay.js";
dotenv.config();
app.use(
  cors({
    credentials: true,
    origin: allowOrigins,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    xPoweredBy: false,
  })
);
app.use(cookie());
configureCloudinary();
app.get("/", (req, res) => {
  res.json("this is reponse from backend");
});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/admin", adminRoutes);

app.use("*", globalError);

export default app;
