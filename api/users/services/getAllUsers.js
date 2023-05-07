const { User } = require("../../../models");

const getAllUsers = async (query = {}) => {
  const { page = 1, perPage = 3 } = query;
  const skip = (page - 1) * perPage;

  const users = await User.find({ isDeleted: false }, "", {
    skip,
    limit: Number(perPage)
  });

  const total = await User.count();

  return {
    data: users,
    page,
    perPage: perPage,
    total
  };
};

module.exports = getAllUsers;
