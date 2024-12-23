class CustomError extends Error {
  constructor(msg, status) {
    super(msg);
    this.statusCode = status || 408;
    this.msg = msg || "request timeout";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 401;
    this.msg = msg || "Unauthorized";
  }
}
export class ServerError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 500;
    this.msg = msg || "Internal server Error";
    this.isOperational = false;
  }
}
export class appError extends CustomError {
  constructor(msg, status) {
    super(msg, status);
    this.statusCode = status || 400;
    this.msg = msg || "bad request";
    this.isOperational = false;
  }
}

export default CustomError;
