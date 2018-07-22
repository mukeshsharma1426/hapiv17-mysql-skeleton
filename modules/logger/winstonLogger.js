const fs = require('fs');
const winston = require('winston');
const WinstonRotateFile = require('winston-daily-rotate-file');

const logDir = 'log';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// converts the date object to local time string
const tsFormat = () => (new Date()).toLocaleTimeString();

const transports = [];

// If you want to use winstonLogger for your console.
if (process.env.NODE_ENV !== 'live') {
  // colorize the output to the console
  // winston console only if not production
  transports.push(
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info', // level of log
    })
  );
}

// If you want to use winstonLogger to create log files.
if(process.env.NODE_ENV === 'live') {
  // generates the log files
  transports.push(
    new (WinstonRotateFile)({
      filename: `${logDir}/-results.log`, // filename to be created
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true, // prepends date to name of file
      level: 'info', // level of log
    })
  );
}
// winston logger to generate logs
global.winstonLogger = new (winston.Logger)({
  transports,
});
