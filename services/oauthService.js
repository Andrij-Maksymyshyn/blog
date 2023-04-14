const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { BadRequest } = require("../errors/ApiError");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const hashPassword = password => bcrypt.hash(password, 10);

const checkPasswords = async (hashedPassword = "", password = "") => {
  const isPasswordEquals = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordEquals) {
    throw new BadRequest("Email or password is wrong");
  }
};

const generateAccessTokenPair = (encodeData = {}) => {
  const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, {
    expiresIn: "2h"
  });

  const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d"
  });

  return {
    accessToken,
    refreshToken
  };
};

const verifyToken = (token = "", tokenType = "") => {
  switch (tokenType) {
    case "accessToken":
      tokenType = ACCESS_TOKEN_SECRET;
      break;

    case "refreshToken":
      tokenType = REFRESH_TOKEN_SECRET;
      break;

    default:
      throw new BadRequest(error.message || "Invalid token (signature)");
  }

  return jwt.verify(token, tokenType);
};

module.exports = {
  hashPassword,
  checkPasswords,
  generateAccessTokenPair,
  verifyToken
};
