const SearchRoomsUseCase = require('../src/application/usecases/SearchUsecase');
const ValidationError = require('../src/domain/errors/ValidationError');
const AppError = require('../src/domain/errors/AppError');

const makeSut = () => {
  const roomRepositoryMock = {
    findAvailableRooms: jest.fn(),
  };
  const loggerMock = {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  const sut = new SearchRoomsUseCase({
    roomRepository: roomRepositoryMock,
    logger: loggerMock,
  });

  return {
    sut,
    roomRepositoryMock,
    loggerMock,
  };
};

describe('SearchRoomsUseCase - Failure Scenarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Input Validation Errors', () => {
    it.each([
      { case: 'is null', input: null, expectedError: 'Input data is required' },
      { case: 'is undefined', input: undefined, expectedError: 'Input data is required' },
      { case: 'check-in is missing', input: { checkout: '2025-12-03' }, expectedError: 'Check-in date is required and must be a string' },
      { case: 'check-out is missing', input: { checkin: '2025-12-01' }, expectedError: 'Check-out date is required and must be a string' },
      { case: 'check-in is not a string', input: { checkin: 12345, checkout: '2025-12-03' }, expectedError: 'Check-in date is required and must be a string' },
      { case: 'check-out is not a string', input: { checkin: '2025-12-01', checkout: false }, expectedError: 'Check-out date is required and must be a string' },
      { case: 'check-in has invalid format', input: { checkin: '01-12-2025', checkout: '2025-12-03' }, expectedError: 'Check-in date must be in YYYY-MM-DD format' },
      { case: 'check-out has invalid format', input: { checkin: '2025-12-01', checkout: '2025/12/03' }, expectedError: 'Check-out date must be in YYYY-MM-DD format' },
    ])('should throw a ValidationError when the input $case', async ({ input, expectedError }) => {
      const { sut, loggerMock } = makeSut();

      const promise = sut.execute(input);

      await expect(promise).rejects.toThrow(ValidationError);
      await expect(promise).rejects.toThrow(expectedError);
      
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledTimes(1); // Apenas o log de início
    });
  });

  describe('Business Rule Violation Errors', () => {
    it('should throw a ValidationError if check-in date is in the past', async () => {
      const { sut, loggerMock } = makeSut();
      const inputInPast = { checkin: '2024-10-05', checkout: '2024-10-07' };
      
      const promise = sut.execute(inputInPast);

      await expect(promise).rejects.toThrow(ValidationError);
      await expect(promise).rejects.toThrow('The date do not must be before the current date');
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    });

    it('should throw a ValidationError if checkout date is before or same as check-in date', async () => {
      const { sut, loggerMock } = makeSut();
      const input = { checkin: '2025-12-05', checkout: '2025-12-03' };

      const promise = sut.execute(input);
      
      await expect(promise).rejects.toThrow(ValidationError);
      await expect(promise).rejects.toThrow('The checkout date must be after the checkin date');
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('Dependency Failure Errors', () => {
    it('should re-throw the original AppError if the repository throws an AppError', async () => {
      const { sut, roomRepositoryMock, loggerMock } = makeSut();
      const originalError = new AppError('Provider API is down', 503);
      roomRepositoryMock.findAvailableRooms.mockRejectedValue(originalError);
      const input = { checkin: '2025-12-01', checkout: '2025-12-03' };

      const promise = sut.execute(input);

      await expect(promise).rejects.toThrow(originalError);
      expect(loggerMock.error).toHaveBeenCalledWith(
        expect.objectContaining({ err: originalError }),
        'SearchRoomsUseCase: Execution failed'
      );
    });

    it('should wrap and throw an unexpected repository error as a generic AppError', async () => {
      const { sut, roomRepositoryMock, loggerMock } = makeSut();
      const unexpectedError = new Error('Database connection failed');
      roomRepositoryMock.findAvailableRooms.mockRejectedValue(unexpectedError);
      const input = { checkin: '2025-12-01', checkout: '2025-12-03' };

      const promise = sut.execute(input);

      await expect(promise).rejects.toThrow(AppError);
      await expect(promise).rejects.toThrow('An unexpected error occurred while searching for rooms');
      expect(loggerMock.error).toHaveBeenCalledWith(
        expect.objectContaining({ err: unexpectedError }),
        'SearchRoomsUseCase: Execution failed'
      );
    });
  });
});

describe('SearchRoomsUseCase - Success Scenarios', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty array if repository returns null or an empty array', async () => {
    const { sut, roomRepositoryMock, loggerMock } = makeSut();
    roomRepositoryMock.findAvailableRooms.mockResolvedValueOnce([]);
    const input = { checkin: '2025-12-01', checkout: '2025-12-03' };
    
    const resultForEmptyArray = await sut.execute(input);
    
    expect(resultForEmptyArray).toEqual([]);
    expect(loggerMock.warn).toHaveBeenCalledTimes(1);
    expect(roomRepositoryMock.findAvailableRooms).toHaveBeenCalledWith(expect.any(Object));

    jest.clearAllMocks();

    roomRepositoryMock.findAvailableRooms.mockResolvedValueOnce(null);
    const resultForNull = await sut.execute(input);

    expect(resultForNull).toEqual([]);
    expect(loggerMock.warn).toHaveBeenCalledTimes(1);
    expect(roomRepositoryMock.findAvailableRooms).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should return a mapped list of rooms and log success info on the happy path', async () => {
    const { sut, roomRepositoryMock, loggerMock } = makeSut();
    const roomsFromRepo = [
      { name: 'Suite Luxo', description: 'Uma bela suite.', price: 'R$ 500,00', image: 'suite.jpg' },
      { name: 'Quarto Simples', description: null, price: 'R$ 200,00', image: 'simples.jpg' },
      { name: 'Cabana', description: undefined, price: 'R$ 350,00', image: 'cabana.jpg' },
    ];
    const expectedDto = [
        { name: 'Suite Luxo', description: 'Uma bela suite.', price: 'R$ 500,00', image: 'suite.jpg' },
        { name: 'Quarto Simples', description: '', price: 'R$ 200,00', image: 'simples.jpg' },
        { name: 'Cabana', description: '', price: 'R$ 350,00', image: 'cabana.jpg' },
    ];
    roomRepositoryMock.findAvailableRooms.mockResolvedValue(roomsFromRepo);
    const input = { checkin: '2025-12-01', checkout: '2025-12-03' };

    const result = await sut.execute(input);

    expect(result).toEqual(expectedDto);
    
    expect(roomRepositoryMock.findAvailableRooms).toHaveBeenCalledTimes(1);
    
    expect(loggerMock.info).toHaveBeenCalledTimes(3);
    expect(loggerMock.info).toHaveBeenCalledWith(expect.any(Object), 'SearchRoomsUseCase: Starting execution');
    expect(loggerMock.info).toHaveBeenLastCalledWith(
      expect.objectContaining({ roomsCount: roomsFromRepo.length }),
      'SearchRoomsUseCase: Execution completed successfully'
    );

    expect(loggerMock.warn).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
  });
});