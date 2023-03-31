const { hashPassword } = require("../../../services");
const { User } = require("../../../models");

const addUser = async userObject => {
  const hashedPassword = await hashPassword(userObject.password);

  const newUser = User.create({
    ...userObject,
    password: hashedPassword
  });

  return newUser;
};

module.exports = addUser;
