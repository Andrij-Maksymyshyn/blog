const { ASC, DESC } = require("../configs/sortOrder.enum");

const buildSortQuery = (sortBy, order) => {
  const sortingOrder = order === "desc" ? DESC : ASC;

  if (sortBy === "date") {
    return { _id: sortingOrder };
  }

  return { [sortBy]: sortingOrder };
};

module.exports = {
  buildSortQuery
};
