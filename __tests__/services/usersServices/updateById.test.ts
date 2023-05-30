import { User } from "../../../models/user";
import { updateById } from "../../../api/users/services";

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

describe("updateById function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should update user, when we passed user's id & data for update", async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(mockReturn);

    const result = await updateById(id, dataToUpdate);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, dataToUpdate, {
      new: true
    });

    expect(result).toBe(mockReturn);
  });

  it("should return null, when we didn't pass user's id", async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

    const result = await updateById("", dataToUpdate);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("", dataToUpdate, {
      new: true
    });

    expect(result).toBe(null);
  });

  it("shouldn't update user, when we pass user's id, but didn't pass data for update", async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(dataToUpdate);

    const result = await updateById(id);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(id, undefined, {
      new: true
    });

    expect(result).toBe(dataToUpdate);
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    (User.findByIdAndUpdate as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await updateById(newId, dataToUpdate)).rejects.toThrow(
      error
    );
  });
});
