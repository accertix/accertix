(async () => {
  const puppeteer = require("puppeteer");

  let scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://www.businessghana.com/site/real-estates");
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
      propertyLinks = document.querySelectorAll(".featured-image > a");
      propertyLinks = Array.prototype.map.call(propertyLinks, function(e) {
        return e.href;
      });
      return {
        propertyLinks
        // price
      };
    });
    browser.close();
    return result;
  };

  let getDetails = scrape().then(async links => {
    const browser = await puppeteer.launch({ headless: false });
    let data = [];
    const TITLE_SELECTOR = ".details-title > h2";
    const PRICE_SELECTOR =
      "div.row.all-details-section > div > div:nth-child(4) > div > div:nth-child(3) > div.col-sm-9.col-sm-9.col-xs-8.section-info-content";
  
    const NUM_ROOMS_SELECTOR = "";
    const NUM_BEDROOMS_SELECTOR = "";
    const ACQUISITION_TYPE_SELECTOR = "";
    const NUM_BATHROOMS_SELECTOR = "";
    const PLOT_LENGTH_SELECTOR = "";
    const PLOT_WIDTH_SELECTOR = "";
    const PLOT_MEASURE_SELECTOR = "";
    const DESCRIPTION_SELECTOR = "";
    const LOCATION_SELECTOR = "";
    const REGION_SELECTOR = "";
    const STREET_ADDRESS_SELECTOR = "";
    const LISTER_NAME_SELECTOR = "";
    const LISTER_PHONE_SELECTOR = "";
    const ADVERTISER_SELECTOR = "";

    
    for (let i = 0; i < 3; i++) {
      let page = await browser.newPage();
      await page.goto(links.propertyLinks[i]);
      await page.waitFor(3000);

      let result = await page.evaluate(() => {
        let title = document.querySelector(".details-title > h2").innerHTML;
        let price = document.querySelector("div.row.all-details-section > div > div:nth-child(4) > div > div:nth-child(3) > div.col-sm-9.col-sm-9.col-xs-8.section-info-content").innerHTML;
        return { title, price };
      });
      data.push(result);
    }
    browser.close();
    return data;
    // const data = await links.propertyLinks.map(async e => {
    //     let page = await browser.newPage();
    //     await page.goto(e);
    //     await page.waitFor(1000);

    //     const result = await page.evaluate(() => {
    //         let title = document.querySelector(TITLE_SELECTOR);
    //         let price = document.querySelector(PRICE_SELECTOR);
    // let numRooms = document.querySelector(NUM_ROOMS_SELECTOR);
    // let numBedrooms = document.querySelector(NUM_BEDROOMS_SELECTOR);
    // let acquisitionType = document.querySelector(ACQUISITION_TYPE_SELECTOR);
    // let bathrooms = document.querySelector(NUM_BATHROOMS_SELECTOR);
    // let plotLength = document.querySelector(PLOT_LENGTH_SELECTOR);
    // let plotWidth = document.querySelector(PLOT_WIDTH_SELECTOR);
    // let plotMeasure = document.querySelector(PLOT_MEASURE_SELECTOR);
    // let desc = document.querySelector(DESCRIPTION_SELECTOR);
    // let location = document.querySelector(LOCATION_SELECTOR);
    // let region = document.querySelector(REGION_SELECTOR);
    // let streetAddress = document.querySelector(STREET_ADDRESS_SELECTOR);
    // let listerName = document.querySelector(LISTER_NAME_SELECTOR);
    // let listerPhone = document.querySelector(LISTER_PHONE_SELECTOR);
    // let advertiser = document.querySelector(ADVERTISER_SELECTOR);

    //     return {title, price};
    // });
    //     return result;
    // })
  });

  getDetails.then(result => {
    console.log(result);
  });
})();
