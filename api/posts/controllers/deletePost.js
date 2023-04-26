const { getSinglePost } = require("../services");
const { BadRequest } = require("../../../errors/ApiError");

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const deletedPost = await getSinglePost(postId);
    deletedPost.isDeleted = true;
    await deletedPost.save();

    if (!deletedPost) {
      throw new BadRequest("Post not found");
    }

    res
      .status(200)
      .json({ message: `Post with id: ${postId} has successfully deleted.` });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePost;
