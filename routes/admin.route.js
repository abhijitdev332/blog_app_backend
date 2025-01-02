import express from "express";
const router = express.Router();
import asyncWrapper from "../utils/asyncWrapper.js";
import { adminPermit } from "../middleware/adminPermit.js";
import { validateData } from "../middleware/schemaValidation.js";
import {
  updatePostStatusSchema,
  updateUserRoleSchema,
} from "../schemas/adminSchema.js";
import {
  getAdminAllPosts,
  getAllUsers,
  updateUser,
  UpdatePostStatus,
  deleteManyPosts,
} from "../controllers/admin.controller.js";

router.get("/posts", adminPermit, asyncWrapper(getAdminAllPosts));
router.get("/user", adminPermit, asyncWrapper(getAllUsers));
router.put(
  "/user/:id",
  adminPermit,
  validateData(updateUserRoleSchema),
  asyncWrapper(updateUser)
);
router.put(
  "/post/:id",
  adminPermit,
  validateData(updatePostStatusSchema),
  asyncWrapper(UpdatePostStatus)
);
router.delete("/posts", adminPermit, asyncWrapper(deleteManyPosts));

export default router;
