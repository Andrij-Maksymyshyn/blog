import Joi from "joi";

import { OBJECT_ID } from "../../src/configs/regexEnum";
import { validate } from "../../src/commonMiddleware";
import ErrorCodes from "../../src/errors/errorCodes";

describe("validate function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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

    expect(mockNext.mock.calls[0]).toStrictEqual([]);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("should pass next value after validation schema and not valid req", () => {
    const schema = {
      params: Joi.object().keys({
        userId: Joi.string()
          .alphanum()
          .regex(/^([0-9a-fA-F]{24})|([0-9a-fA-F]{24})$/)
          .required()
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
      status: ErrorCodes.BAD_REQUEST,
      message: '"userId" is required'
    });

    expect(mockNext.mock.calls[0]).toStrictEqual([
      {
        status: ErrorCodes.BAD_REQUEST,
        message: '"userId" is required'
      }
    ]);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
