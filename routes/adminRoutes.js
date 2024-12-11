import express from "express";
const router = express.Router();
import asyncWrapper from "../utils/asyncWrapper.js";
import { adminPermit } from "../middleware/adminPermit.js";
import { getAdminAllPosts } from "../controllers/adminController.js";

router.get("/admin/posts", adminPermit, asyncWrapper(getAdminAllPosts));

export default router;
