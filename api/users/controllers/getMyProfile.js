const { getByParams } = require("../../posts/services");

const getMyProfile = async (req, res, next) => {
  try {
    const posts = await getByParams({ user: req.user.toObject()?._id });

    res.status(200).json({
      ...req.user.toObject(),
      posts
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getMyProfile;
