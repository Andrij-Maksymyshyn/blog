import { IUserInput } from "../../interfaces/userInput";
import { IUser } from "../../interfaces/userInterface";
import { User } from "../../models";
import { hashPassword } from "../../services";

const createUser = async ({
  userInput
}: {
  userInput: IUserInput;
}): Promise<IUser> => {
  const { email } = userInput;

  const findedEmail = await User.findOne({ email });

  if (findedEmail) {
    throw new Error("Such email is already in use");
  }

  const password = await hashPassword(userInput.password || "");
  const user = new User({
    fullName: userInput.fullName,
    email: userInput.email,
    avatarUrl: userInput.avatarUrl,
    password
  });

  const createUser = await user.save();

  return createUser;
};

export { createUser };

// const { User } = require("../../models");
// const { hashPassword } = require("../../services");

// const createUser = async ({ userInput }) => {
//   const { email } = userInput;

//   const findedEmail = await User.findOne({ email });

//   if (findedEmail) {
//     throw new Error("Such email is already in use");
//   }

//   const password = await hashPassword(userInput.password);
//   const user = new User({
//     fullName: userInput.fullName,
//     email: userInput.email,
//     avatarUrl: userInput.avatarUrl,
//     password
//   });

//   const createUser = await user.save();

//   return createUser;
// };

// module.exports = createUser;
