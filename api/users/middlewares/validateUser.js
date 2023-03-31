const { newUserSchema } = require("../userValidator");
const { BadRequest } = require("../../../errors/ApiError");

const validateUser = (req, _, next) => {
  try {
    const { error, value } = newUserSchema.validate(req.body);

    if (error) {
      throw new BadRequest(error);
    }

    req.body = value;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateUser;
