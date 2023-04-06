const { deleteById } = require("../services");

const removeUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await deleteById(userId, req.body);

    res.status(200).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeUser;
