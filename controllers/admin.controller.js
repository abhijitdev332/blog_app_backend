import { postModal } from "../models/post.model.js";
import { UserModal } from "../models/user.model.js";
import { ServerError } from "../lib/customError.js";

const getAdminAllPosts = async (req, res) => {
  let posts = await postModal.find({}).populate("author");
  if (posts?.length <= 0) {
    return res.status(200).json({ msg: "No posts found!!" });
  }
  res.status(200).json({ msg: "successfull", data: posts });
};
const UpdatePostStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  let updatedPost = await postModal.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  if (!updatedPost) {
    let postErr = new ServerError();
    return next(postErr);
  }
  updatedPost.updatePublish();
  res.status(200).json({ msg: "Post Updated Successfull", data: updatedPost });
};

const getAllUsers = async (req, res, next) => {
  const { limit = 0, skip = 0 } = req.params;
  let allUser = await UserModal.find({}).limit(limit).skip(skip);
  if (!allUser) {
    let userErr = new ServerError();
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
    let userErr = new ServerError();
    return next(userErr);
  }
  res.status(200).json({ msg: "User Updated successfull" });
};

export { getAdminAllPosts, getAllUsers, updateUser, UpdatePostStatus };
