const { hashPassword } = require("../../../services");
const { User } = require("../../../models");

const addUser = async userObject => {
  const password = hashPassword(userObject.password);

  const newUser = await User.create({
    ...userObject,
    password
  });

  return newUser;
};

module.exports = addUser;
