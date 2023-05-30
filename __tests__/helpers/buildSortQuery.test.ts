import { buildSortQuery } from "../../helpers/buildSortQuery";

describe("buildSortQuery function", () => {
  it("should return default query for sorting, when we nothing passed", () => {
    const params = undefined;
    const expected = { _id: "1" };

    const result = buildSortQuery(params);
    expect(result).toStrictEqual(expected);
  });

  it("should return query for sorting, when we passed sorting string", () => {
    const params = "asc(a),desc(b)";
    const expected = { a: "1", b: "-1" };

    const result = buildSortQuery(params);
    expect(result).toStrictEqual(expected);
  });
});
