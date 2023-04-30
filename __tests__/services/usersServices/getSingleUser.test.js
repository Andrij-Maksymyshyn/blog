const User = require("../../../models/user");
const { getSingleUser } = require("../../../api/users/services");

jest.mock("../../../models/user");

const id = "123";

describe("getSingleUser function", () => {
  it("should return user, when user exists", async () => {
    User.findOne.mockResolvedValueOnce(() => ({
      _id: id,
      isDeleted: false
    }));

    await getSingleUser(id);

    expect(User.findOne).toHaveBeenCalledWith({
      _id: id,
      isDeleted: false
    });
  });

  /////////////////////////////////////////////////////////////////////////////
  it("should return null, when user doesn't exist", async () => {
    const newId = "12345";

    User.findOne.mockImplementationOnce(() => null);

    await getSingleUser(newId);

    expect(User.findOne).toHaveBeenCalledWith({
      _id: newId,
      isDeleted: false
    });

    expect(User.findOne).toHaveReturnedWith(null);
  });
});
