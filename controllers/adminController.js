import { postModal } from "../models/post.js";
import { UserModal } from "../models/user.js";

const getAdminAllPosts = async (req, res) => {
  let posts = await postModal.find({}).populate("author");

  if (posts?.length <= 0) {
    return res.status(200).json({ msg: "No posts found for this user" });
  }
  res.status(200).json({ msg: "successfull", data: posts });
};
const UpdatePostStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  let updatedPost = await postModal.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  updatedPost.updatePublish();
  res.status(200).json({ msg: "success", data: updatedPost });
};

const getAllUsers = async (req, res) => {
  const { limit = 20, skip = 0 } = req.params;
  let allUser = await UserModal.find({}).limit(limit).skip(skip);
  if (!allUser) {
    return res.status(500).json({ msg: "server error" });
  }
  res.status(200).json({ msg: "successfull", data: allUser });
};
const updateUser = async (req, res) => {
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
    return res.status(500).json({ msg: "server error" });
  }
  res.status(200).json({ msg: "successfull" });
};

export { getAdminAllPosts, getAllUsers, updateUser, UpdatePostStatus };
