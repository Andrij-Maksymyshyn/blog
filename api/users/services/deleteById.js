const { User } = require("../../../models");

const deleteById = async (id, dataField) => {
  const deletedUser = await User.findByIdAndUpdate(id, dataField, {
    new: true
  });

  if (!deletedUser) {
    return null;
  }

  return deletedUser;
};

module.exports = deleteById;
