import { UserModal } from "../models/user.js";
export async function getAllUser(req, res) {
  const allUser = await UserModal.find();
  res.json({
    status: "success",
    code: 200,
    data: [...allUser],
  });
}
export async function createUser(req, res) {
  const { username, email, password, roles, isActive } = req.body;
  const user = new UserModal({
    username,
    email,
    password,
    roles,
    isActive,
  });
  let savedUser = await user.save();

  res
    .json({
      status: "success",
      code: 201,
      user: savedUser,
    })
    .status(201);
}

export async function getUser(req, res) {
  const { id } = req.params;

  const matchedUser = await UserModal.findOne({ _id: id });

  res.json({
    status: "success",
    code: 200,
    user: matchedUser,
  });
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const updates = req.body;

  const updatedUser = await UserModal.findByIdAndUpdate(
    id,
    { ...updates },
    {
      new: true,
      runValidators: true,
    }
  );

  res.json({
    status: "success",
    code: 200,
    user: updatedUser,
  });
}
export async function deleteUser(req, res) {
  const { id } = req.params;

  const deletedUser = await UserModal.findByIdAndDelete(id);

  res.json({
    status: "success",
    code: 204,
  });
}
