const ObjectId = require("mongoose").Types.ObjectId;

const { BadRequest } = require("../errors/ApiError");

const objectIdValidator = paramName => (req, _, next) => {
  try {
    if (!ObjectId.isValid(req.params[paramName])) {
      throw new BadRequest("ID is not valid");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = objectIdValidator;
