import { User } from "../../../models/user";
import { getSingleUser } from "../../../api/users/services";

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
      fullName: "Andrij",
      email: "andrij.gmail@com.ua",
      postUrl: "someUrl",
      isDeleted: false
    };

    (User.findOne as jest.Mock).mockResolvedValueOnce(mockReturn);

    const result = await getSingleUser(id);

    expect(User.findOne).toHaveBeenCalledWith({
      _id: id,
      isDeleted: false
    });
    expect(result).toBe(mockReturn);
  });

  it("should return null, when user doesn't exist", async () => {
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    const result = await getSingleUser(newId);

    expect(User.findOne).toHaveBeenCalledWith({
      _id: newId,
      isDeleted: false
    });

    expect(result).toBeNull();
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    (User.findOne as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await getSingleUser(newId)).rejects.toThrow(error);
  });
});
