import bcrypt from "bcryptjs";
import CustomError from "./customError.js";

const encrypt = async (pass) => {
  try {
    const hashedPass = await bcrypt.hash(pass, 12);
    return hashedPass;
  } catch (err) {
    let passErr = new CustomError(err.message, 400);
    return passErr;
  }
};

const decrypt = async (userPass, DBPass) => {
  try {
    const hashedPass = await bcrypt.compare(userPass, DBPass);
    return hashedPass;
  } catch (err) {
    let passErr = new CustomError(err.message, 400);
    return passErr;
  }
};

export { encrypt, decrypt };
