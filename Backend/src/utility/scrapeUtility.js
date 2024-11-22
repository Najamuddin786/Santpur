const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function autoScroll(page) {
  await page.evaluate(async () => {
    const distance = 100;
    let totalHeight = 0;
    const scrollHeight = document.body.scrollHeight;
    while (totalHeight < scrollHeight) {
      window.scrollBy(0, distance);
      totalHeight += distance;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  });
}

async function scrapeProducts(page) {
  await page.waitForSelector('._75nlfW', { timeout: 30000 });

  const products = await page.evaluate(() => {
    const productElements = Array.from(document.querySelectorAll('._75nlfW'));

    return productElements.map((el) => {
      const titleElement = el.querySelector('.KzDlHZ');
      const priceElement = el.querySelector('._4b5DiR');
      const imageElement = el.querySelector('img');
      const ratingElement = el.querySelector('._5OesEi');
      const ch = el.querySelector('ul');

      const title = titleElement ? titleElement.innerText : 'Title not available';
      const price = priceElement ? priceElement.innerText : 'Price not available';
      const chh = ch ? ch.innerText : 'Ch not available';
      const rating = ratingElement ? ratingElement.innerText : 'Rating not available';
      const image = imageElement ? imageElement.getAttribute('data-src') || imageElement.src : 'Image not available';

      return { title, price, image, chh, rating };
    }).filter((product) => product.title !== 'Title not available');
  });

  return products;
}

async function scrapeFlipkart() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-certificate-errors',
      '--disable-web-security',
      '--allow-insecure-localhost',
      '--disable-features=IsolateOrigins,SitePerProcess',
    ],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'accept-language': 'en-US,en;q=0.9',
  });

  console.log('Navigating to Flipkart...');
  await page.goto('https://www.flipkart.com/search?q=mobile+5g&sid=tyy%2C4io&as=on&as-show=on&otracker=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_ps&as-pos=1&as-type=RECENT&suggestionId=mobile+5g%7CMobiles&requestId=37026f05-e817-4597-a58f-a50054c1f9b4&as-searchtext=mobile&p%5B%5D=facets.price_range.from%3DMin&p%5B%5D=facets.price_range.to%3D15000', { waitUntil: 'load', timeout: 90000 });

  let allProducts = [];
  let pageNumber = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    console.log(`Scraping page ${pageNumber}...`);
    await autoScroll(page);

    const products = await scrapeProducts(page);
    allProducts = allProducts.concat(products);

    const nextButton = await page.$('a._1LKTO3');
    if (nextButton) {
      console.log('Navigating to the next page...');
      await nextButton.click();
      await page.waitForTimeout(3000); // Wait for the next page to load
      pageNumber++;
    } else {
      hasNextPage = false;
    }
  }

  console.log('Scraping complete. Total products:', allProducts.length);
  await browser.close();

  return allProducts; // Return the scraped products
}

module.exports = { scrapeFlipkart };
