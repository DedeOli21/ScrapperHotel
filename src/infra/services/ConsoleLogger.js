const ILogger = require('../../application/interfaces/ILogger');

class ConsoleLogger extends ILogger {
  constructor(config = {}) {
    super();
    this.level = config.level || 'info';
    this.environment = config.environment || process.env.NODE_ENV || 'development';
  }

  getTimestamp() {
    return new Date().toISOString();
  }


  formatLog(level, message, metadata) {
    const timestamp = this.getTimestamp();
    const meta = Object.keys(metadata).length > 0 
      ? `\n${JSON.stringify(metadata, null, 2)}` 
      : '';
    
    return `${timestamp} [${level.toUpperCase()}]: ${message}${meta}`;
  }

  info(message, metadata = {}) {
    console.log(this.formatLog('info', message, metadata));
  }

  error(message, metadata = {}) {
    const msg = message instanceof Error ? message.message : message;
    const meta = message instanceof Error 
      ? { ...metadata, stack: message.stack }
      : metadata;
    
    console.error(this.formatLog('error', msg, meta));
  }

  warn(message, metadata = {}) {
    console.warn(this.formatLog('warn', message, metadata));
  }

  debug(message, metadata = {}) {
    if (this.level === 'debug') {
      console.debug(this.formatLog('debug', message, metadata));
    }
  }
}

module.exports = ConsoleLogger;