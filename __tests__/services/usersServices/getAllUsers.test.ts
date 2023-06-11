import { User } from "../../../src/models";
import { getAllUsers } from "../../../src/api/users/services";

jest.mock("../../../src/models/user");

describe("getAllUsers function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockedData = [
    {
      fullName: "user1"
    },
    {
      fullName: "user2"
    },
    {
      fullName: "user3"
    }
  ];

  it("should return usersData & usersTotal, when we didn't pass query", async () => {
    (User.find as jest.Mock).mockResolvedValueOnce(mockedData);

    (User.count as jest.Mock).mockResolvedValueOnce(mockedData.length);

    const result = await getAllUsers();

    expect(User.find).toHaveBeenCalledWith({ isDeleted: false }, "", {
      skip: 0,
      limit: 3
    });

    expect(result).toStrictEqual({
      data: mockedData,
      page: 1,
      perPage: 3,
      total: mockedData.length
    });

    expect(result.total).toBe(mockedData.length);
  });

  it("should return usersData & usersTotal, when we passed query with page = 3 and perPage = 3", async () => {
    (User.find as jest.Mock).mockResolvedValueOnce(mockedData);

    (User.count as jest.Mock).mockResolvedValueOnce(mockedData.length);

    const result = await getAllUsers({ page: "3", perPage: "3" });

    expect(User.find).toHaveBeenCalledWith({ isDeleted: false }, "", {
      skip: 6,
      limit: 3
    });

    expect(result).toStrictEqual({
      data: mockedData,
      page: "3",
      perPage: "3",
      total: mockedData.length
    });

    expect(result.total).toBe(mockedData.length);
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    (User.find as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await getAllUsers()).rejects.toThrow(error);
  });
});
