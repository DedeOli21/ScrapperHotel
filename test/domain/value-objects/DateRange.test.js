const DateRange = require('../../../src/domain/value-objects/DateRange');

describe('DateRange Value Object', () => {

  describe('Creation and Validation', () => {
    it('should create a valid DateRange instance for a valid input', () => {
      const checkin = '2025-11-20';
      const checkout = '2025-11-25';

      const dateRange = new DateRange(checkin, checkout);

      expect(dateRange).toBeInstanceOf(DateRange);
      expect(dateRange.checkin).toBe(checkin);
      expect(dateRange.checkout).toBe(checkout);
      expect(Object.isFrozen(dateRange)).toBe(true);
    });

    it('should throw an error if checkout date is before checkin date', () => {
      const checkin = '2025-11-20';
      const checkout = '2025-11-19';

      expect(() => {
        new DateRange(checkin, checkout);
      }).toThrow('Check-out date must be after check-in date');
    });
    
    it('should throw an error if checkout date is the same as checkin date', () => {
      const checkin = '2025-11-20';
      const checkout = '2025-11-20';

      expect(() => {
        new DateRange(checkin, checkout);
      }).toThrow('Check-out date must be after check-in date');
    });

    it('should throw an error if checkin date is in the past', () => {
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0];
      const tomorrow = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];

      expect(() => {
        new DateRange(yesterday, tomorrow);
      }).toThrow('Check-in date cannot be in the past');
    });

    it('should throw an error if checkin date is not a number', () => {
      const checkin = 'not-a-number';
      const checkout = '2025-11-25';

      expect(() => {
        new DateRange(checkin, checkout);
      }).toThrow(`Invalid check-in date format. Expected YYYY-MM-DD (e.g., 2024-12-01), received: ${checkin}`);
    });

    it('should throw an erro if month is not between 01 and 12', () => {
      const checkin = '2025-13-01';
      const checkout = '2025-11-25';

      expect(() => {
        new DateRange(checkin, checkout);
      }).toThrow(`Invalid check-in month. Must be between 01 and 12`);
    });

    it('should throw an error if day is not between 01 and 31', () => {
      const checkin = '2025-11-32';
      const checkout = '2025-11-25';

      expect(() => {
        new DateRange(checkin, checkout);
      }).toThrow(`Invalid check-in day. Must be between 01 and 31`);
    });
  });

  describe('Utility Methods', () => {
    const dateRange1 = new DateRange('2025-12-01', '2025-12-05');
    const dateRange2 = new DateRange('2025-12-01', '2025-12-05');
    const dateRange3 = new DateRange('2025-12-02', '2025-12-06');

    it('equals() should return true for two instances with the same dates', () => {
      expect(dateRange1.equals(dateRange2)).toBe(true);
    });

    it('equals() should return false for two instances with different dates', () => {
      expect(dateRange1.equals(dateRange3)).toBe(false);
    });

    it('equals() should return false when comparing to a non-DateRange object', () => {
      expect(dateRange1.equals({ checkin: '2025-12-01', checkout: '2025-12-05' })).toBe(false);
      expect(dateRange1.equals(null)).toBe(false);
    });
    
    it('toString() should return a formatted string representation', () => {
      const expectedString = '2025-12-01 to 2025-12-05 (4 days)';
      expect(dateRange1.toString()).toBe(expectedString);
    });
    
    it('toJSON() should return a valid JSON object representation', () => {
      const expectedJSON = {
        checkin: '2025-12-01',
        checkout: '2025-12-05',
        days: 4
      };
      expect(dateRange1.toJSON()).toEqual(expectedJSON);
    });
  });
});