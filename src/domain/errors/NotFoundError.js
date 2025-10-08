const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(resource, identifier = null, metadata = {}) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;

    super(
      message,
      404,
      'NOT_FOUND',
      { ...metadata, resource, identifier }
    );
  }
}

module.exports = NotFoundError;