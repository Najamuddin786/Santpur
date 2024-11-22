const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function scrapeFlipkartSinglePage(url) {
const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-certificate-errors',
    ],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  try {
    console.log('Navigating to Flipkart...');
    await page.goto(url, { waitUntil: 'load', timeout: 90000 });

    console.log('Scraping product details from a single page...');
    await page.waitForSelector('._39kFie', { timeout: 30000 }); // Adjust selector if needed

    const product = await page.evaluate(() => {
      const productElement = document.querySelector('._39kFie');
      if (!productElement) {
        return null; // Return null if no product found
      }

      const titleElement = productElement.querySelector('._6EBuvT'); // Adjust selector for the title
      const priceElement = productElement.querySelector('.Nx9bqj'); // Adjust price selector
      const priceOElement = productElement.querySelector('.yRaY8j'); // Original price
      const ratingElement = productElement.querySelector('.XQDdHH'); // Rating
      const ratingAllElement = productElement.querySelector('.Wphh3N'); // All ratings
      const imageElements = productElement.querySelectorAll('.j9BzIm ul li div div img'); // Images
      const imageCompanyElements = productElement.querySelector('.SLT5t4 img'); // Company image
      const highLightElements = productElement.querySelectorAll('.xFVion ul li'); // Highlights
      const boxElements = productElement.querySelector('.HPETK2'); // Box content
      const buyElements = productElement.querySelector('.QqFHMw'); // Add to cart button

      const title = titleElement ? titleElement.innerText : 'Title not available';
      const price = priceElement ? priceElement.innerText : 'Price not available';
      const priceOriginal = priceOElement ? priceOElement.innerText : 'Original Price not available';
      const rating = ratingElement ? ratingElement.innerText : 'Rating not available';
      const ratingAll = ratingAllElement ? ratingAllElement.innerText : 'All Ratings not available';
      const box = boxElements ? boxElements.innerText : 'Product Description not available';
      const buy = buyElements ? buyElements.innerText : 'Not available';
      

      const highLight = highLightElements.length > 0 
        ? Array.from(highLightElements).map(li => li.innerText).join(', ') 
        : 'Highlight not available';

      const warranty = productElement.querySelector('.zIL+eP') ? productElement.querySelector('.zIL+eP').innerText : 'Warranty not available';

      const imageCompany = imageCompanyElements ? imageCompanyElements.src || imageCompanyElements.getAttribute('data-src') : 'Image URL not available';

      const images = Array.from(imageElements).map((img) => img.src || img.getAttribute('data-src') || 'Image URL not available');

      return { title, price, priceOriginal, buy, rating, ratingAll, warranty, highLight, box, imageCompany, images };
    });

    console.log('Scraping complete.');
    console.log(product);
    await browser.close();

    return product;
  } catch (error) {
    console.error('Error during scraping:', error.message);
    await browser.close();
    return null;
  }
}

module.exports = { scrapeFlipkartSinglePage };
