import { User } from "../../models";
import { IUser } from "../../interfaces/userInterface";

const deleteUser = async ({ id }: { id: string }): Promise<IUser> => {
  const removedUser = await User.findById(id);

  if (!removedUser) {
    throw new Error("User Not found!");
  }

  removedUser.isDeleted = true;
  await removedUser.save();

  return removedUser;
};

export { deleteUser };

// const { User } = require("../../models");

// const deleteUser = async ({ id }) => {
//   const removedUser = await User.findById(id);

//   if (!removedUser) {
//     throw new Error("User Not found!");
//   }

//   removedUser.isDeleted = true;
//   await removedUser.save();

//   return removedUser;
// };

// module.exports = deleteUser;
