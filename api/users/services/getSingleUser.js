const { User } = require("../../../models");

const getSingleUser = async id => {
  const findedUser = await User.findOne({
    _id: id,
    isDeleted: false
  });

  if (!findedUser) {
    return null;
  }

  return findedUser;
};

module.exports = getSingleUser;
