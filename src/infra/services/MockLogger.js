const ILogger = require('../../application/ports/ILogger');


class MockLogger extends ILogger {
  constructor() {
    super();
    this.logs = {
      info: [],
      error: [],
      warn: [],
      debug: []
    };
  }

  info(message, metadata = {}) {
    this.logs.info.push({ message, metadata, timestamp: new Date() });
  }

  error(message, metadata = {}) {
    this.logs.error.push({ message, metadata, timestamp: new Date() });
  }

  warn(message, metadata = {}) {
    this.logs.warn.push({ message, metadata, timestamp: new Date() });
  }

  debug(message, metadata = {}) {
    this.logs.debug.push({ message, metadata, timestamp: new Date() });
  }

  clear() {
    this.logs = {
      info: [],
      error: [],
      warn: [],
      debug: []
    };
  }

  getLastLog(level) {
    return this.logs[level][this.logs[level].length - 1];
  }

  hasLog(level, message) {
    return this.logs[level].some(log => 
      log.message.includes(message)
    );
  }
}

module.exports = MockLogger;