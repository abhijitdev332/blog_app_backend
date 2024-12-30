import { UserModal } from "../models/user.model.js";
import { createToken } from "../lib/createToken.js";
import { ServerError, AppError } from "../lib/customError.js";
import { decrypt } from "../lib/encryptPass.js";
import { logMessage, errorLogger } from "../utils/logger.js";
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  // check the mail its match with any
  let user = await UserModal.findOne({ email: email });
  if (!user) {
    logMessage(errorLogger, "No user found on this Email", { email });
    return res.status(404).json({
      msg: "Not found any user on this Email",
    });
  }

  try {
    let passCheck = await decrypt(password, user?.password);
    if (!passCheck) {
      let passErr = new AppError("Password don't matched", 400);
      return res.status(passErr.statusCode).json({
        msg: passErr.msg,
      });
    }
    // let secret = process.env.jwtSecret;
    let resUser = { ...user._doc };
    // delete password key
    delete resUser?.password;
    // assign cookie
    const token = createToken(user);
    // setcookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "",
    });
    res.status(200).json({ msg: "Login Successfull", data: resUser });
  } catch (err) {
    let passErr = new ServerError("Failed to login!!", 500);
    next(passErr);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      path: "/", // Path of the cookie
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "",
    });
    res.status(200).json({ msg: "logout succesfull" });
  } catch (err) {
    let logoutErr = new ServerError("Failed to logout!!");
    next(logoutErr);
  }
};
