require("dotenv").config();
const JWT = require("jsonwebtoken");

const signJWT = (payload) => {
  return JWT.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

const verifyJWT = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET);
};

const generateRandomToken = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
module.exports = { signJWT, verifyJWT, generateRandomToken };