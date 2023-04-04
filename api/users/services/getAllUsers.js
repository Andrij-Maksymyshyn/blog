const { User } = require("../../../models");
const { BadRequest } = require("../../../errors/ApiError");

const getAllUsers = async (query = {}) => {
  const { page = 1, perPage = 3 } = query;
  const skip = (page - 1) * perPage;

  const users = await User.find().limit(perPage).skip(skip);
  const total = await User.count();

  if (users.length === 0) {
    throw new BadRequest(
      `There isn't data with page: ${page} and perPage: ${perPage}`
    );
  }

  return {
    data: users,
    page,
    perPage: Number(perPage),
    total
  };
};

module.exports = getAllUsers;
