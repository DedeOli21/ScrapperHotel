const WinstonLogger = require('./WinstonLogger');
const ConsoleLogger = require('./ConsoleLogger');

class LoggerFactory {
  static create(config = {}) {
    const environment = config.environment || process.env.NODE_ENV;

    if (environment === 'test') {
      return new ConsoleLogger(config);
    }

    try {
      return new WinstonLogger(config);
    } catch (error) {
      console.error('Failed to create WinstonLogger, falling back to ConsoleLogger:', error);
      return new ConsoleLogger(config);
    }
  }
}

module.exports = LoggerFactory;