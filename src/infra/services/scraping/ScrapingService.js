const RoomFactory = require('../../../domain/factories/RoomFactory');

class ScrapingService {


  async getAvailableRooms(checkin, checkout) {
    const url = `https://www.hotel-exemplo.com/availability?checkin=${checkin}&checkout=${checkout}`;

    const roomScrapingFunction = async (page) => {
      const rawDataArray = await page.evaluate(() => {
        const results = [];
        const roomElements = document.querySelectorAll('.room-card');

        roomElements.forEach(element => {
          results.push({
            name: element.querySelector('.room-title')?.innerText,
            description: element.querySelector('.room-description')?.innerText,
            price: element.querySelector('.room-price')?.innerText,
            image: element.querySelector('.room-image img')?.src,
          });
        });

        return results;
      });
      
      return rawDataArray;
    };

    const rawData = await this.browserService.scrapePage(url, roomScrapingFunction);

    const rooms = RoomFactory.fromScrapedDataArray(rawData);

    return rooms;
  }
}

module.exports = ScrapingService;