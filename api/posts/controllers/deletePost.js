const { getSinglePost } = require("../services");

const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const deletedPost = await getSinglePost(postId);
    deletedPost.isDeleted = true;
    await deletedPost.save();

    res
      .status(200)
      .json({ message: `Post with id: ${postId} has successfully deleted.` });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePost;
