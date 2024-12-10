import express from "express";
const router = express.Router();

// imports
import asyncWrapper from "../utils/asyncWrapper.js";
import { adminPermit } from "../middleware/adminPermit.js";
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";

router.get("/", adminPermit, asyncWrapper(getAllUser));
router.post("/create", asyncWrapper(createUser));
router.get("/:id", adminPermit, asyncWrapper(getUser));
router.put("/:id", adminPermit, asyncWrapper(updateUser));
router.delete("/:id", asyncWrapper(deleteUser));

export default router;
