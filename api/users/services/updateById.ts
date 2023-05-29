import { User } from "../../../models";
import { IUser } from "../../../interfaces/userInterface";

const updateById = async (id: string, data: IUser): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

  if (!updatedUser) {
    return null;
  }

  return updatedUser;
};

export { updateById };
