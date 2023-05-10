const { objectIdValidator } = require("../../commonMiddleware");
const { BadRequest } = require("../../errors/ApiError");

describe("objectIdValidator function", () => {
  it("should pass next truthly value", async () => {
    const req = {
      param: {
        id: "sdcsb3453h345jh345345nj"
      }
    };
    const mockNext = jest.fn(() => "a");
    const result = objectIdValidator(req, null, mockNext);
    expect(mockNext).toHaveBeenCalledWith("a");
  });
});
