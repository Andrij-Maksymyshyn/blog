const { buildSortQuery } = require("../../helpers/buildSortQuery");

describe("buildSortQuery function", () => {
  it("should return query for sorting, when we passed sorting string", () => {
    const params = "asc(a),desc(b)";
    const expected = { a: "1", b: "-1" };

    const result = buildSortQuery(params);
    expect(result).toStrictEqual(expected);
  });
});
