const { format, createLogger, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/* Transport to write into file */
const transport = new DailyRotateFile({
  filename: path.join(logDir, "/requests/combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD-HH",
  frequency: "24h",
  zippedArchive: false,
  maxSize: "20m",
});

const { combine, errors, simple } = format;

const logger = createLogger({
  format: combine(errors({ stack: true }), simple()),
  transports: [new transports.Console()],
});

module.exports = {
  logger,
};
