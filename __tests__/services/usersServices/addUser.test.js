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

  it("should create new user, when we pass the object to create", async () => {
    const mockedUser = {
      fullName: "fake_name",
      email: "fake_email",
      password: "fake_password",
      avatarUrl: "fake_url"
    };

    User.create.mockResolvedValueOnce(() => mockedUser);

    const result = await addUser(mockedUser);

    expect(hashPassword).toHaveBeenCalledWith("fake_password");

    expect(result()).toBe(mockedUser);
  });
});
