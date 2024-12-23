import { UserModal } from "../models/user.model.js";
import { appError, ServerError } from "../lib/customError.js";
import { encrypt } from "../lib/encryptPass.js";
export async function createUser(req, res, next) {
  const { username, email, password } = req.body;
  const haveUser = await UserModal.find({ email: email });
  if (haveUser.length > 0) {
    let userErr = new appError("Email already in use!!");
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
    let userErr = new ServerError();
    return next(userErr);
  }
  let resUser = { ...savedUser._doc };
  delete resUser?.password;
  return res.status(201).json({
    msg: "User Created Successfully",
    data: resUser,
  });
}
export async function getUser(req, res) {
  const { id } = req.params;

  const matchedUser = await UserModal.findOne({ _id: id });
  if (!matchedUser) {
    let userErr = new appError("can't find any user");
    return next(userErr);
  }
  let resUser = { ...matchedUser._doc };
  delete resUser?.password;
  return res.status(200).json({
    msg: "successfull",
    data: resUser,
  });
}
export async function updateUser(req, res, next) {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const updatedUser = await UserModal.findByIdAndUpdate(
    id,
    { username, email, password },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedUser) {
    let serverErr = new ServerError("Failed to update user");
    return next(serverErr);
  }

  res.status(200).json({
    msg: "User updated Successfully",
    data: updatedUser,
  });
}
export async function deleteUser(req, res) {
  const { id } = req.params;

  const deletedUser = await UserModal.findByIdAndDelete(id);
  if (!deletedUser) {
    let serverErr = new ServerError("failed to delete user!!");
    return next(serverErr);
  }
  res.status(200).json({
    msg: "user deleted successfully",
  });
}
