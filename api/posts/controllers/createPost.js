const { addPost } = require("../services");
const { CREATED } = require("../../../helpers/helpers");

const createPost = async (req, res, next) => {
  try {
    const result = await addPost(req.body, req.user);

    res.status(CREATED).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPost;
