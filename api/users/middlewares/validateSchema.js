const { BAD_REQUEST } = require("../../../errors/errorCodes");

const getErrorMessage = (req, schema) => {
  const keys = Object.keys(schema);
  let errorMessage = "";

  for (const key of keys) {
    const validationResult = schema[key].validate(req[key]);

    if (validationResult.error) {
      errorMessage = validationResult.error.message;
    }

    req[key] = validationResult.value;
  }

  return { message: errorMessage };
};

const validate = schema => {
  return (req, _, next) => {
    const { message } = getErrorMessage(req, schema);

    if (message) return next({ status: BAD_REQUEST, message });

    next();
  };
};
module.exports = validate;
