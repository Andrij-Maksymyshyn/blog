const User = require("../../../models/user");
const { getSingleUser } = require("../../../api/users/services");

jest.mock("../../../models/user");

const id = "123";
const newId = "12345";

describe("getSingleUser function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return user, when user exists", async () => {
    const mockReturn = {
      _id: id,
      isDeleted: false
    };

    User.findOne.mockResolvedValueOnce(mockReturn);
    const result = await getSingleUser(id);

    expect(User.findOne).toHaveBeenCalledWith(mockReturn);
    expect(result).toBe(mockReturn);
  });

  it("should return null, when user doesn't exist", async () => {
    const mockReturn = {
      _id: newId,
      isDeleted: false
    };

    User.findOne.mockResolvedValueOnce(null);

    const result = await getSingleUser(newId);

    expect(User.findOne).toHaveBeenCalledWith(mockReturn);

    expect(result).toBeNull();
  });
});
