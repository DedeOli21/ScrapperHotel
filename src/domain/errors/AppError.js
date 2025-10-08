class AppError extends Error {
    constructor(
      message, 
      statusCode = 500, 
      code = 'INTERNAL_ERROR',
      metadata = {}
    ) {
      super(message);
  
      this.statusCode = statusCode;
      this.code = code;
      this.metadata = metadata;
      this.isOperational = true;
      this.timestamp = new Date().toISOString();
  
      this.name = this.constructor.name;
  
      Error.captureStackTrace(this, this.constructor);
    }
  
    isClientError() {
      return this.statusCode >= 400 && this.statusCode < 500;
    }

    isServerError() {
      return this.statusCode >= 500;
    }
  

    toJSON(includeStack = false) {
      const response = {
        error: {
          message: this.message,
          code: this.code,
          statusCode: this.statusCode,
          timestamp: this.timestamp
        }
      };

      if (Object.keys(this.metadata).length > 0) {
        response.error.metadata = this.metadata;
      }
  
      if (includeStack && this.stack) {
        response.error.stack = this.stack;
      }
  
      return response;
    }
  

    toString() {
      return `[${this.code}] ${this.message}`;
    }

    static from(error) {
      if (error instanceof AppError) {
        return error;
      }
  
      if (error instanceof Error) {
        return new AppError(
          error.message,
          500,
          'UNEXPECTED_ERROR',
          { originalError: error.name }
        );
      }
  
      return new AppError(
        'An unexpected error occurred',
        500,
        'UNKNOWN_ERROR',
        { originalError: String(error) }
      );
    }
  }
  
  module.exports = AppError;