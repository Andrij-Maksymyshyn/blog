const User = require("../../../models/user");
const { addUser } = require("../../../api/users/services");
const { hashPassword } = require("../../../services");

jest.mock("../../../models/user");

jest.mock("../../../services", () => ({
  hashPassword: jest.fn(() => "hash password")
}));

describe("addUser function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("function should create new user, when we passed the object to create & user's password", async () => {
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

  it("function should throw error, when we didn't pass password", async () => {
    const addUser = jest.fn(x => x);

    addUser.mockResolvedValueOnce(() => {
      throw new Error("not passed password");
    });

    const mockedUser = {
      fullName: "fake_name",
      email: "fake_email",
      avatarUrl: "fake_url"
    };

    User.create.mockResolvedValueOnce(mockedUser);

    const result = await addUser(mockedUser);

    // expect(User.create).toHaveBeenCalledWith(mockedUser);

    expect(result).toThrow(new Error("not passed password"));
  });
});
