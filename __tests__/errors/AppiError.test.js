const {
  ApiError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  ServerError
} = require("../../errors/ApiError");

describe("eroor's functions", () => {
  const errorMessage = "Something went wrong";
  it("should return new instance for ApiError class with 2 public properies", () => {
    const obj = new ApiError(errorMessage, 418);
    expect(obj.message).toBe(errorMessage);
    expect(obj.status).toBe(418);
  });

  it("should return new instance for BadRequest class with 2 public properies", () => {
    const obj = new BadRequest(errorMessage);
    expect(obj.message).toBe(errorMessage);
    expect(obj.status).toBe(400);
  });

  it("should return new instance for Unauthorized class with 2 public properies", () => {
    const obj = new Unauthorized(errorMessage);
    expect(obj.message).toBe(errorMessage);
    expect(obj.status).toBe(401);
  });

  it("should return new instance for Forbidden class with 2 public properies", () => {
    const obj = new Forbidden(errorMessage);
    expect(obj.message).toBe(errorMessage);
    expect(obj.status).toBe(403);
  });

  it("should return new instance for NotFound class with 2 public properies", () => {
    const obj = new NotFound(errorMessage);
    expect(obj.message).toBe(errorMessage);
    expect(obj.status).toBe(404);
  });

  it("should return new instance for Conflict class with 2 public properies", () => {
    const obj = new Conflict(errorMessage);
    expect(obj.message).toBe(errorMessage);
    expect(obj.status).toBe(409);
  });

  it("should return new instance for ServerError class with 2 public properies", () => {
    const obj = new ServerError(errorMessage);
    expect(obj.message).toBe(errorMessage);
    expect(obj.status).toBe(500);
  });
});
