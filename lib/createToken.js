import jwt from "jsonwebtoken";

const createToken = (user) => {
  const acceesToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user?.username,
    },
    process.env.jwtSecret
  );
  return acceesToken;
};

export { createToken };
