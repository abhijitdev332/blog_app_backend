import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  console.log("toekn", token);
  if (token) {
    // const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "token is invalid" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(403).json({ message: "you are not authticated" });
  }
}

function verifyAuthAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role.includes("admin")) {
      next();
    } else {
      res.status(402).json({ message: "you are not allowed" });
    }
  });
}
function verifyAuthAndUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role.includes("admin")) {
      next();
    } else {
      res.status(402).json({ message: "you are not allowed" });
    }
  });
}

// export {
//   createAccessToken,
//   verifyAuthAndAdmin,
//   verifyAuthAndUser,
//   verifyToken,
// };

// import { UnauthError } from "../lib/customError.js";

const verifypermission = (req, res, next) => {
  const { rules } = req.body;
  let rulesArr = rules.split(",") || [];

  if (rulesArr.length > 0 && rulesArr.includes("write")) {
    next();
  } else {
    const err = new UnauthError("you don't have permission ", 401);
    next(err);
  }
};
const adminPermit = (req, res, next) => {
  req.user = 1;
  return next();
};

export { verifypermission, adminPermit };
