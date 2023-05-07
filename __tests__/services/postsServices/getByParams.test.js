const Post = require("../../../models/post");
const { getByParams } = require("../../../api/posts/services");

jest.mock("../../../models/post");

const searchData = {
  user: "123abc"
};
const mockedReturn = [
  {
    title: "bla1",
    user: "u125sjsjsOM"
  },
  {
    title: "bla2",
    user: "u458alaUT12"
  },
  {
    title: "bla3",
    user: "ukx41LSa1mm"
  }
];

describe("getByParams function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return array of posts user's, when we passed searchData", async () => {
    Post.find.mockResolvedValueOnce(mockedReturn);

    const result = await getByParams(searchData);
    console.log("result:", result);

    expect(Post.find).toHaveBeenCalledWith(searchData);

    expect(result).toBe(mockedReturn);
  });

  it("should return error, when something went wrong", async () => {
    const error = new Error("Something went wrong");

    Post.find.mockImplementationOnce(() => {
      throw error;
    });

    expect(async () => await getByParams(searchData)).rejects.toThrow(error);
  });
});
