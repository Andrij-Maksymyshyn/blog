const { Unauthorized } = require("../../../errors/ApiError");
const { verifyToken } = require("../../../services");
const { Oauth } = require("../../../models");

const isAuth = async (req, _, next) => {
  try {
    const accessToken = req.get("Authorization");

    if (!accessToken) {
      throw new Unauthorized("No token. Please, sign in");
    }

    verifyToken(accessToken, "accessToken");

    const tokenWithUser = await Oauth.findOne({ accessToken });

    if (!tokenWithUser) {
      throw new Unauthorized("Invalid token");
    }

    req.user = tokenWithUser?.user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
