import { UserModal } from "../models/user.model.js";
import { postModal } from "../models/post.model.js";
import { AppError, DatabaseError } from "../lib/customError.js";
import { encrypt } from "../lib/encryptPass.js";
export async function createUser(req, res, next) {
  const { username, email, password } = req.body;
  const haveUser = await UserModal.find({ email: email });
  if (haveUser.length > 0) {
    let userErr = new AppError("Email already in use!!", 400);
    return next(userErr);
  }
  let encryptPass = await encrypt(password);
  const user = new UserModal({
    username,
    email,
    password: encryptPass,
  });
  let savedUser = await user.save();
  if (!savedUser) {
    let userErr = new DatabaseError("Failed to create user!!");
    return next(userErr);
  }
  let resUser = { ...savedUser._doc };
  delete resUser?.password;
  return res.status(201).json({
    msg: "User Created Successfully",
    data: resUser,
  });
}
export async function getUser(req, res, next) {
  const { id } = req.params;

  const matchedUser = await UserModal.findOne({ _id: id }, { password: 0 });
  if (!matchedUser) {
    let userErr = new AppError("can't find any user", 400);
    return next(userErr);
  }

  return res.status(200).json({
    msg: "successfull",
    data: matchedUser,
  });
}
export async function updateUser(req, res, next) {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const updatedUser = await UserModal.findByIdAndUpdate(
    id,
    { username, email, password },
    {
      runValidators: true,
    }
  );
  if (!updatedUser) {
    let serverErr = new DatabaseError("Failed to update user!!");
    return next(serverErr);
  }

  res.status(200).json({
    msg: "User updated Successfully",
    data: updatedUser,
  });
}
export async function deleteUser(req, res, next) {
  const { id } = req.params;

  const userPosts = await postModal.find({ author: id });
  if (userPosts?.length > 0) {
    return res.status(400).json({
      msg: "Can't Delete User Linked to Posts",
    });
  }
  const deletedUser = await UserModal.findByIdAndDelete(id);
  if (!deletedUser) {
    let serverErr = new DatabaseError("failed to delete user!!");
    return next(serverErr);
  }
  res.status(200).json({
    msg: "User deleted successfully",
  });
}
