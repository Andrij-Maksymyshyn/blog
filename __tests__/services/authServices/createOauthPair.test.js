const Oauth = require("../../../models/oauth");
const { createOauthPair } = require("../../../api/auth/services");

jest.mock("../../../models/oauth");

const tokenDataToCreate = {
  accessToken: "123aaa",
  refreshToken: "456bbb",
  user: "789cc"
};

const mokedtokenPair = {
  accessToken: "bla45879PDER483",
  refreshToken: "yes4895PY48WE4",
  user: "489djddk59dlldld78cc"
};

describe.skip("createOauthPair function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return new tokenPair, when we passed tokenData", async () => {
    Oauth.create.mockResolvedValueOnce(mokedtokenPair);

    const result = await createOauthPair(tokenDataToCreate);
    expect(Oauth.create).toHaveBeenCalledWith(tokenDataToCreate);

    expect(result).toBe(mokedtokenPair);
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    Oauth.create.mockImplementationOnce(() => {
      throw error;
    });

    expect(
      async () => await createOauthPair(tokenDataToCreate)
    ).rejects.toThrow(error);
  });
});
