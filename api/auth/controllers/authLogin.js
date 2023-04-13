const { createOauthPair } = require("../services");
const {
  checkPasswords,
  generateAccessTokenPair
} = require("../../../services");

const loginUser = async (req, res, next) => {
  try {
    const user = req.locals.user;

    await checkPasswords(user.password, req.body.password);
    const tokenPair = generateAccessTokenPair({ ...user?._id });

    await createOauthPair({ ...tokenPair, user: user._id });
    res.json({ ...tokenPair, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = loginUser;
