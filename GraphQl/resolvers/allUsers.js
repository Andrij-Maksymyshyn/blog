const { User } = require("../../models");

const users = async ({ skip, limit }) => {
  const usersArray = await User.find({ isDeleted: false }, "", {
    skip,
    limit
  });

  if (!usersArray) {
    return null;
  }

  return usersArray;
};

module.exports = users;
