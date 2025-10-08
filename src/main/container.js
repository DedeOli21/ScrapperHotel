
const SearchController = require('../infra/http/controller/searchController');
const SearchUseCase = require('../application/usecases/SearchUsecase');
const ConsoleLogger = require('../infra/services/ConsoleLogger');
const RoomFactory = require('../domain/factories/RoomFactory');
const BrowserService = require('../infra/browser/BrowserService');
const HotelProviderService = require('../infra/services/providers/HotelProviderService');

function setupContainer() {
  const logger = new ConsoleLogger(); 
  const browserService = new BrowserService();
  const roomFactory = RoomFactory;
  const hotelProviderService = new HotelProviderService({
    browserService,
    logger,
    roomFactory
  });

  const searchUseCase = new SearchUseCase({
    roomRepository: hotelProviderService,
    logger
  });

  const searchController = new SearchController({
    searchUseCase, 
    logger
  });

  return {
    logger,
    searchController,
    browserService,
  };
}

module.exports = setupContainer();