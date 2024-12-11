import express from "express";
const router = express.Router();

// import files
import {
  getPost,
  getAllPosts,
  UpdatePost,
  deletePost,
  getRelatedPost,
  createPost,
  getTrendingPost,
  getUserPosts,
} from "../controllers/postController.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { verifyToken } from "../middleware/adminPermit.js";

router.post("/create", verifyToken, asyncWrapper(createPost));
router.get("/trending", asyncWrapper(getTrendingPost));
router.get("/user/:userId", verifyToken, asyncWrapper(getUserPosts));
router.get("/", asyncWrapper(getAllPosts));
router.get("/related/:id", asyncWrapper(getRelatedPost));
router.get("/:id", asyncWrapper(getPost));
router.put("/:id", verifyToken, asyncWrapper(UpdatePost));
router.delete("/:id", verifyToken, asyncWrapper(deletePost));

export default router;
