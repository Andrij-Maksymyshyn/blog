const { updateById } = require("../services");

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await updateById(userId, req.body);

    res.status(200).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
