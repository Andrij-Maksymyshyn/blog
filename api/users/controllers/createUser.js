const { addUser } = require("../services");
const { CREATED } = require("../../../helpers/helpers");

const createUser = async (req, res, next) => {
  try {
    const result = await addUser(req.body);

    res.status(CREATED).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
