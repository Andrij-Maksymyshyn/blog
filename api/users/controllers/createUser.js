const { addUser } = require("../services");
const { CREATED } = require("../../../errors/errorCodes");

const createUser = async (req, res, next) => {
  try {
    const result = await addUser(req.body);

    res.status(CREATED).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
