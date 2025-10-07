const DateRange = require('../../domain/utils/DateRange');
const ValidationError = require('../../domain/errors/ValidationError');
const AppError = require('../../domain/errors/AppError');

class SearchRoomsUseCase {
  constructor({ roomRepository, logger }) {
    this.roomRepository = roomRepository;
    this.logger = logger;
  }

  async execute(input) {
    const startTime = Date.now();

    try {
      this.logger.info(
        { 
          checkin: input?.checkin, 
          checkout: input?.checkout 
        }, 
        'SearchRoomsUseCase: Starting execution'
      );
      
      // ✅ A validação agora está DENTRO do bloco try
      this.validateInput(input, startTime);

      const dateRange = new DateRange(input.checkin, input.checkout);

      // ... resto do seu código dentro do try
      this.logger.info(
        { 
          checkin: dateRange.checkin,
          checkout: dateRange.checkout,
          days: dateRange.getDaysCount()
        },
        'SearchRoomsUseCase: Date range validated'
      );

      const rooms = await this.roomRepository.findAvailableRooms(dateRange);

      if (!rooms || rooms.length === 0) {
        this.logger.warn(
          { checkin: input.checkin, checkout: input.checkout },
          'SearchRoomsUseCase: No rooms found'
        );
        return [];
      }

      this.logger.info(
        { 
          roomsCount: rooms.length,
          executionTime: Date.now() - startTime 
        },
        'SearchRoomsUseCase: Execution completed successfully'
      );

      return this.mapToDTO(rooms);

    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      this.logger.error(
        { 
          err: error,
          input,
          executionTime,
          errorType: error.constructor.name
        },
        'SearchRoomsUseCase: Execution failed'
      );

      if (error instanceof ValidationError || error instanceof AppError) {
        throw error;
      }
      
      throw new AppError(
        'An unexpected error occurred while searching for rooms',
        500,
        'SEARCH_FAILED'
      );
    }
  }

  validateInput(input, startTime) {
    const dayNow = new Date(startTime);
    if (!input) {
      throw new ValidationError('Input data is required');
    }

    if (!input.checkin || typeof input.checkin !== 'string') {
      throw new ValidationError('Check-in date is required and must be a string');
    }

    if (!input.checkout || typeof input.checkout !== 'string') {
      throw new ValidationError('Check-out date is required and must be a string');
    }

    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateFormatRegex.test(input.checkin)) {
      throw new ValidationError(
        'Check-in date must be in YYYY-MM-DD format'
      );
    }

    if (!dateFormatRegex.test(input.checkout)) {
      throw new ValidationError(
        'Check-out date must be in YYYY-MM-DD format'
      );
    }
    if(new Date(input.checkin) < dayNow || input.checkout < dayNow) {
      throw new ValidationError('The date do not must be before the current date');
    }

    if(new Date(input.checkout) <= new Date(input.checkin)) {
      throw new ValidationError('The checkout date must be after the checkin date');
    }

  }

  mapToDTO(rooms) {
    return rooms.map(room => ({
      name: room.name,
      description: room.description || '',
      price: room.price,
      image: room.image
    }));
  }
}

module.exports = SearchRoomsUseCase;