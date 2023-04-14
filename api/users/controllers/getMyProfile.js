const getMyProfile = (req, res, next) => {
  try {
    const { fullName } = req.user.toObject();

    res.status(200).json({
      ...req.user.toObject(),
      message: `Welcome dear, ${fullName}`
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getMyProfile;
