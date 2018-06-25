const puppeteer = require( "puppeteer" );

class BrowserSession {

  /**
   * Obtain browser and page object on bootstrap
   */
  async setup() {
    this.browser = await puppeteer.launch(
       // when called like DEBUG=true jest open in a browser
       process.env.DEBUG
        ? {
            headless: false,
            slowMo: 40,
            devtools: false
          }
        : {}
    );
    this.page = await this.browser.newPage();
  }

  /**
   * Close browser on teardown
   */
  async teardown() {
    this.browser.close();
  }
}


module.exports = new BrowserSession();
