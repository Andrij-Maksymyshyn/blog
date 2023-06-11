import ErrorCodes from "./errorCodes";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

class BadRequest extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = ErrorCodes.BAD_REQUEST;
  }
}

class Unauthorized extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = ErrorCodes.UNAUTHORIZED;
  }
}

class Forbidden extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = ErrorCodes.FORBIDDEN;
  }
}

class NotFound extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = ErrorCodes.NOT_FOUND;
  }
}

class Conflict extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = ErrorCodes.CONFLICT;
  }
}

class ServerError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.status = ErrorCodes.SERVER_ERROR;
  }
}

export {
  ApiError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  ServerError
};
