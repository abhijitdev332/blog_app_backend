import { UserModal } from "../models/user.js";
export async function createUser(req, res) {
  const { username, email, password } = req.body;
  const user = new UserModal({
    username,
    email,
    password,
  });
  let savedUser = await user.save();
  if (!savedUser) {
    return res.status(500).json({ msg: "something went wrong" });
  }
  let resUser = { ...savedUser._doc };
  delete resUser?.password;
  res.status(201).json({
    msg: "success",
    data: resUser,
  });
}
export async function getUser(req, res) {
  const { id } = req.params;

  const matchedUser = await UserModal.findOne({ _id: id });
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
