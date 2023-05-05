const User = require("../../../models/user");
const { getAllUsers } = require("../../../api/users/services");

jest.mock("../../../models/user");

describe("getAllUsers function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return usersData(& usersTotal) with skip = 0, limit = 3, when we didn't pass query", async () => {
    const mockedReturn = {
      data: [
        {
          fullName: "user1"
        },
        {
          fullName: "user2"
        },
        {
          fullName: "user3"
        }
      ],
      page: 1,
      perPage: Number(3),
      total: Number(5)
    };

    User.find.mockResolvedValueOnce(mockedReturn);

    User.count.mockResolvedValueOnce(mockedReturn.total);

    await getAllUsers();

    expect(User.find).toHaveBeenCalledWith({ isDeleted: false }, "", {
      skip: 0,
      limit: 3
    });

    expect(User.count).toHaveReturned();
  });

  it("should return usersData(& usersTotal) with skip = 6, limit = 3, when we passed query with page = 3 and perPage = 3", async () => {
    const mockedReturn = {
      data: [
        {
          fullName: "user1"
        },
        {
          fullName: "user2"
        },
        {
          fullName: "user3"
        }
      ],
      page: 3,
      perPage: Number(3),
      total: Number(5)
    };

    User.find.mockResolvedValueOnce(mockedReturn);

    User.count.mockResolvedValueOnce(mockedReturn.total);

    await getAllUsers({ page: 3, perPage: 3 });

    expect(User.find).toHaveBeenCalledWith({ isDeleted: false }, "", {
      skip: 6,
      limit: 3
    });

    expect(User.count).toHaveReturned();
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    User.find.mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await getAllUsers()).rejects.toThrow(error);
  });
});
