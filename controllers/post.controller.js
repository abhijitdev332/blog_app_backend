import { postModal } from "../models/post.model.js";
import { ServerError } from "../lib/customError.js";
import { v2 as cloudinary } from "cloudinary";
const createPost = async (req, res, next) => {
  const newPost = new postModal(req.body);
  const savedPost = await newPost.save();
  if (!savedPost) {
    let postErr = new ServerError();
    return next(postErr);
  }
  res.status(201).json({ msg: "Post Created Successfull", data: savedPost });
};
const uploadImage = async (req, res, next) => {
  // not file return it
  if (!req.file) {
    let fileErr = new ServerError("Failed to upload file");
    return next(fileErr);
  }
  // Convert buffer to data URI
  const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
    "base64"
  )}`;

  // Upload to Cloudinary
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "my_uploads",
      resource_type: "auto",
      transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    });
    res.status(200).json({
      msg: "Upload successful",
      imageUrl: uploadResponse.secure_url,
    });
  } catch (err) {
    let uploadErr = new ServerError("Failed to upload image in clodinary");
    next(uploadErr);
  }
};
const getPost = async (req, res, next) => {
  const { id } = req.params;
  const post = await postModal.findById(id).populate("author");
  if (!post) {
    let postErr = new ServerError("Failed to get post!!");
    return next(postErr);
  }
  return res.status(200).json({ msg: "Post fetch successfull", data: post });
};
const getAllPublishPosts = async (req, res) => {
  const { limit = 5, skip = 1 } = req.query;
  let posts = await postModal
    .find({ status: "published" })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate("author");
  if (posts?.length <= 0) {
    return res.status(200).json({ msg: "no posts found!!" });
  }

  res.status(200).json({ msg: "success", data: posts });
};
const getRelatedPost = async (req, res) => {
  const { id } = req.params;

  const posts = await postModal.getRelatedPosts(id);
  if (posts?.length <= 0) {
    return res.status(200).json({ msg: "no post found!!" });
  }
  return res.status(200).json({ msg: "success", data: posts });
};
const UpdatePost = async (req, res) => {
  const { id } = req.params;

  let updatedPost = await postModal.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );
  updatedPost.updatePublish();
  if (!updatedPost) {
    return res.status(500).json({ msg: "failed to update the post!!" });
  }
  res.status(200).json({ msg: "success", data: updatedPost });
};
const addLike = async (req, res) => {
  const { id } = req.params;
  const findPost = await postModal.findById(id);
  findPost.addLike();
  res.status(200).json({ msg: "success", data: findPost });
};
const deletePost = async (req, res) => {
  const { id } = req.params;

  const deletedPost = await postModal.findByIdAndDelete(id);
  if (!deletedPost) {
    return res.status(500).json({ msg: "failed to delete the post!!" });
  }
  res.status(200).json({ msg: "sucess" });
};
const getTrendingPost = async (req, res) => {
  const post = await postModal
    .find({ status: "published" })
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(1);
  if (!post) {
    return res.status(500).json({ msg: "failed to load trending post" });
  }
  res.status(200).json({ msg: "success", data: post });
};
const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  let userPosts = await postModal
    .find({ author: userId })
    .populate("author")
    .sort({ createdAt: -1 });

  if (userPosts.length <= 0) {
    return res.status(200).json({ msg: "No posts found for this user" });
  }

  res.status(200).json({ msg: "success", data: userPosts });
};
const getSearchPost = async (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.status(400).json({ msg: "please provide search string" });
  }
  let posts = await postModal
    .find({
      tags: { $regex: search, $options: "i" },
      status: "published",
    })
    .populate("author");
  if (posts.length <= 0) {
    return res
      .status(200)
      .json({ msg: "No posts found matching the search criteria." });
  }
  res.status(200).json({ msg: "successfull", data: posts });
};

export {
  getPost,
  getAllPublishPosts,
  getRelatedPost,
  UpdatePost,
  deletePost,
  addLike,
  createPost,
  getTrendingPost,
  getUserPosts,
  getSearchPost,
  uploadImage,
};
