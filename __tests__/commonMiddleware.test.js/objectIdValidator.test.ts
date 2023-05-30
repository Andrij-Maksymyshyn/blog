import { objectIdValidator } from "../../commonMiddleware";
import { BadRequest } from "../../errors/ApiError";

describe("objectIdValidator function", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should pass next truthly value, when id is valid", () => {
    const req = {
      params: {
        id: "551137c2f9e1fac808a5f572"
      }
    };

    const mockNext = jest.fn(() => "a");

    const validator = objectIdValidator("id");
    validator(req, null, mockNext);
    expect(mockNext.mock.calls[0]).toStrictEqual([]);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it("should pass next error, when id is not valid", () => {
    const req = {
      params: {
        id: "551"
      }
    };

    const mockNext = jest.fn(() => "a");

    const validator = objectIdValidator("id");
    validator(req, null, mockNext);

    expect(mockNext.mock.calls[0]).toStrictEqual([
      new BadRequest("ID is not valid")
    ]);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
