import { UserModal } from "../models/user.model.js";
import { createToken } from "../lib/createToken.js";
import { ServerError } from "../lib/customError.js";
import { decrypt } from "../lib/encryptPass.js";
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  // check the mail its match with any
  let user = await UserModal.findOne({ email: email });
  if (!user) {
    let userErr = new ServerError("Not found any user on this mail");
    return next(userErr);
  }

  try {
    if (decrypt(password, user?.password)) {
      // let secret = process.env.jwtSecret;
      // let resUser = { ...user._doc };
      // delete password key
      // delete resUser?.password;
      // assign cookie
      // const token = jwt.sign({ ...resUser }, secret);
      const token = createToken(user);
      // setcookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: process.env.NODE_ENV == "production" ? "none" : "",
      });
      return res.status(200).json({ msg: "Login Successfull", data: resUser });
    }
  } catch (err) {
    let passErr = new ServerError("Password don't matched");
    return next(passErr);
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token", {
    path: "/", // Path of the cookie
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: process.env.NODE_ENV == "production" ? "none" : "",
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
