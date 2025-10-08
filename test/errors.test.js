const AppError = require('../src/domain/errors/AppError');
const ValidationError = require('../src/domain/errors/ValidationError');

describe('Domain Errors', () => {

    describe('AppError', () => {
        it('should create an instance with all custom properties', () => {
          const message = 'Test error';
          const statusCode = 404;
          const code = 'NOT_FOUND';
          const metadata = { id: 123 };
      
          const error = new AppError(message, statusCode, code, metadata);
      
          expect(error).toBeInstanceOf(AppError);
          expect(error.message).toBe(message);
          expect(error.statusCode).toBe(statusCode);
          expect(error.code).toBe(code);
          expect(error.metadata).toEqual(metadata);
          expect(error.isOperational).toBe(true);
          expect(error.name).toBe('AppError');
        });
      
        it('should default to statusCode 500 if none is provided', () => {
          const error = new AppError('Default error');
          expect(error.statusCode).toBe(500);
        });
      
        describe('isClientError', () => {
          it('should return true for 4xx status codes', () => {
            const clientError = new AppError('Not Found', 404);
            expect(clientError.isClientError()).toBe(true);
          });
      
          it('should return false for 5xx status codes', () => {
            const serverError = new AppError('Server Error', 500);
            expect(serverError.isClientError()).toBe(false);
          });
        });
        
        describe('isServerError', () => {
          it('should return true for 5xx status codes', () => {
            const serverError = new AppError('Server Error', 503);
            expect(serverError.isServerError()).toBe(true);
          });
          
          it('should return false for 4xx status codes', () => {
            const clientError = new AppError('Bad Request', 400);
            expect(clientError.isServerError()).toBe(false);
          });
        });
      
        describe('toJSON', () => {
          it('should return a JSON object without stack and metadata by default', () => {
            const error = new AppError('Simple Error', 400, 'SIMPLE_ERROR');
            const jsonError = error.toJSON();
      
            expect(jsonError.error).toHaveProperty('message', 'Simple Error');
            expect(jsonError.error).toHaveProperty('code', 'SIMPLE_ERROR');
            expect(jsonError.error).not.toHaveProperty('metadata');
            expect(jsonError.error).not.toHaveProperty('stack');
          });
      
          it('should include metadata if it exists', () => {
            const error = new AppError('Error with meta', 400, 'META_ERROR', { key: 'value' });
            const jsonError = error.toJSON();
      
            expect(jsonError.error).toHaveProperty('metadata', { key: 'value' });
          });
      
          it('should include stack trace if requested', () => {
            const error = new AppError('Error with stack');
            const jsonError = error.toJSON(true); // includeStack = true
      
            expect(jsonError.error).toHaveProperty('stack');
            expect(typeof jsonError.error.stack).toBe('string');
          });
        });
      
        describe('toString', () => {
          it('should return a formatted string', () => {
            const error = new AppError('Not Found', 404, 'NOT_FOUND');
            expect(error.toString()).toBe('[NOT_FOUND] Not Found');
          });
        });
        
        describe('static from', () => {
          it('should return the same instance if the error is already an AppError', () => {
            const originalError = new AppError('Original');
            const fromError = AppError.from(originalError);
            expect(fromError).toBe(originalError);
          });
          
          it('should convert a native Error into an AppError', () => {
            const nativeError = new Error('Native error message');
            const fromError = AppError.from(nativeError);
      
            expect(fromError).toBeInstanceOf(AppError);
            expect(fromError.message).toBe('Native error message');
            expect(fromError.code).toBe('UNEXPECTED_ERROR');
            expect(fromError.statusCode).toBe(500);
          });
      
          it('should convert a non-Error type (e.g., string) into an AppError', () => {
            const unknownError = 'Just a string error';
            const fromError = AppError.from(unknownError);
      
            expect(fromError).toBeInstanceOf(AppError);
            expect(fromError.message).toBe('An unexpected error occurred');
            expect(fromError.code).toBe('UNKNOWN_ERROR');
            expect(fromError.metadata).toEqual({ originalError: 'Just a string error' });
          });
        });
      });


  describe('ValidationError', () => {
    it('should create an instance of ValidationError with a detailed message', () => {
      const message = 'User validation failed';

      const error = new ValidationError(message);
      const expectedMessage = 'User validation failed';

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe(expectedMessage);
      expect(error.statusCode).toBe(400);
    });

    it('should handle cases where details are not provided', () => {
      // Arrange
      const message = 'A validation error occurred';

      // Act
      const error = new ValidationError(message);
      const expectedMessage = 'A validation error occurred';

      // Assert
      expect(error.message).toBe(expectedMessage);
    });

    it('should create an instance from a list of field errors using the static fromFields method', () => {
        const fieldErrors = [
          { field: 'email', message: 'is required' },
          { field: 'password', message: 'is too short' },
        ];
    
        const error = ValidationError.fromFields(fieldErrors);
    
        expect(error).toBeInstanceOf(ValidationError);
        expect(error.message).toBe('Validation failed');
        expect(error.statusCode).toBe(400);
        expect(error.metadata.fields).toEqual(['email', 'password']);
        expect(error.metadata.fieldErrors).toEqual(fieldErrors);
      });
  });

});