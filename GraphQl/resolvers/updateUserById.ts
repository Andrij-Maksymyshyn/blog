import { IUserInput } from "../../interfaces/userInput";
import { IUser } from "../../interfaces/userInterface";
import { User } from "../../models";

const updateUser = async ({
  id,
  userInput
}: {
  id: string;
  userInput: IUserInput;
}): Promise<IUser> => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User Not found!");
  }

  user.fullName = userInput.fullName;
  user.email = userInput.email;
  user.avatarUrl = userInput.avatarUrl;

  const updatedUser = await user.save();

  return updatedUser;
};

export { updateUser };

// const { User } = require("../../models");

// const updateUser = async ({ id, userInput }) => {
//   const user = await User.findById(id);

//   if (!user) {
//     throw new Error("User Not found!");
//   }

//   user.fullName = userInput.fullName;
//   user.email = userInput.email;
//   user.avatarUrl = userInput.avatarUrl;

//   const updatedUser = await user.save();

//   return updatedUser;
// };

// module.exports = updateUser;
