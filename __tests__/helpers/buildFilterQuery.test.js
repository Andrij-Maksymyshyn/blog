const { buildFilterQuery } = require("../../helpers/buildFilterQuery");

describe("buildFilterQuery function", () => {
  it("should return query for filtering, when we passed query with one param", () => {
    const fakedQuery = {
      authorId: "123yes"
    };
    const expectedFilterQuery = {
      isDeleted: false,
      user: ["123yes"]
    };

    const result = buildFilterQuery(fakedQuery);
    expect(result).toStrictEqual(expectedFilterQuery);
  });

  it("should return query for filtering, when we passed query with several params", () => {
    const fakedQuery = {
      authorId: "123yes,456bla",
      dateGte: "2023-04-16T00:00:00Z",
      dateLte: "2023-04-23T00:00:00Z",
      tag: "science,sport"
    };
    const expectedFilterQuery = {
      isDeleted: false,
      user: ["123yes", "456bla"],
      date: { $gte: "2023-04-16T00:00:00Z", $lte: "2023-04-23T00:00:00Z" },
      tags: { $in: ["science", "sport"] }
    };

    const result = buildFilterQuery(fakedQuery);
    expect(result).toStrictEqual(expectedFilterQuery);
  });

  it("should return query for filtering, when we passed empty query", () => {
    const expectedFilterQuery = {
      isDeleted: false
    };

    const result = buildFilterQuery({});
    expect(result).toStrictEqual(expectedFilterQuery);
  });
});
