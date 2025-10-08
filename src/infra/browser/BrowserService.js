const puppeteer = require('puppeteer');

class BrowserService {
  constructor() {
    this.browser = null;
  }


  async initialize() {
    if (this.browser) return;
    this.browser = await puppeteer.launch({
      headless: 'new'
    });
  }


  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async scrapePage(url, scrapingFunction, selectorToWaitFor) {
    if (!this.browser) {
      throw new Error('Browser is not initialized. Call initialize() first.');
    }

    let page = null;
    try {
      page = await this.browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

      if (selectorToWaitFor) {
        await page.waitForSelector(selectorToWaitFor, { timeout: 30000 });
      }
      
      const data = await scrapingFunction(page);
      return data;

    } catch (error) {
      console.error(`Error scraping URL ${url}:`, error);
      throw error;
    } finally {
      if (page) {
        await page.close();
      }
    }
  }
}

module.exports = BrowserService;