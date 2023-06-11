type TSortedQuery = {
  title?: "1" | "-1";
  _id?: "1" | "-1";
  viewsCount?: "1" | "-1";
  date?: "1" | "-1";
};

const buildSortQuery = (sortBy: string = "asc(_id)"): TSortedQuery => {
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

export { buildSortQuery };
