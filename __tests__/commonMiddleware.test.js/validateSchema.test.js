const Joi = require("joi");

const { OBJECT_ID } = require("../../configs/regexp.enum");
const { validate } = require("../../commonMiddleware");
const { BAD_REQUEST } = require("../../errors/errorCodes");

describe("validate function", () => {
  it("should pass next value after validation schema", () => {
    const req = {
      params: Joi.object().keys({
        userId: Joi.string().alphanum().regex(OBJECT_ID).required()
      })
    };

    const mockNext = jest.fn(() => "a");

    const validator = validate(req);
    validator(req, null, mockNext);
    mockNext();

    expect(mockNext).toHaveBeenCalledWith({
      status: BAD_REQUEST,
      message: '"userId" is required'
    });
    expect(mockNext.mock.calls[0][1]).toBe(undefined);
    expect(mockNext).toHaveBeenCalledTimes(2);
  });
});
