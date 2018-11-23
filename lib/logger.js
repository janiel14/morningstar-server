const winston = require('winston');
module.exports = function() {
    const _self = {};

    /**
     * getLogger
     * @return {Object} logger
     */
    _self.getLogger = function() {
        return winston.createLogger({
            level: 'error',
            format: winston.format.json(),
            transports: [
              new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
              new winston.transports.Console({level: 'error'}),
            ]
        });
    }

    /**
     * getDebug
     * @return {Object} logger
     */
    _self.getDebug = function() {
        return winston.createLogger({
            level: 'debug',
            format: winston.format.json(),
            transports: [
              new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
              new winston.transports.Console({level: 'debug'}),
            ]
        });
    }
    return _self;
}