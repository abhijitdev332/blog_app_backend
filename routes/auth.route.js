import express from "express";
const router = express.Router();

// IMPORT CONTROLLERS
import asyncWrapper from "../utils/asyncWrapper.js";
import { login, logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.post("/login", asyncWrapper(login));
router.post("/logout", verifyToken, asyncWrapper(logout));

export default router;
