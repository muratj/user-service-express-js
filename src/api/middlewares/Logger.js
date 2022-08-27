const { createLogger, format, transports } = require('winston');
const { combine, printf, label, timestamp, colorize, errors } = format;

const logFormat = printf(({ level, message, label, timestamp, stack }) => {
  return `${timestamp} [${label}] ${level}: ${stack || message}`;
});

const loggerOptions = {
  dev: {
    format: combine(
      label({ label: 'user-service' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      colorize(),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()]
  },
  prod: {
    format: combine(
      label({ label: 'user-service' }),
      timestamp(),
      errors({ stack: true }),
      logFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'production.logs.txt' })
    ]
  }
}

const logger = createLogger(loggerOptions[process.env.NODE_ENV]);

module.exports = logger;