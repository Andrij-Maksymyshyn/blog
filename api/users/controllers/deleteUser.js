const { getSingleUser } = require("../services");

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await getSingleUser(userId);
    deletedUser.isDeleted = true;
    await deletedUser.save();

    res
      .status(200)
      .json({ message: `User with id: ${userId} has successfully deleted.` });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUser;
