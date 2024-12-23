import winston from "winston";

const { timestamp, json, combine } = winston.format;

const infoLogger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "info.log",
    }),
  ],
});
const errorLogger = winston.createLogger({
  level: "error",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "err.log",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
  ],
});

const httpLogger = winston.createLogger({
  level: "http",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "http.log",
    }),
  ],
});
export { infoLogger, errorLogger, httpLogger };
