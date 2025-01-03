import { postModal } from "../models/post.model.js";
import { UserModal } from "../models/user.model.js";
import { DatabaseError, ServerError } from "../lib/customError.js";

const getAdminAllPosts = async (req, res, next) => {
  const { limit = 0, skip = 0 } = req.query;
  let posts = await postModal
    .find({}, { likes: 0, comments: 0 })
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .populate("author");
  if (posts?.length <= 0) {
    return res.status(200).json({ msg: "No posts found!!" });
  }
  res.status(200).json({ msg: "successfull", data: posts });
};
const UpdatePostStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  let updatedPost = await postModal.findByIdAndUpdate(id, { status });
  if (!updatedPost) {
    let postErr = new DatabaseError("Failed to update the post", 500);
    return next(postErr);
  }
  updatedPost.updatePublish();
  res.status(200).json({ msg: "Post Updated Successfull", data: updatedPost });
};
const getAllUsers = async (req, res, next) => {
  const { limit = 0, skip = 0 } = req.query;
  let allUser = await UserModal.find({})
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  if (!allUser) {
    let userErr = new DatabaseError("Failed to get the users", 500);
    return next(userErr);
  }
  res.status(200).json({ msg: "successfull", data: allUser });
};
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { roles, isActive } = req.body;
  let updatedUser = await UserModal.findByIdAndUpdate(
    id,
    {
      roles,
      isActive,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedUser) {
    let userErr = new DatabaseError("Failed to update user");
    return next(userErr);
  }
  res.status(200).json({ msg: "User Updated successfull" });
};
const deleteManyPosts = async (req, res, next) => {
  const { deleteArr } = req.body;

  const deletedPost = await postModal.deleteMany({
    _id: { $in: [...deleteArr] },
  });
  if (!deletedPost) {
    let postErr = new ServerError("Failed to delete posts!!");
    return next(postErr);
  }
  res.status(200).json({ msg: "Post Delete Successfully" });
};

export {
  getAdminAllPosts,
  getAllUsers,
  updateUser,
  UpdatePostStatus,
  deleteManyPosts,
};
