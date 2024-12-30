import { errorLogger, httpLogger, logMessage } from "./logger.js";

const prod = {};
const dev = {};

const globalErrorHandler = (err, req, res, next) => {
  // if (process.env.NODE_ENV == "PRODUCTION") {
  // } else if (process.env.NODE_ENV == "DEVELOPMENT") {
  // } else {
  // }
  if (err.statusCode <= 408) {
    logMessage(
      httpLogger,
      {
        msg: err.msg,
        message: err.message,
      },
      err
    );
    res.status(err.statusCode).json({
      msg: err.msg,
      message: err.message,
    });
  } else {
    logMessage(
      errorLogger,
      {
        msg: err.msg,
        message: err.message,
      },
      err
    );

    res.status(err.statusCode).json({
      msg: err.msg,
      message: err.message,
    });
  }
};

export default globalErrorHandler;
