import express from "express";
const router = express.Router();

// imports
import asyncWrapper from "../utils/asyncWrapper.js";
import { verifyToken } from "../middleware/adminPermit.js";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

router.post("/create", asyncWrapper(createUser));
router.get("/:id", verifyToken, asyncWrapper(getUser));
router.put("/:id", verifyToken, asyncWrapper(updateUser));
router.delete("/:id", verifyToken, asyncWrapper(deleteUser));

export default router;
