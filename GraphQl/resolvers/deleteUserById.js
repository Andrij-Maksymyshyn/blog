const { User } = require("../../models");

const deleteUser = async ({ id }) => {
  const removedUser = await User.findById(id);

  if (!removedUser) {
    throw new Error("User Not found!");
  }

  removedUser.isDeleted = true;
  await removedUser.save();

  return removedUser;
};

module.exports = deleteUser;
