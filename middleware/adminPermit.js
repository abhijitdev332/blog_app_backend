import jwt from "jsonwebtoken";
import { UnauthError } from "../lib/customError.js";

export const adminPermit = (req, res, next) => {
  // verify the jwt token
  verifyToken(req, res, () => {
    if (req?.user?.roles?.includes("admin")) {
      return next();
    } else {
      let authErr = new UnauthError();
      return next(authErr);
    }
  });
  // then verify its admin
};

export const verifyToken = (req, res, next) => {
  // VERIFY TOKEN
  let secret = process.env.jwtSecret;
  let token = req.cookies.token;
  if (token) {
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        let authErr = new UnauthError("Token is invalid");
        return next(authErr);
      } else {
        req.user = data;
        return next();
      }
    });
  } else {
    let authErr = new UnauthError("You are not authenticated!!");
    return next(authErr);
  }

  // your are not autheitceted
};

// session
// export const verifySession = (req, res, next) => {
//   const session = req.session.token;
//   if (session) {
//     req.user = session;
//     next();
//   } else {
//     return res.status(401).json({ message: "you are not authticated" });
//   }
// };
