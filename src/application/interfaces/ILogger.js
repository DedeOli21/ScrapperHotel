class ILogger {
    info(message, metadata = {}) {
      throw new Error('Method info not implemented');
    }
  
    error(message, metadata = {}) {
      throw new Error('Method error not implemented');
    }
 
    warn(message, metadata = {}) {
      throw new Error('Method warn not implemented');
    }
  
    debug(message, metadata = {}) {
      throw new Error('Method debug not implemented');
    }
  }
  
  module.exports = ILogger;