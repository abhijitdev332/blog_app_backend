import express from "express";
const app = express();
import globalError from "./utils/globalErrorHandler.js";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
// import
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { allowOrigins } from "./config/config.js";
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
// express session
// app.use(
//   session({
//     secret: process.env.jwtSecret, // Replace with a secure key
//     resave: false, // Avoid resaving session if unmodified
//     saveUninitialized: true, // Save uninitialized sessions
//     cookie: {
//       secure: false, // Use true in production with HTTPS
//       httpOnly: true,
//       // sameSite: "None", // Ensure these match
//       maxAge: 3600000, // 1 hour
//     },
//   })
// );
app.use(cookie());

app.get("/", (req, res, next) => {
  res.json("this is response");
});
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/admin", adminRoutes);

app.use("/*", globalError);

export default app;
