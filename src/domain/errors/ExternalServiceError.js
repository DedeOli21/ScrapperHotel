const AppError = require('./AppError');

class ExternalServiceError extends AppError {
  constructor(service, message, metadata = {}) {
    super(
      `External service error: ${service} - ${message}`,
      503,
      'EXTERNAL_SERVICE_ERROR',
      { ...metadata, service }
    );
  }
}

module.exports = ExternalServiceError;