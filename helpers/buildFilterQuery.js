const buildFilterQuery = (query = {}) => {
  const filterQuery = { isDeleted: false };
  const dateFilter = {};

  if (query.dateGte) {
    dateFilter.$gte = query.dateGte;
  }

  if (query.dateLte) {
    dateFilter.$lte = query.dateLte;
  }

  if (query.tag) {
    filterQuery.tags = {
      $in: query.tag.split(",")
    };
  }

  if (query.authorId) {
    Object.assign(filterQuery, {
      user: query.authorId.split(",")
    });
  }

  if (Object.keys(dateFilter).length) {
    filterQuery.date = dateFilter;
  }

  return filterQuery;
};

module.exports = {
  buildFilterQuery
};
