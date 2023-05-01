const { hashPassword } = require("../../../services");
const { User } = require("../../../models");

const addUser = async userObject => {
  const password = await hashPassword(userObject.password);

  const newUser = User.create({
    ...userObject,
    password
  });

  return newUser;
};

module.exports = addUser;
