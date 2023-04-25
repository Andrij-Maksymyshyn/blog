const { getAllPosts } = require("../services");

const listPosts = async (req, res, next) => {
  try {
    const result = await getAllPosts(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listPosts;
