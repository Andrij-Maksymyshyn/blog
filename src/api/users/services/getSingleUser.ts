import { User } from "../../../models";
import { IUser } from "../../../interfaces/userInterface";

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const findedUser = await User.findOne({
    _id: id,
    isDeleted: false
  });

  if (!findedUser) {
    return null;
  }

  return findedUser;
};

export { getSingleUser };
