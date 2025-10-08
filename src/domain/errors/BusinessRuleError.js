const AppError = require('./AppError');

class BusinessRuleError extends AppError {
  constructor(message, rule, metadata = {}) {
    super(
      message,
      422,
      'BUSINESS_RULE_VIOLATION',
      { ...metadata, rule }
    );
  }
}

module.exports = BusinessRuleError;