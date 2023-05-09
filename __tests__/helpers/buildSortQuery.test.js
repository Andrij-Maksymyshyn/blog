const { buildSortQuery } = require("../../helpers/buildSortQuery");

describe("buildSortQuery function", () => {
  it("should return query for sorting, when we passed sorting string", () => {
    const fakedParams = "asc(a),desc(b)";
    const expectedSortQuery = { a: "1", b: "-1" };

    const result = buildSortQuery(fakedParams);
    expect(result).toStrictEqual(expectedSortQuery);
  });
});
