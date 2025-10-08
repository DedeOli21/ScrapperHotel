const puppeteer = require('puppeteer');
const AppError = require('../../../domain/errors/AppError');
const Logger = require('../../../infra/services/ConsoleLogger');

class RoomRepository {
  constructor() {
    this.logger = new Logger();
    this.BASE_URL = 'https://reservations.fasthotel.me/188/214';
  }

  async findAvailableRooms(dateRange) {
    const searchUrl = `${this.BASE_URL}?entrada=${dateRange.checkin}&saida=${dateRange.checkout}&adultos=1#acomodacoes`;
    
    this.logger.info({ url: searchUrl }, 'RoomRepository: Starting to crawl');

    let browser = null;
    try {
      browser = await puppeteer.launch({
      });
      const page = await browser.newPage();

      await page.goto(searchUrl, { waitUntil: 'networkidle2' });

      this.logger.info({ url: searchUrl }, 'RoomRepository: Page loaded successfully');

      const rooms = await page.evaluate(() => {
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
      
      this.logger.info({ roomsCount: rooms.length }, 'RoomRepository: Crawling finished');
      return rooms;

    } catch (error) {
      this.logger.error({ err: error }, 'RoomRepository: Failed to crawl room data');
      throw new AppError('Failed to retrieve room information from the provider.');

    } finally {
      if (browser) {
        await browser.close();
        this.logger.info('RoomRepository: Browser closed');
      }
    }
  }
}

module.exports = RoomRepository;