const winston = require('winston');
const ILogger = require('../../application/ports/ILogger');


class WinstonLogger extends ILogger {

  constructor(config = {}) {
    super();
    
    this.config = {
      level: config.level || process.env.LOG_LEVEL || 'info',
      environment: config.environment || process.env.NODE_ENV || 'development',
      appName: config.appName || 'asksuite-api',
      ...config
    };

    this.logger = this.createLogger();
  }

  createLogger() {
    const isDevelopment = this.config.environment === 'development';

    const devFormat = winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let log = `${timestamp} [${level}]: ${message}`;
        
        if (Object.keys(meta).length > 0) {
          log += `\n${JSON.stringify(meta, null, 2)}`;
        }
        
        return log;
      })
    );

    const prodFormat = winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    );

    return winston.createLogger({
      level: this.config.level,
      format: isDevelopment ? devFormat : prodFormat,
      defaultMeta: {
        service: this.config.appName,
        environment: this.config.environment
      },
      transports: [
        new winston.transports.Console({
          stderrLevels: ['error']
        })
      ],
      exitOnError: false
    });
  }

  sanitizeMetadata(metadata) {
    if (!metadata || typeof metadata !== 'object') {
      return metadata;
    }

    const sensitiveFields = [
      'password',
      'token',
      'authorization',
      'secret',
      'apiKey',
      'creditCard'
    ];

    const sanitized = { ...metadata };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '***REDACTED***';
      }
    }

    for (const key in sanitized) {
      if (sanitized[key] && typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitizeMetadata(sanitized[key]);
      }
    }

    return sanitized;
  }

  formatLogData(message, metadata = {}) {
    if (typeof message === 'object' && message !== null) {
      return {
        message: message.message || 'Log message',
        ...this.sanitizeMetadata({ ...metadata, ...message })
      };
    }

    return {
      message: String(message),
      ...this.sanitizeMetadata(metadata)
    };
  }


  info(message, metadata = {}) {
    const logData = this.formatLogData(message, metadata);
    this.logger.info(logData.message, logData);
  }


  error(message, metadata = {}) {
    let logData;

    if (message instanceof Error) {
      logData = {
        message: message.message,
        stack: message.stack,
        errorName: message.name,
        ...this.sanitizeMetadata(metadata)
      };
    } else {
      logData = this.formatLogData(message, metadata);
    }

    this.logger.error(logData.message, logData);
  }


  warn(message, metadata = {}) {
    const logData = this.formatLogData(message, metadata);
    this.logger.warn(logData.message, logData);
  }


  debug(message, metadata = {}) {
    const logData = this.formatLogData(message, metadata);
    this.logger.debug(logData.message, logData);
  }

  
  child(defaultMeta) {
    const childLogger = Object.create(this);
    childLogger.logger = this.logger.child(defaultMeta);
    return childLogger;
  }

  close() {
    this.logger.close();
  }
}

module.exports = WinstonLogger;