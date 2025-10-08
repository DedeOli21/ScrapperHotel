const AppError = require('./AppError');

class ValidationError extends AppError {
  constructor(message, fields = [], metadata = {}) {
    super(
      message,
      400,
      'VALIDATION_ERROR',
      { ...metadata, fields }
    );
  }

  static fromFields(fieldErrors) {
    const fields = fieldErrors.map(e => e.field);
    const messages = fieldErrors.map(e => `${e.field}: ${e.message}`);
    
    return new ValidationError(
      'Validation failed',
      fields,
      { fieldErrors }
    );
  }
}

module.exports = ValidationError;