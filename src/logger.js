// src/logger.js
/**
 * Logging configuration
 */

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
        })
    ),
    transports: [new transports.Console()]
});

/**
 * Enable debug logging
 */
function enableDebug() {
    logger.level = 'debug';
}

module.exports = logger;
