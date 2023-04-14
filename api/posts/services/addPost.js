const { Post } = require("../../../models");

const addPost = (postObject, signedInUser) => {
  const newPost = Post.create({
    ...postObject,
    user: signedInUser?._id
  });

  return newPost;
};

module.exports = addPost;
