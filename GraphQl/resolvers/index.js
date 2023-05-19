const createUser = require("./createUser");
const users = require("./allUsers");
const updateUser = require("./updateUserById");
const deleteUser = require("./deleteUserById");
const loginUser = require("./signInUser");
const posts = require("./allPosts");
const createPost = require("./addPost");
const updatePost = require("./updatePostById");
const deletePost = require("./deletePostById");

module.exports = {
  createUser,
  users,
  updateUser,
  deleteUser,
  posts,
  createPost,
  updatePost,
  deletePost,
  loginUser
};
