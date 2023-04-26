const ObjectId = require("mongoose").Types.ObjectId;

const { BadRequest } = require("../errors/ApiError");

const objectIdValidator = paramName => (req, _, next) => {
  try {
    const isValid = ObjectId.isValid(req.params[paramName]);

    if (!isValid) {
      throw new BadRequest("ID is not valid");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = objectIdValidator;
