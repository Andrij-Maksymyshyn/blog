const buildSortQuery = sortBy => {
  const entries = sortBy
    .split(",")
    .map(e =>
      e
        .replace("(", ", ")
        .replace(")", "")
        .replace("asc,", "1")
        .replace("desc,", "-1")
        .split(" ")
        .reverse()
    );

  const queryToSort = Object.fromEntries(entries);

  return queryToSort;
};

module.exports = {
  buildSortQuery
};
