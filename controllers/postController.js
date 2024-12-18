import { postModal } from "../models/post.js";
import { v2 as cloudinary } from "cloudinary";
const createPost = async (req, res) => {
  const newPost = new postModal(req.body);
  const savedPost = await newPost.save();

  res.status(201).json({ msg: "success", data: savedPost });
};
const uploadImage = async (req, res) => {
  // not file return it
  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  // Convert buffer to data URI
  const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
    "base64"
  )}`;

  // Upload to Cloudinary
  const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    folder: "my_uploads",
    resource_type: "auto",
    transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
  });
  res.status(200).json({
    msg: "Upload successful",
    imageUrl: uploadResponse.secure_url,
  });
};
const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await postModal.findById(id).populate("author");
  res.status(200).json({ msg: "success", data: post });
};
const getAllPublishPosts = async (req, res) => {
  // const { limit = 5, skip = 0 } = req.params;
  let posts = await postModal.find({ status: "published" }).populate("author");
  res.status(200).json({ msg: "success", data: posts });
};
const getRelatedPost = async (req, res) => {
  const { id } = req.params;

  const posts = await postModal.getRelatedPosts(id);
  res.status(200).json({ msg: "success", data: posts });
};
const UpdatePost = async (req, res) => {
  const { id } = req.params;

  let updatedPost = await postModal.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );
  updatedPost.updatePublish();
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

  const deletePost = await postModal.findByIdAndDelete(id);
  res.status(200).json({ msg: "sucess" });
};
const getTrendingPost = async (req, res) => {
  const post = await postModal
    .find({ status: "published" })
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(1);
  res.status(200).json({ msg: "success", data: post });
};
const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  let userPosts = await postModal
    .find({ author: userId })
    .populate("author")
    .sort({ createdAt: -1 });

  if (!userPosts.length) {
    return res.status(404).json({ msg: "No posts found for this user" });
  }

  res.status(200).json({ msg: "success", data: userPosts });
};
const getSearchPost = async (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.status(400).json({ msg: "please provide search string" });
  }
  let posts = await postModal.find({
    tags: { $regex: search, $options: "i" },
  });
  if (!posts.length) {
    return res
      .status(404)
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
