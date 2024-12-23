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
  uploadImage,
} from "../controllers/post.controller.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { verifyToken } from "../middleware/adminPermit.js";
import { uploader } from "../middleware/uploadImage.js";

router.post("/create", verifyToken, asyncWrapper(createPost));
router.post(
  "/upload",
  verifyToken,
  uploader.single("image"),
  asyncWrapper(uploadImage)
);
router.get("/trending", asyncWrapper(getTrendingPost));
router.get("/search", asyncWrapper(getSearchPost));
router.get("/user/:userId", verifyToken, asyncWrapper(getUserPosts));
router.get("/", asyncWrapper(getAllPublishPosts));
router.get("/related/:id", asyncWrapper(getRelatedPost));
router.get("/:id", asyncWrapper(getPost));
router.put("/:id", verifyToken, asyncWrapper(UpdatePost));
router.delete("/:id", verifyToken, asyncWrapper(deletePost));

export default router;
