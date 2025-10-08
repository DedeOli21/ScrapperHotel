const AppError = require('./AppError');

class RateLimitError extends AppError {
  constructor(retryAfter = 60, metadata = {}) {
    super(
      `Too many requests. Please try again in ${retryAfter} seconds`,
      429,
      'RATE_LIMIT_EXCEEDED',
      { ...metadata, retryAfter }
    );
  }
}

module.exports = RateLimitError;