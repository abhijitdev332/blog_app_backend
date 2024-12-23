import { errorLogger, httpLogger } from "./logger.js";

const prod = {};
const dev = {};

const globalErrorHandler = (err, req, res, next) => {
  // if (process.env.NODE_ENV == "PRODUCTION") {
  // } else if (process.env.NODE_ENV == "DEVELOPMENT") {
  // } else {
  // }
  if (err.statusCode <= 408) {
    httpLogger.http({ ...err });
    return res.status(err.statusCode).json({
      msg: err.msg,
      message: err.message,
    });
  }
  errorLogger.error({ ...err });
  res.status(err.statusCode).json({
    msg: err.msg,
    message: err.message,
  });
};

export default globalErrorHandler;
