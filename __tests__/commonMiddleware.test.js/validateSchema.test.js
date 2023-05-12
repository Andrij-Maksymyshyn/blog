const Joi = require("joi");

const { OBJECT_ID } = require("../../configs/regexp.enum");
const { validate } = require("../../commonMiddleware");
const { BAD_REQUEST } = require("../../errors/errorCodes");

describe("validate function", () => {
  it("should pass next value after validation schema and valid req", () => {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().alphanum().regex(OBJECT_ID).required()
      })
    };

    const req = {
      params: {
        userId: "551137c2f9e1fac808a5f572"
      }
    };

    const mockNext = jest.fn(() => "a");

    const validator = validate(schema);
    validator(req, null, mockNext);

    expect(mockNext.mock.calls[0][0]).toBe(undefined);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("should pass next value after validation schema and not valid req", () => {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string().alphanum().regex(OBJECT_ID).required()
      })
    };

    const req = {
      params: {
        id: "551137c2f9e1fac808a5f572"
      }
    };

    const mockNext = jest.fn(() => "a");

    const validator = validate(schema);
    validator(req, null, mockNext);

    expect(mockNext).toHaveBeenCalledWith({
      status: BAD_REQUEST,
      message: '"userId" is required'
    });

    expect(mockNext.mock.calls[0][0]).toStrictEqual({
      status: BAD_REQUEST,
      message: '"userId" is required'
    });
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
