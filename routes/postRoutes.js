import express from "express";
const router = express.Router();

// import files
import {
  getPost,
  getAllPublishPosts,
  UpdatePost,
  deletePost,
  getRelatedPost,
  createPost,
  getTrendingPost,
  getUserPosts,
  getSearchPost,
} from "../controllers/postController.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { verifyToken } from "../middleware/adminPermit.js";

router.post("/create", verifyToken, asyncWrapper(createPost));
router.get("/trending", asyncWrapper(getTrendingPost));
router.get("/search", asyncWrapper(getSearchPost));
router.get("/user/:userId", verifyToken, asyncWrapper(getUserPosts));
router.get("/", asyncWrapper(getAllPublishPosts));
router.get("/related/:id", asyncWrapper(getRelatedPost));
router.get("/:id", asyncWrapper(getPost));
router.put("/:id", verifyToken, asyncWrapper(UpdatePost));
router.delete("/:id", verifyToken, asyncWrapper(deletePost));

export default router;
