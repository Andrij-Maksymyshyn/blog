const { User } = require("../../../models");

const updateById = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

  if (!updatedUser) {
    return null;
  }

  return updatedUser;
};

module.exports = updateById;
