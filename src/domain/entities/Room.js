const ValidationError = require('../errors/ValidationError');

class Room {
  constructor({
    id = null,
    name,
    description,
    price,
    image,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.validate();
  }

  validate() {
    const errors = [];

    if (!this.name) {
      errors.push('Room name is required');
    } else if (typeof this.name !== 'string') {
      errors.push('Room name must be a string');
    } else if (this.name.trim().length < 3) {
      errors.push('Room name must have at least 3 characters');
    } else if (this.name.length > 200) {
      errors.push('Room name must not exceed 200 characters');
    }

    if (this.description === null || this.description === undefined) {
      errors.push('Room description is required');
    } else if (typeof this.description !== 'string') {
      errors.push('Room description must be a string');
    } else if (this.description.length > 1000) {
      errors.push('Room description must not exceed 1000 characters');
    }

    if (this.price === undefined || this.price === null) {
      errors.push('Room price is required');
    } else if (typeof this.price !== 'number') {
      errors.push('Room price must be a number');
    } else if (this.price < 0) {
      errors.push('Room price cannot be negative');
    }

    if (!this.image) {
      errors.push('Room image is required');
    } else if (typeof this.image !== 'string') {
      errors.push('Room image must be a string');
    } else if (!this.isValidUrl(this.image)) {
      errors.push('Room image must be a valid URL');
    }

    if (errors.length > 0) {
      throw new ValidationError('Room validation failed', errors);
    }
  }

  isValidUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }


  updateName(newName) {
    this.name = newName;
    this.updatedAt = new Date();
    this.validate();
  }

  updateDescription(newDescription) {
    this.description = newDescription;
    this.updatedAt = new Date();
    this.validate();
  }
  
  updatePrice(newPrice) {
    this.price = newPrice;
    this.updatedAt = new Date();
    this.validate();
  }

  isPremium(threshold = 1500) {
    return this.price >= threshold;
  }

  hasDetailedDescription() {
    return this.description && this.description.length > 100;
  }

  getCapitalizedName() {
    if (!this.name) return '';
    return this.name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getShortDescription(maxLength = 100) {
    if (!this.description) return '';
    if (this.description.length <= maxLength) {
      return this.description;
    }
    return this.description.substring(0, maxLength).trim() + '...';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      image: this.image
    };
  }
}

module.exports = Room;