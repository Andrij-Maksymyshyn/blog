const { buildSortQuery } = require("../../helpers/buildSortQuery");

describe("buildSortQuery function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const fakeQuery = {
    a: "1",
    b: "-1"
  };

  it("should return query for sorting, when we passed sorting string", () => {
    const fakedSortQuery = jest
      .fn(Object.fromEntries)
      .mockImplementationOnce(fakeQuery);

    const result = buildSortQuery("asc(title),desc(_id)");
    console.log("result:", result);

    expect(fakedSortQuery).toHaveBeenCalledWith("asc(title),desc(_id)");

    expect(result).toBe(fakeQuery);
  });
});
