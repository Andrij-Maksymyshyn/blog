import { User } from "../../../models";
import { IUser } from "../../../interfaces/userInterface";

type TQueryUsers = {
  page?: string;
  perPage?: string;
};

const getAllUsers = async (
  query: TQueryUsers = {}
): Promise<{
  data: IUser[];
  page: number | string;
  perPage: number | string;
  total: number;
}> => {
  const { page = 1, perPage = 3 } = query;
  const skip = (Number(page) - 1) * Number(perPage);

  const users = await User.find({ isDeleted: false }, "", {
    skip,
    limit: Number(perPage)
  });

  const total = await User.count();

  return {
    data: users,
    page,
    perPage: perPage,
    total
  };
};

export { getAllUsers };
