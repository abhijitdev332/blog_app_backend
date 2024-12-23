import express from "express";
const router = express.Router();
import asyncWrapper from "../utils/asyncWrapper.js";
import { adminPermit } from "../middleware/adminPermit.js";
import {
  getAdminAllPosts,
  getAllUsers,
  updateUser,
  UpdatePostStatus,
} from "../controllers/admin.controller.js";

router.get("/posts", adminPermit, asyncWrapper(getAdminAllPosts));
router.get("/user", adminPermit, asyncWrapper(getAllUsers));
router.put("/user/:id", adminPermit, asyncWrapper(updateUser));
router.put("/post/:id", adminPermit, asyncWrapper(UpdatePostStatus));

export default router;
