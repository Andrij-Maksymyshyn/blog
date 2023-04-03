const { getAllUsers } = require("../services");

const listUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = listUsers;
