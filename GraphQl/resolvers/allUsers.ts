import { User } from "../../models";
import { IUser } from "../../interfaces/userInterface";

const users = async ({
  skip,
  limit
}: {
  skip: number;
  limit: number;
}): Promise<IUser[] | null> => {
  const usersArray = await User.find({ isDeleted: false }, "", {
    skip,
    limit
  });

  if (!usersArray) {
    return null;
  }

  return usersArray;
};

export { users };

// const { User } = require("../../models");

// const users = async ({ skip, limit }) => {
//   const usersArray = await User.find({ isDeleted: false }, "", {
//     skip,
//     limit
//   });

//   if (!usersArray) {
//     return null;
//   }

//   return usersArray;
// };

// module.exports = users;
