const User = require("../../../models/user");
const { addUser } = require("../../../api/users/services");
const { hashPassword } = require("../../../services");

jest.mock("../../../models/user");

jest.mock("../../../services", () => ({
  hashPassword: jest.fn(() => "hash password")
}));

describe.skip("addUser function", () => {
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

    User.create.mockResolvedValueOnce(mockedUser);

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

    hashPassword.mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await addUser(mockedUser)).rejects.toThrow(error);
  });
});
