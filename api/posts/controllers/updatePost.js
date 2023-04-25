const { renovateById } = require("../services");

const updatePost = async (req, res, next) => {
  try {
    const result = await renovateById(req.params.postId, req.body);

    res.status(200).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updatePost;
