import { UserModal } from "../models/user.model.js";
import { appError, ServerError } from "../lib/customError.js";
import { encrypt } from "../lib/encryptPass.js";
export async function createUser(req, res, next) {
  const { username, email, password } = req.body;
  const haveUser = await UserModal.find({ email: email });
  if (haveUser) {
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
    return res.status(500).json({ msg: "server error" });
  }
  res.status(200).json({
    msg: "success",
    data: matchedUser,
  });
}
export async function updateUser(req, res) {
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
    return res.status(500).json({ msg: "server error!!Failed to update user" });
  }

  res.status(200).json({
    msg: "success",
    data: updatedUser,
  });
}
export async function deleteUser(req, res) {
  const { id } = req.params;

  const deletedUser = await UserModal.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(500).json({ msg: "something went wrong please retry" });
  }
  res.status(200).json({
    msg: "success",
  });
}
