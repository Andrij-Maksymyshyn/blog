const { User } = require("../../../models");

const allUsers = async () => {
  const users = await User.find();
  return {
    users: users.map(q => {
      return {
        ...q._doc,
        _id: q._id.toString()
      };
    })
  };
};
////////////

module.exports = allUsers;
