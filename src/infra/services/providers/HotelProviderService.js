const AppError = require('../../../domain/errors/AppError');

class HotelProviderService {
  constructor({ browserService, logger, roomFactory }) {
    this.browserService = browserService;
    this.logger = logger;
    this.roomFactory = roomFactory;
    this.BASE_URL = 'https://reservations.fasthotel.me/188/214';
  }

  async findAvailableRooms(dateRange) {
    const searchUrl = `${this.BASE_URL}?entrada=${dateRange.checkin}&saida=${dateRange.checkout}&adultos=1#acomodacoes`;
    
    this.logger.info({ url: searchUrl }, 'HotelProvider: Starting to crawl');

    try {
      const scrapeFunction = async (page) => {
        return page.evaluate(() => {
          const roomElements = document.querySelectorAll('div.row.borda-cor[data-codigo]');
          const results = [];
          
          roomElements.forEach(roomEl => {
            const name = roomEl.querySelector('h3[data-campo="titulo"]')?.innerText;
            const description = roomEl.querySelector('div.quarto.descricao')?.innerText;
            const price = roomEl.querySelector('b[data-campo="valor"]')?.innerText;
            const image = roomEl.querySelector('.flexslider img')?.src;

            if (name && description && price && image) {
              results.push({ name, description, price, image });
            }
          });
          
          return results;
        });
      };

      const mainSelector = 'div.row.borda-cor[data-codigo]';

      const rawData = await this.browserService.scrapePage(searchUrl, scrapeFunction, mainSelector);
      
      this.logger.info({ roomsCount: rawData.length }, 'HotelProvider: Crawling finished');

      const rooms = this.roomFactory.fromScrapedDataArray(rawData);

      return rooms;

    } catch (error) {
      this.logger.error({ err: error }, 'HotelProvider: Failed to crawl room data');
      throw new AppError('Failed to retrieve room information from the provider.');
    }
  }
}

module.exports = HotelProviderService;