const ExternalServiceError = require('./ExternalServiceError');

class ScrapingError extends ExternalServiceError {
  constructor(message, url, metadata = {}) {
    super(
      'Web Scraping',
      message,
      { ...metadata, url }
    );
    
    this.code = 'SCRAPING_ERROR';
  }

  static timeout(url, timeout) {
    return new ScrapingError(
      `Timeout after ${timeout}ms`,
      url,
      { reason: 'timeout', timeout }
    );
  }


  static elementNotFound(url, selector) {
    return new ScrapingError(
      `Element not found: ${selector}`,
      url,
      { reason: 'element_not_found', selector }
    );
  }

  static navigationFailed(url, reason) {
    return new ScrapingError(
      `Failed to navigate to page: ${reason}`,
      url,
      { reason: 'navigation_failed', details: reason }
    );
  }
}

module.exports = ScrapingError;