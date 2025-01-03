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
  addComment,
  deleteComment,
} from "../controllers/post.controller.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploader } from "../middleware/uploadImage.js";
import { validateData } from "../middleware/schemaValidation.js";
import {
  postCreationSchema,
  postCommentSchema,
  postUpdateSchema,
} from "../schemas/postSchema.js";

router.post(
  "/create",
  verifyToken,
  validateData(postCreationSchema),
  asyncWrapper(createPost)
);
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
router.put(
  "/comment/:id",
  verifyToken,
  validateData(postCommentSchema),
  asyncWrapper(addComment)
);
router.put(
  "/:id",
  verifyToken,
  validateData(postUpdateSchema),
  asyncWrapper(UpdatePost)
);
router.delete("/comment/:id", verifyToken, asyncWrapper(deleteComment));
router.delete("/:id", verifyToken, asyncWrapper(deletePost));

export default router;
