import { User } from "../../../models/user";
import { addUser } from "../../../api/users/services";
import { hashPassword } from "../../../services";

jest.mock("../../../models/user");

jest.mock("../../../services", () => ({
  hashPassword: jest.fn(() => "hash password")
}));

describe("addUser function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create new user, when we passed the object to create & user's password", async () => {
    const mockedUser = {
      fullName: "fake_name",
      email: "fake_email",
      password: "fake_password",
      avatarUrl: "fake_url"
    };

    (User.create as jest.Mock).mockResolvedValueOnce(mockedUser);

    const result = await addUser(mockedUser);

    expect(hashPassword).toHaveBeenCalledWith("fake_password");

    expect(User.create).toHaveBeenCalledWith({
      ...mockedUser,
      password: "hash password"
    });

    expect(result).toBe(mockedUser);
  });

  it("should throw error, when we didn't pass password", async () => {
    const mockedUser = {
      fullName: "fake_name",
      email: "fake_email",
      avatarUrl: "fake_url"
    };

    const error = new Error("not passed password");

    (hashPassword as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await addUser(mockedUser)).rejects.toThrow(error);
  });
});
