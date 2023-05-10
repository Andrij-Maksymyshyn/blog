const User = require("../../../models/user");
const { updateById } = require("../../../api/users/services");

jest.mock("../../../models/user");

const id = "123";
const newId = "12345";
const dataToUpdate = {
  fullName: "Andrij",
  email: "max@ukr.net",
  postUrl: "bla",
  isDeleted: false
};
const mockReturn = {
  _id: id,
  fullName: "Andrij Max ",
  email: "andrij.gmail@com.ua",
  postUrl: "someUrl",
  isDeleted: false
};

describe.skip("updateById function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update user, when we passed user's id & data for update", async () => {
    User.findByIdAndUpdate.mockResolvedValueOnce(mockReturn);

    const result = await updateById(id, dataToUpdate, { new: true });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, dataToUpdate, {
      new: true
    });

    expect(result).toBe(mockReturn);
  });

  it("should return null, when we didn't pass user's id", async () => {
    User.findByIdAndUpdate.mockResolvedValueOnce(null);

    const result = await updateById("", dataToUpdate, { new: true });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("", dataToUpdate, {
      new: true
    });

    expect(result).toBe(null);
  });

  it("shouldn't update user, when we pass user's id, but didn't pass data for update", async () => {
    User.findByIdAndUpdate.mockResolvedValueOnce(dataToUpdate);

    const result = await updateById(id, {}, { new: true });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, {}, { new: true });

    expect(result).toBe(dataToUpdate);
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    User.findByIdAndUpdate.mockImplementationOnce(() => {
      throw error;
    });

    expect(
      async () => await updateById(newId, dataToUpdate, { new: true })
    ).rejects.toThrow(error);
  });
});
