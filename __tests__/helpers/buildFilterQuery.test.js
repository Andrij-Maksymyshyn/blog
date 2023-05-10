const { buildFilterQuery } = require("../../helpers/buildFilterQuery");

describe("buildFilterQuery function", () => {
  it("should return query for filtering, when we passed query with one param", () => {
    const query = {
      authorId: "123yes"
    };
    const expected = {
      isDeleted: false,
      user: ["123yes"]
    };

    const result = buildFilterQuery(query);
    expect(result).toStrictEqual(expected);
  });

  it("should return query for filtering, when we passed query with several params", () => {
    const query = {
      authorId: "123yes,456bla",
      dateGte: "2023-04-16T00:00:00Z",
      dateLte: "2023-04-23T00:00:00Z",
      tag: "science,sport"
    };
    const expected = {
      isDeleted: false,
      user: ["123yes", "456bla"],
      date: { $gte: "2023-04-16T00:00:00Z", $lte: "2023-04-23T00:00:00Z" },
      tags: { $in: ["science", "sport"] }
    };

    const result = buildFilterQuery(query);
    expect(result).toStrictEqual(expected);
  });

  it("should return query for filtering, when we passed empty query", () => {
    const expected = {
      isDeleted: false
    };

    const result = buildFilterQuery({});
    expect(result).toStrictEqual(expected);
  });
});
