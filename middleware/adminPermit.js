import jwt from "jsonwebtoken";

export const adminPermit = (req, res, next) => {
  // verify the jwt token
  verifyToken(req, res, () => {
    if (req?.user?.roles?.includes("admin")) {
      return next();
    } else {
      return res.status(401).json({ msg: "you are not authenticated " });
    }
  });
  // then verify its admin
};

export const verifyToken = (req, res, next) => {
  // VERIFY TOKEN
  let secret = process.env.jwtSecret;
  let token = req.cookies.token;
  // console.log(req.cookies);
  // const session = req.session.token;
  if (token) {
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        console.log("err");
        return res.status(403).json({ message: "token is invalid" });
      } else {
        req.user = data;
        return next();
      }
    });
  } else {
    return res.status(401).json({ message: "you are not authticated" });
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
