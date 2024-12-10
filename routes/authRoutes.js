import express from "express";
const router = express.Router();

// IMPORT CONTROLLERS
import asyncWrapper from "../utils/asyncWrapper.js";
import { login, logout } from "../controllers/authController.js";
import { verifyToken } from "../middleware/adminPermit.js";

router.post("/login", asyncWrapper(login));
router.post("/logout", verifyToken, asyncWrapper(logout));

export default router;
