import jwt from "jsonwebtoken";

const createToken = (user) => {
  const acceesToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      userName: user?.username,
      roles: user?.roles,
    },
    process.env.jwtSecret
  );
  return acceesToken;
};

export { createToken };
