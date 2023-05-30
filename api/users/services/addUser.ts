import { hashPassword } from "../../../services";
import { User } from "../../../models";
import { IUser } from "../../../interfaces/userInterface";

const addUser = async (userObject: IUser): Promise<IUser> => {
  const password = await hashPassword(userObject.password || "");

  const newUser = await User.create({
    ...userObject,
    password
  });

  return newUser;
};

export { addUser };
