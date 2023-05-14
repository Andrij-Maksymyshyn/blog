const { User } = require("../../../models");
const { hashPassword } = require("../../../services");

const createUser = async ({ userInput }) => {
  const password = await hashPassword(userInput.password);
  const user = new User({
    fullName: userInput.fullName,
    email: userInput.email,
    avatarUrl: userInput.avatarUrl,
    password
  });
  const createUser = await user.save();

  return {
    ...createUser._doc,
    _id: createUser._id.toString()
  };
};

module.exports = createUser;
