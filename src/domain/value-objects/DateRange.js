class DateRange {
    constructor(checkin, checkout) {
      this.checkin = checkin;
      this.checkout = checkout;
      
      this.validate();
      
      Object.freeze(this);
    }
  
    validate() {
      this.validateDateFormat(this.checkin, 'check-in');
      this.validateDateFormat(this.checkout, 'check-out');
  
      const checkinDate = new Date(this.checkin);
      const checkoutDate = new Date(this.checkout);
  
      if (checkoutDate <= checkinDate) {
        throw new Error('Check-out date must be after check-in date');
      }
  
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (checkinDate < today) {
        throw new Error('Check-in date cannot be in the past');
      }
    }

    validateDateFormat(dateString, fieldName) {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  
      if (!dateFormatRegex.test(dateString)) {
        throw new Error(
          `Invalid ${fieldName} date format. Expected YYYY-MM-DD (e.g., 2024-12-01), received: ${dateString}`
        );
      }
  
      const [year, month, day] = dateString.split('-').map(Number);
  
      if (month < 1 || month > 12) {
        throw new Error(`Invalid ${fieldName} month. Must be between 01 and 12`);
      }
  
      if (day < 1 || day > 31) {
        throw new Error(`Invalid ${fieldName} day. Must be between 01 and 31`);
      }
    }

    getCheckinDate() {
      return new Date(this.checkin);
    }
  

    getCheckoutDate() {
      return new Date(this.checkout);
    }

    getDaysCount() {
      const diffInMs = this.getCheckoutDate() - this.getCheckinDate();
      return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    }

    toString() {
      return `${this.checkin} to ${this.checkout} (${this.getDaysCount()} days)`;
    }

    equals(other) {
      if (!(other instanceof DateRange)) {
        return false;
      }
  
      return this.checkin === other.checkin && this.checkout === other.checkout;
    }
  

    toJSON() {
      return {
        checkin: this.checkin,
        checkout: this.checkout,
        days: this.getDaysCount()
      };
    }
  }
  
  module.exports = DateRange;