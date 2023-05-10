const User = require("../../../models/user");
const { getAllUsers } = require("../../../api/users/services");

jest.mock("../../../models/user");

describe.skip("getAllUsers function", () => {
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
    User.find.mockResolvedValueOnce(mockedData);

    User.count.mockResolvedValueOnce(mockedData.length);

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
    User.find.mockResolvedValueOnce(mockedData);

    User.count.mockResolvedValueOnce(mockedData.length);

    const result = await getAllUsers({ page: 3, perPage: 3 });

    expect(User.find).toHaveBeenCalledWith({ isDeleted: false }, "", {
      skip: 6,
      limit: 3
    });

    expect(result).toStrictEqual({
      data: mockedData,
      page: 3,
      perPage: 3,
      total: mockedData.length
    });

    expect(result.total).toBe(mockedData.length);
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    User.find.mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await getAllUsers()).rejects.toThrow(error);
  });
});
