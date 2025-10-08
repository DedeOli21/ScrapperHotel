const AppError = require('./AppError');

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', metadata = {}) {
    super(message, 401, 'UNAUTHORIZED', metadata);
  }
}

module.exports = UnauthorizedError;
