import { UserModal } from "../models/user.js";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  const { email, password } = req.body;
  // check the mail its match with any
  let user = await UserModal.findOne({ email: email });
  if (!user) {
    return res.status(402).json({ msg: "Please enter correct mail" });
  }
  if (user?.password == password) {
    let secret = process.env.jwtSecret;
    let resUser = { ...user._doc };
    // delete password key
    delete resUser?.password;
    // assign cookie
    const token = jwt.sign({ ...resUser }, secret);
    // setcookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ msg: "success", data: resUser });
  } else {
    return res.json({ msg: "password don't match" });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token", {
    path: "/", // Path of the cookie
    httpOnly: true,
    secure: true, // Use true in production
    sameSite: "none", // Adjust based on your requirements
  });
  res.status(200).json({ msg: "logout succesfull" });
  // session
  // req.session.destroy((err) => {
  //   if (err) {
  //     console.error("Error destroying session:", err);
  //     return res.status(500).json({ msg: "Failed to log out" });
  //   }

  //   // Log for debugging purposes
  //   console.log("Session destroyed");

  //   // Clear the cookie
  //   res.clearCookie("connect.sid", {
  //     path: "/", // Path of the cookie
  //     httpOnly: true,
  //     secure: false, // Use true in production
  //     // sameSite: "None", // Adjust based on your requirements
  //   });

  //   // Send success response
  //   res.status(200).json({ msg: "Logout successful" });
  // });
};
