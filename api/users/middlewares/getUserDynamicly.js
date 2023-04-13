const { User } = require("../../../models");
const { NotFound } = require("../../../errors/ApiError");

const getUserDynamicly =
  (paramName, from, dbField = paramName) =>
  async (req, _, next) => {
    try {
      const searchData = req[from][paramName];

      const user = await User.findOne({
        [dbField]: searchData,
        isDeleted: false
      });

      if (!user) {
        throw new NotFound("User not found. Please, create new user.");
      }

      req.locals = { ...(req.locals || {}), user };

      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = getUserDynamicly;
